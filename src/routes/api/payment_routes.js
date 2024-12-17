import express from 'express'
import MomoController from '../../controllers/payment/momo_controller.js';
import ZaloPayConfig from '../../configs/zalo_pay_config.js';

const paymentRouter = express.Router();

let initPayMentRouter = (app) => {
    //momo
    paymentRouter.post('/v1/create-payment-momo', MomoController.createPayment);
    paymentRouter.post('/v1/momo-callback', MomoController.callbackTranscation);
    paymentRouter.post('/v1/momo-transaction-status', MomoController.transactionStatus);
    paymentRouter.post('/v1/momo-refund', MomoController.refund);
    //zalo pay
    paymentRouter.post('/v1/create-payment-zaloPay', ZaloPayConfig.createPayment)
    app.use('/api/payment', paymentRouter);
}

export default initPayMentRouter;