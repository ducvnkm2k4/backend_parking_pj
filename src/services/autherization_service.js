import { firestoreDb } from '../configs/firebase_config.js';

let checkExistPhoneNumber = async (phoneNumber) => {
    try {
        const snapshot = await firestoreDb.collection("users").where("phoneNumber", "==", phoneNumber).get();
        if (snapshot.empty) {
            return false;
        }
        return true;
    } catch (error) {
        throw new Error("error check data " + error.message);

    }
}
export {
    checkExistPhoneNumber
}
