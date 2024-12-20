import { firestoreDb } from '../../configs/firebase_config.js';

class BookingDataBaseServices {
    static _db = firestoreDb.collection('bookings');

    static async createRecord(id, uId, booking, paymentMethod) {
        try {
            let data = {
                "uid": uId,
                "numberPlate": booking.numberPlate,
                "createAt": new Date(),
                "totalCost": booking.totalCost,
                "paymentMethod": paymentMethod,
                "parkingName": booking.parkingName,
                "timeBooking": booking.timeBooking,
                "parkingAddress": booking.parkingAddress,
                "ticketStatus": 'create',
                //create -> paid[fail] -> in -> finish
            }

            await this._db.doc(id).set(data);

            console.log('Data saved successfully:', data);
        } catch (error) {
            console.error('Error while creating record:', error);
            throw new Error(error);
        }
    }

    static async updateTicketStatus(id, status) {
        try {
            // Correct syntax for updating a Firestore document
            await this._db.doc(id).update({ ticketStatus: status });
            console.log(`Paid status updated successfully for ID: ${id}`);
        } catch (error) {
            console.error('Error while updating paid status:', error);
            throw new Error(error);
        }
    }

}

export default BookingDataBaseServices;