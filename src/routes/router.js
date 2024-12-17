import initAuthRoute from './api/auth_routes.js';
import initPayMentRouter from './api/payment_routes.js'

let initRouter = (app) => {
    initPayMentRouter(app);
    initAuthRoute(app);
}

export default initRouter;