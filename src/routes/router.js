import initAuthRoute from './api/auth_routes.js';
import initPayMentRouter from './api/payment_routes.js'
import initRouterTokenDevice from './api/token_device.js';
import verifyAppLinkRouter from './api/verify_app_link.js';


let initRouter = (app) => {
    initPayMentRouter(app);
    initAuthRoute(app);
    verifyAppLinkRouter(app);
    initRouterTokenDevice(app);
}

export default initRouter;