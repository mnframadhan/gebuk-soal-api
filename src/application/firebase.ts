import * as admin from 'firebase-admin';
import path from 'path';

const serviceAccount = require(path.join(process.cwd(), process.env.ACCOUNT_SERVICE_PATH!));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gebuk-soal.appspot.com"
})

export const bucket = admin.storage().bucket();
