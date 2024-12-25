import { firestoreDb } from '../../configs/firebase_config.js';

class BookingDataBaseServices {
    static _db = firestoreDb.collection('bookParkings');

    static async createRecord(docId, orderId, uId, booking, paymentMethod) {
        let createAt = new Date();
        let expirationTime = new Date(createAt);
        expirationTime.setHours(expirationTime.getHours() + booking.timeBooking);
        try {
            let data = {
                "uId": uId,
                "paymentId": orderId,
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
            await this._db.doc(docId).set(data)
            console.log('Data saved successfully:', data);
        } catch (error) {
            console.error('Error while creating record:', error);
            throw new Error(error);
        }
    }

    static async updateTicketStatus(status, requestId) {
        try {
            await this._db.doc(requestId).update({ ticketStatus: status });
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
            throw new Error(error);
        }
    }

}

export default BookingDataBaseServices;