import express from 'express';
import dotenv from 'dotenv'; 
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';

import userRouter from "./Routers/user.js";
import productRouter from "./Routers/product.js";
import orderRouter from "./Routers/order.js";
import { connectToDb } from './Config/db.js';

dotenv.config();
// חיבור למסד הנתונים
connectToDb();

const app = express();

// הגדרת CORS
app.use(cors());
app.use(express.json());
// app.use("/api/images",express.static("staticFile/images"));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// הגדרת הפורט
const port = process.env.PORT || 5500;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// הפעלת השרת עם כתובת '0.0.0.0' כדי ש־Render יוכל לגשת
app.listen(port, "0.0.0.0", () => {
    console.log(`App is listening on port ${port}`);
});
