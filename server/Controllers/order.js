import { orderModel } from "../Model/order_resource.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const { Types } = mongoose;

//שליפת כל ההזמנות
export async function getAllOrder(req, res) {
    try {
        let getAll = await orderModel.find();
        res.json(getAll)
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get all orders ",
            message: err.message
        })
    }
}

//הוספת הזמנה 

export async function addOrder(req, res) {
    try {
        // שליפת ה-Token מה-Headers
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                title: "Unauthorized",
                message: "No token provided"
            });
        }

        // פענוח ה-Token
        let decoded;
        try {
            decoded = jwt.verify(token,process.env.SECRET_KEY);
        } catch (err) {
            return res.status(403).json({
                title: "Invalid Token",
                message: "Token is not valid or expired"
            });
        }

        // קבלת הנתונים מה-Body
        let { targetDate, products } = req.body;

        // בדיקה אם כל השדות הדרושים קיימים
        if (!targetDate || !products) {
            return res.status(400).json({
                title: "Missing data in body",
                message: "targetDate and products are required"
            });
        }

        const clientCode = decoded.userId; // מזהה המשתמש מתוך ה-Token

        // בדיקת כפילות הזמנה
        let duplicateOrder = await orderModel.findOne({
            clientCode,
            targetDate,
            "products._id": { $in: products.map(p => p._id) }
        });

        if (duplicateOrder) {
            return res.status(409).json({
                title: "Duplicate order",
                message: "An order with the same clientCode, targetDate, and products already exists"
            });
        }

        // שמירת ההזמנה במסד הנתונים
        let newOrder = new orderModel({
            clientCode,
            targetDate,
            products
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({
            title: "Cannot add new order",
            message: err.message
        });
    }
}
//מחיקת הזמנה
export async function deleteOrderById(req, res) {
    
      const { id,isShipped } = req.params; 
      if(isShipped==true)
        return res.status(404).json({ error: "order isShipped " });
      try {
      const deletedOrder = await orderModel.findByIdAndDelete(id); 
  
      if (!deletedOrder) {
        return res.status(404).json({ error: "order not found" }); 
      }
  
      res.status(200).json({ message: "Product deleted successfully", deletedOrder });
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };
  //שליפת כל המוצרים של קליינט מסויים
  export async function getAllOrderByClientCode(req, res) {
    const { clientCode } = req.params;

    // בדיקת תקינות של clientCode
    if (!clientCode || !Types.ObjectId.isValid(clientCode)) {
        return res.status(400).json({
            title: "שגיאה בקלט",
            message: "נדרש clientCode חוקי",
        });
    }

    try {
        // חיפוש ההזמנות במסד הנתונים לפי clientCode
        const orders = await orderModel.find({ clientCode });

        // אם לא נמצאו הזמנות עבור ה-clientCode
        if (!orders.length) {
            return res.status(404).json({
                title: "לא נמצאו הזמנות",
                message: "לא נמצאו הזמנות עבור clientCode שסופק",
            });
        }

        // החזרת התשובה עם כל ההזמנות
        res.json({
            title: "ההזמנות נמצאו",
            count: orders.length,
            orders,
        });
    } catch (err) {
        // טיפול בשגיאה אם יש בעיה בבסיס הנתונים
        res.status(500).json({
            title: "שגיאת בסיס נתונים",
            message: err.message,
        });
    }
}
// פונקציה לעדכון הזמנה ל"יצאה לדרך"
export async function updatOrder(req, res) {
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            title: "שגיאה בקלט",
            message: "נדרש קוד הזמנה חוקי",
        });
    }

    try {
        
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId, 
            { isShipped: true }, // ערך העדכון
            { new: true } // אופציה שתחזיר את ההזמנה המעודכנת
        );

        // אם לא נמצאה ההזמנה
        if (!updatedOrder) {
            return res.status(404).json({
                title: "הזמנה לא נמצאה",
                message: "לא נמצאה הזמנה עם קוד ההזמנה שסופק",
            });
        }

        // החזרת ההזמנה המעודכנת
        res.json({
            title: "הזמנה עודכנה בהצלחה",
            order: updatedOrder,
        });
    } catch (err) {
        res.status(500).json({
            title: "שגיאת בסיס נתונים",
            message: err.message,
        });
    }
}
