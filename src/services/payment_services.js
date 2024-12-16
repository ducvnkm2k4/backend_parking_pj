import axios from "axios";
import MomoConfig from "../configs/momo_config.js";
class MomoPaymentService {
    static async createPayment(amount) {

        const options = {

            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            data: MomoConfig.createPayment(amount)
        }
        //Send the request and get the response
        try {
            const response = await axios(options);
            console.log(response.data);
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

export { MomoPaymentService };