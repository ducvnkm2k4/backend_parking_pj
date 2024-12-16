
import express from "express";
import { initApiRoute, initUserRoute } from "./routes/web_routes.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initApiRoute(app);
initUserRoute(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
