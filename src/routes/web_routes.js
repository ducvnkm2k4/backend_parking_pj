import ApiController from "../controllers/api_controller.js";
import MomoController from "../controllers/payment/momo_controller.js";
import express from 'express';
let apiRouter = express.Router()
let userRouter = express.Router()
let initApiRoute = (app) => {
    apiRouter.get('/api/v1/checkExistPhoneNumber', ApiController.getExistPhoneNumber)
    apiRouter.post('/api/v1/create-payment-momo', MomoController.createPayment);
    apiRouter.post('/api/v1/momo-callback', MomoController.callbackTranscation);
    apiRouter.post('/api/v1/momo-transaction-status', MomoController.transactionStatus);
    apiRouter.post('/api/v1/momo-refund', MomoController.refund)
    app.use("/", apiRouter)
}
let initUserRoute = (app) => {
    userRouter.get('/', (req, res) => res.send('hello world'));
    app.use("/", userRouter)
}
export { initApiRoute, initUserRoute };
