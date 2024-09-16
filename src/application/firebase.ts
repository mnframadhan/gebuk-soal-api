import * as admin from 'firebase-admin';
import path from 'path';

const serviceAccount = require(path.join(process.cwd(), '/credentials/gebuk-soal-firebase-adminsdk-copso-307eecc382.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gebuk-soal.appspot.com"
})

export const bucket = admin.storage().bucket();
