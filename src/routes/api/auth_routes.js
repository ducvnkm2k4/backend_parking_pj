import express from 'express';
import ApiController from '../../controllers/api_controller.js';

let authRouter = express.Router()

let initAuthRoute = (app) => {
    authRouter.get('/v1/check-exist-phone-number', ApiController.getExistPhoneNumber)
    app.use('/api/auth', authRouter);
}

export default initAuthRoute;