import multer from 'multer';
import { ResponseError } from '../error/response-error';

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5 * 1025 * 1024},
    fileFilter: (req, file, callback) => {

        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        } else {
            callback(new ResponseError(400, "File(s) is/are not allowed"))
        }
    }
})