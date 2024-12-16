import { MomoPaymentService } from "../../services/payment_services.js";
class MomoController {
    //request userid, object booking, amount
    static async createPayment(req, res) {
        let { amount } = req.body;
        console.log(amount);
        try {
            const result = await MomoPaymentService.createPayment(amount);
            console.log(result);
            return res.status(200).json({
                statusCode: 200,
                message: "complete create payment momo",
                data: result
            })
        } catch (e) {
            return res.status(500).json({ statusCode: 500, message: "error create payment momo", error: e.message })
        }
    }
    static async callbackTranscation(req, res) {
        console.log("callback:.....");
        console.log(req.body);
        return res.status(200).json({ message: "momo callback transaction", data: req.body });
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