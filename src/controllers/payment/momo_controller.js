import { json } from "express";
import MomoPaymentService from "../../services/payment/momo.js";
import BookingDataBaseServices from "../../services/database/booking_db.js";
class MomoController {
    static async createPayment(req, res) {
        try {
            const result = await MomoPaymentService.createPayment(req.body);
            return res.status(200).json({
                statusCode: 200,
                message: "complete create payment momo",
                data: result
            })
        } catch (e) {
            return res.status(500).json({ statusCode: 500, message: "error create payment momo", error: e.message })
        }
    }

    static async callbackTransaction(req, res) {
        try {
            const { resultCode, requestId } = req.body;
            if (resultCode == 0) {
                await BookingDataBaseServices.updateTicketStatus("paid", requestId);
            } else {
                //update vào users
            }

            return res.status(200).json({
                message: "Momo call back and update status ticket"
            })
        } catch (err) {
            console.log('error momo callback:', err);
            return res.status(500).json({
                message: "error update ticket status",
                error: err
            })
        }
    }

    static async transactionStatus(req, res) {
        let { orderId } = req.body;
        try {
            const result = await MomoPaymentService.transactionStatus(orderId);
            console.log("check trans:", result);
            return res.status(200).json({
                statusCode: 200,
                message: "complete check transaction payment momo",
                data: result
            })
        } catch (error) {
            return res.status(500).json({ statusCode: 500, message: "error check transaction payment momo", error: error.message })
        }

    }

    static async refund(req, res) {

        try {
            let { orderId, transId, amount } = req.body;
            const result = await MomoPaymentService.refund(orderId, transId, amount);
            console.log('momo refund: $result');
            return res.status(200).json({
                statusCode: 200,
                message: "complete refund transaction payment momo",
                data: result,
            });
        } catch (ex) {
            return res.status(500).json({
                message: "error refund transaction payment momo",
                error: ex.message
            });
        }
    }
}

export default MomoController;