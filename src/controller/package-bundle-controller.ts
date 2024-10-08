import { NextFunction, Response } from "express";
import { CompanyReq } from "../types/company-request";
import { PackageBundleCreateRequest } from "../model/package-bundle-model";
import { PackageBundleService } from "../service/package-bundle-service";

export class PackageBundleController {

    static async createPackageBundle(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const request : PackageBundleCreateRequest = req.body as PackageBundleCreateRequest;
            const response = await PackageBundleService.createPackageBundle(request, req.company!);

            res.status(201);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async updatePackageBundle(req: CompanyReq, res: Response, next: NextFunction) {

        try {
            const id = req.query.id as string;
            const request : PackageBundleCreateRequest = req.body as PackageBundleCreateRequest;
            const response = await PackageBundleService.updatePackageBundle(id, request, req.company!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async generateToken (req: CompanyReq, res: Response, next: NextFunction) {

        try {
            const package_bundle_id = req.query.package_bundle_id as string;
            const response = await PackageBundleService.generateToken(package_bundle_id, req.company!);

            res.status(200);
            res.json(response);
        } catch (err) {
            next(err);
        }
    }

    static async deleteToken (req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const package_bundle_id = req.query.package_bundle_id as string;
            const response = await PackageBundleService.deleteToken(package_bundle_id, req.company!);
            
            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }

    }

    static async deletePackageBundle(req: CompanyReq, res: Response, next: NextFunction) { 

        try {
            
            const id = req.query.id as string;
            const response = await PackageBundleService.deletePackageBundle(id, req.company!);

            res.status(200);
            res.json(response);
            
        } catch (err) {
            next(err);
        }
    }

    static async getPackageBundle(req: CompanyReq, res: Response, next: NextFunction) {

        try {

            const response = await PackageBundleService.getPackageBundle(req.company!);

            res.status(200);
            res.json(response);

        } catch (err) {
            next(err);
        }
    }

    static async getPackageBundlebyId(req: CompanyReq, res: Response, next: NextFunction) {

        try {
            
            const package_bundle_id = req.params.package_bundle_id as string;
            const response = await PackageBundleService.getPackageBundleById(package_bundle_id, req.company!)

            res.status(200);
            res.json(response);

        } 
        catch (err) {
            next(err);
        }
    }
 }