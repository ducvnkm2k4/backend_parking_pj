import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.resolve('src/assets/private/parking-pj-adminsdk.json');
console.log(serviceAccount);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
})

let firestoreDb = admin.firestore();
let auth = admin.auth();

export {
    firestoreDb, auth
}