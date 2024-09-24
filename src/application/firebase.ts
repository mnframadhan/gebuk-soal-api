import * as admin from 'firebase-admin';
import path from 'path';

const serviceAccount = require("../../credentials/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gebuk-soal.appspot.com"
})

export const bucket = admin.storage().bucket();
