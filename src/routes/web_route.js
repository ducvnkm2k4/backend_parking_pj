import { getExistPhoneNumber } from "../controllers/user_controller.js";
import express from 'express';

let router = express.Router()

let initWebRoute = (app) => {
    router.get('/api/v1/checkExistPhoneNumber', getExistPhoneNumber)
    return app.use("/", router)
}

export { initWebRoute };
