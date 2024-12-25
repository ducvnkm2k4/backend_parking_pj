import { firestoreDb } from '../../configs/firebase_config.js';

class BookingDataBaseServices {
    static _db = firestoreDb.collection('bookParkings');

    static async createRecord(id, uId, booking, paymentMethod) {
        let createAt = new Date();
        let expirationTime = new Date(createAt);
        expirationTime.setHours(expirationTime.getHours() + booking.timeBooking);
        try {
            let data = {
                "uid": uId,
                "paymentId": id,
                "numberPlate": booking.numberPlate,
                "createAt": createAt,
                "expirationTime": expirationTime,
                "totalCost": booking.totalCost,
                "paymentMethod": paymentMethod,
                "parkingName": booking.parkingName,
                "timeBooking": booking.timeBooking,
                "parkingAddress": booking.parkingAddress,
                "ticketStatus": 'create',
                //create -> paid[fail] -> in -> finish
            }
            await this._db.add(data);
            console.log('Data saved successfully:', data);
        } catch (error) {
            console.error('Error while creating record:', error);
            throw new Error(error);
        }
    }

    static async updateTicketStatus(id, status) {
        try {
            await this._db.where('paymentId', '==', id).update({ ticketStatus: status });
            console.log(`Paid status updated successfully for ID: ${id}`);
        } catch (error) {
            console.error('Error while updating paid status:', error);
            throw new Error(error);
        }
    }

}

export default BookingDataBaseServices;