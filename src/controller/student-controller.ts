import { NextFunction, Request, Response } from "express";
import { StudentService } from "../service/student-service";
import { StudentRequest, StudentUpdateRequest } from "../model/student-model";
import { StudentReq } from "../types/student-request";
import { bucket } from "../application/firebase";

export class StudentController {
    static async createStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const request: StudentRequest = req.body as StudentRequest;
            const response = await StudentService.createStudent(request);

            res.status(201);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

    static async loginStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body;
            const response = await StudentService.loginStudent(request);

            const token: string = response.token as string;
            res.cookie("X-API-TOKEN-STUDENT", token, {
                httpOnly: false,
                maxAge: 24 * 60 * 60 * 1000, // Cookie expiry time (e.g., 1 day in milliseconds)
            });

            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

    static async studentEmailVerification(req: StudentReq, res: Response, next: NextFunction) {
        try {
            const request = req.body as { verificationCode: string };
            const response = await StudentService.studentEmailVerification(request, req.student!);

            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

    static async currentStudent(req: StudentReq, res: Response, next: NextFunction) {
        try {
            const response = await StudentService.getCurrentStudent(req.student!);

            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

	static async updateStudent(req: StudentReq, res: Response, next: NextFunction) {
		try {
			const request: StudentUpdateRequest = req.body as StudentUpdateRequest;
			const response = await StudentService.updateStudent(request, req.student!);

			res.status(200);
			res.json(response);

		} catch (err) {
			next(err)
		}
	}

    static async updateAvatar(req: StudentReq, res: Response, next: NextFunction) {
        try {
            const file = req.file;

            if (!file) {
                res.status(404);
                res.json({message: "No File Uploaded"});
            } else {
				
				const blob = bucket.file(`student/avatar/${req.student!.username}_${Date.now()}_${file.originalname}`);
				const blobStream = blob.createWriteStream({
					metadata: {
						contentType: file.mimetype,
					},
				});

				blobStream.on("error", (error) => {
					next(error);
				})
	
                blobStream.on("finish", async () => {
                    try {
                        await blob.makePublic();

                        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                        const request = req.body;
						request.avatar = publicUrl

                        const response = await StudentService.updateAvatar(request, req.student!);
                        res.status(200).json(response);
                    } catch (err) {
                        next(err);
                    }
                });

                blobStream.end(file.buffer);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async logoutStudent(req: StudentReq, res: Response, next: NextFunction) {
        try {
            await StudentService.logoutCurrentStudent(req.student!);
            res.status(200);
            res.json({ message: "OK" });
        } catch (err) {
            next(err);
        }
    }
}
