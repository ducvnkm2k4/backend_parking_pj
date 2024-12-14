
import express from "express";
import { initWebRoute } from "./routes/web_route.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

initWebRoute(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
