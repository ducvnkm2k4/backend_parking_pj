import axios from "axios";
import MomoConfig from "../../configs/momo_config.js";
import BookingDataBaseServices from "../database/booking_db.js";

class MomoPaymentService {
    static async createPayment(reqBody) {
        let orderId = process.env.MOMO_PARTNER_CODE + new Date().getTime();
        const booking = JSON.parse(reqBody.booking);
        const options = {

            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            data: MomoConfig.createPayment(booking.totalCost, orderId, reqBody.uId),
        }

        try {
            const response = await axios(options);
            console.log('create payment momo:\n', response.data);

            await BookingDataBaseServices.createRecord(orderId, reqBody.uId, booking, 'momo');
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }

    static async transactionStatus(orderId) {
        const options = {
            url: 'https://test-payment.momo.vn/v2/gateway/api/query',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            data: MomoConfig.transactionStatus(orderId),
        }
        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            throw new Error(error.message);

        }
    }

    static async refund(orderId, transId, amount) {
        const options = {
            url: 'https://test-payment.momo.vn/v2/gateway/api/refund',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            data: MomoConfig.refund(orderId, transId, amount),
        }

        try {
            const response = await axios(options);
            return response.data;
        } catch (error) {
            throw new Error(error.message);

        }
    }
}

export default MomoPaymentService;