import { NextFunction, Response } from "express";
import { bucket } from "../application/firebase";
import { SoalRequest } from "../model/soal-model";
import { SoalService } from "../service/soal-service";
import { ContributorReq } from "../types/contributor-request";

export class SoalController {

    static async createSoal(req: ContributorReq, res: Response, next: NextFunction){

        try {

            const file = req.file;

            if(!file) {

                const request : SoalRequest = await req.body as SoalRequest
                const response = await SoalService.createSoal(request, req.contributor!)
            
                res.status(201);
                res.json(response)
                
            } else {

                const blob = bucket.file(`soal/question/${file.originalname}_${Date.now()}`);
                const blobStream =  blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    }
                });

                blobStream.on('error', (error) => {
                    next(error);
                })

                blobStream.on('finish', async () => {

                    try {

                        await blob.makePublic();
                        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                        const request = req.body;
                        request.image1 = publicUrl;

                        const response = await SoalService.createSoal(request, req.contributor!);
                        res.status(201).json(response);

                    } catch (err) {
                        next(err)
                    }
                })
            }

        } catch (err) {
            next(err)
        }
    }

	static async createManySoal(req: ContributorReq, res: Response, next: NextFunction) {

		try {
			const request: SoalRequest[] = req.body as SoalRequest[];
			const response = await SoalService.createManySoal(request, req.contributor!)

			res.status(201);
			res.json(response)

		} catch (err) {
			next(err)
		}
	}
	
	static async getSoalsByCompletePackageId(req: ContributorReq, res: Response, next: NextFunction) {
		
		try {
			const completePackageId: string = req.params.id as string
			const response = await SoalService.getSoalsByCompletePackageId(completePackageId, req.contributor!)
			res.status(200);
			res.json(response);
		} catch (err) {
			next(err)
		}

	}
}
