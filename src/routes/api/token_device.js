import express from 'express';
import ApiController from '../../controllers/api_controller.js';

const router = express();

let initRouterTokenDevice = (app) => {
    router.put('/api/v1/update-token-device', ApiController.updateTokenDevice);
    app.use('/', router);
}

export default initRouterTokenDevice;