import express from 'express';
import path from 'path';
import fs from 'fs/promises';
const router = express.Router();

let verifyAppLinkRouter = (app) => {
    router.get('/.well-known/assetlinks.json', async (req, res) => {
        try {
            const filePath = path.resolve('src/assets/assetlinks.json');
            const data = await fs.readFile(filePath, 'utf-8');

            const updateData = data
                .replace('{{package_name}}', process.env.PACKAGE_NAME)
                .replace('{{sha256}}', process.env.SHA256_CERT_FINGERPRINTS);

            res.json(JSON.parse(updateData));
        } catch (err) {
            console.error('Error reading or processing file:', err);
            res.status(500).send('Error processing file');
        }
    });
    app.use('/', router);
};

export default verifyAppLinkRouter;
