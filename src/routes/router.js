import initAuthRoute from './api/auth_routes.js';
import initPayMentRouter from './api/payment_routes.js'
import verifyAppLinkRouter from './api/verify_app_link.js';


let initRouter = (app) => {
    initPayMentRouter(app);
    initAuthRoute(app);
    verifyAppLinkRouter(app);
}

export default initRouter;