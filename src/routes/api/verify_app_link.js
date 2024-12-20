import express from 'express';
import path from 'path';
const router = express.Router();

let verifyAppLinkRouter = (app) => {
    router.get('/.well-known/assetlinks.json', (req, res) => {

        const filePath = path.resolve('src/assets/private/assetlinks.json ');
        console.log('assetslinks:', filePath);

        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(500).send('Error sending file');
            }
        });
    });
    app.use('/', router);
}

export default verifyAppLinkRouter;