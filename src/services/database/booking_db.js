import { firestoreDb } from '../../configs/firebase_config.js';
import SendNotification from '../notification_to_client/send_message.js';

class BookingDataBaseServices {
    static _db = firestoreDb.collection('bookParkings');
    static listeners = {};
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
            await this.startListenTicketStatus(docId);
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

    static async startListenTicketStatus(docId) {
        if (this.listeners[docId]) {
            console.log(`Listener cho docId ${docId} đã tồn tại.`);
            return;
        }

        let prevStatus = "create";

        this.listeners[docId] = this._db.doc(docId).onSnapshot(
            async (snapshot) => {

                if (snapshot.exists) {
                    const data = snapshot.data();
                    const { uId, parkingName, numberPlate, ticketStatus } = data;
                    console.log(`start listen for user ${uId} \n`);
                    if (prevStatus !== ticketStatus) {
                        await SendNotification.sendNotificationStatusTicket(ticketStatus, numberPlate, parkingName, uId, docId);
                    }

                    prevStatus = ticketStatus;

                    if (ticketStatus === "finish") {
                        this.stopListenTicketStatus(docId);
                    }
                }
            },
            (error) => {
                console.error(`Lỗi lắng nghe cho docId ${docId}:`, error);
            }
        );
    }
    static stopListenTicketStatus(docId) {
        if (this.listeners[docId]) {
            this.listeners[docId]();
            delete this.listeners[docId];
            console.log(`Đã dừng listener cho docId: ${docId}`);
        }
    }
}

export default BookingDataBaseServices;