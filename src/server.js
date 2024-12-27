
import express from "express";
import dotenv from 'dotenv';
import initRouter from "./routes/router.js";
import TokenDevice from "./assets/token_devices.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app);
app.use('/', (req, res) => res.send('this is home page'));
app.use('/home', (req, res) => res.send('this is home page'));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`list token device:\n`, TokenDevice.listTokenDevice);
});
