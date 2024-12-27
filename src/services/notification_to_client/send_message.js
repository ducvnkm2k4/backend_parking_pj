import { response } from "express";
import TokenDevice from "../../assets/token_devices.js";
import { admin } from "../../configs/firebase_config.js";

class SendNotification {
    static async sendNotificationStatusTicket(status, numberPlate, parkingAddress, uId, docId) {
        const registationToken = TokenDevice.getTokenDevice(uId);
        let body;
        switch (status) {
            case 'paid':
                body = `Bạn đã đặt vé thành công ${parkingAddress} cho xe có biển số ${numberPlate} `;
                break;
            case 'in':
                body = `Bạn đã vào ${parkingAddress} với xe có biển số ${numberPlate} `;
                break;
            case 'finish':
                body = `Bạn đã rời ${parkingAddress} với xe có biển số ${numberPlate} `;
                break;
            case 'fail':
                body = `Thanh toán thất bại`;
                break;
            default:
                break;
        }

        const message = {
            notification: {
                body: body,
            },
            data: {
                docId: docId
            },
            token: registationToken,
            android: {
                notification: {
                    sound: 'default',
                    priority: 'high',
                    defaultVibrateTimings: true,  // Thêm dòng này thay cho `vibration`
                }
            },
        }
        await admin.messaging()
            .send(message)
            .then((response) => { })
            .catch((error) => {
                console.log(`lỗi gửi tin nhắn: \n ${error}`);
                TokenDevice.removeTokenDevice(uId);
            });
    }
}

export default SendNotification;
