import { productModel } from "../Model/product_resource.js";
import { check, checkManager } from "../Middlewares/check.js";
import uploadImage from '../Middlewares/uploadImage.js'

// שליפת כל המוצרים
export async function getAllProducts(req, res) {
    let l = parseInt(req.query.limit) || 12;
    let page = parseInt(req.query.page) || 1;
    let category = req.params.category || "ALL"; // קבלת הקטגוריה מהנתיב
    
    let filter = {};
    if (category !== "ALL") {
        filter.categories = { $in: [category] }; // סינון לפי קטגוריה במערך
    }

    try {
        let getAll = await productModel.find(filter).skip((page - 1) * l).limit(l);
        res.json(getAll);
    } catch (err) {
        res.status(400).json({
            title: "Cannot get all products",
            message: err.message,
        });
    }
}

export async function getTotalPages(req, res) {
    let { limit } = req.query;
    let { category } = req.params;  // תיקון - קטגוריה במקום `categoty`

    // יצירת אובייקט סינון עבור קטגוריה
    let filter = {};
    if (category !== "ALL") {
        filter.categories = { $in: [category] }; // סינון לפי קטגוריה במערך
    }

    try {
        // חישוב מספר המסמכים לפי הסינון של הקטגוריה
        let count = await productModel.countDocuments(filter);

     return   res.json({
            pages: Math.ceil(count / limit),  // חישוב מספר העמודים
            count,  // מספר המוצרים
            limit   // גבול התוצאות לעמוד
        });
    } catch (err) {
     return   res.status(400).json({
            title: "cannot get total pages",
            message: err.message,
        });
    }
}


// שליפת מוצר לפי קוד-ID
export async function getProductById(req, res) {
    let { id } = req.params;
    try {
        let getProductbyId = await productModel.findById(id);
        if (!getProductbyId)
            return res.status(404).json({
                title: "cannot get product by id",
                message: "no product with such id",
            });
        res.json(getProductbyId);
    } catch (err) {
        res.status(400).json({
            title: "cannot get product by id",
            message: err.message,
        });
    };
}

// הוספת מוצר
// export async function addProduct(req, res) {
//     checkManager(req, res, async () => {
//         let { body } = req;
//         if (!body.productName || !body.price || !body.dateOfManufacture) {
//             return res.status(400).json({
//                 title: "Missing data in body",
//                 message: "productName, price, and dateOfManufacture are required",
//             });
//         }
//         try {
//             let alreadyProduct = await productModel.findOne({ productName: body.productName });
//             if (alreadyProduct) {
//                 return res.status(409).json({
//                     title: "product already exists",
//                     message: "Change product name",
//                 });
//             }
//             let newProduct = new productModel(body);
//             await newProduct.save();
//             res.status(201).json(newProduct);
//         } catch (err) {
//             res.status(500).json({
//                 title: "Cannot add new product",
//                 message: err.message,
//             });
//         }
//     });
// }






// export async function addProduct(req, res) {
//     console.log(req.file);
//     checkManager(req, res, async () => {
        // let { body } = req;
        // if (!body.productName || !body.price || !body.dateOfManufacture) {
        //     return res.status(400).json({
        //         title: "Missing data in body",
        //         message: "productName, price, and dateOfManufacture are required",
        //     });
        // }
    //     try {
    //         let alreadyProduct = await productModel.findOne({ productName: body.productName });
    //         if (alreadyProduct) {
    //             return res.status(409).json({
    //                 title: "product already exists",
    //                 message: "Change product name",
    //             });
    //         }

    //         // קבלת שם הקובץ המועלה
    //         let imageFileName = req.file ? req.file.filename : null;

    //         let newProduct = new productModel({
    //             ...body,
    //             img: imageFileName, // הוספת שם הקובץ לשדה img
    //         });
    //         await newProduct.save();
    //         res.status(201).json(newProduct);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({
    //             title: "Cannot add new product",
    //             message: err.message,
    //         });
    //     }
//     });
// }



export async function addProduct(req, res) {
    // את המידלוור הזה כבר הרצנו ב-router, אז אין צורך לקרוא לו שוב.
    // אבל אם זה המבנה שלך, נשאיר את הלוגיקה בתוך הקולבק.
    checkManager(req, res, async () => {
        try {
            // 1. ודא שהועלה קובץ
            if (!req.file) {
                return res.status(400).json({ message: "Image is required. Please upload a file." });
            }

            // 2. ודא ששדות החובה קיימים בגוף הבקשה
            const { body } = req;
            if (!body.productName || !body.price) { // הורדתי את התאריך כי הוא לא תמיד חובה
                return res.status(400).json({
                    title: "Missing data in body",
                    message: "productName and price are required",
                });
            }

            // 3. בדוק אם מוצר עם אותו שם כבר קיים
            let alreadyProduct = await productModel.findOne({ productName: body.productName });
            if (alreadyProduct) {
                return res.status(409).json({
                    title: "product already exists",
                    message: "Change product name",
                });
            }

            // 4. העלאת התמונה ל-Cloudinary
            // המרת ה-buffer של הקובץ מהזיכרון לפורמט ש-Cloudinary מבין
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            // שליחת הקובץ לענן
            const uploadResponse = await cloudinary.uploader.upload(dataURI, {
                folder: "products" // שם התיקייה ב-Cloudinary לארגון
            });

            // 5. יצירת רשומת המוצר החדש עם ה-URL מהענן
            let newProduct = new productModel({
                productName: body.productName,
                description: body.description,
                price: body.price,
                categories: body.categories,
                dateOfManufacture: body.dateOfManufacture,
                // ** כאן נכנסת הכתובת שקיבלנו מ-Cloudinary! **
                // ודא שבמודל שלך השדה נקרא 'img' או 'imageUrl'
                img: uploadResponse.secure_url
            });

            // 6. שמירת המוצר במסד הנתונים
            await newProduct.save();

            // 7. החזרת תשובה מוצלחת
            res.status(201).json(newProduct);

        } catch (err) {
            console.error("Error adding new product:", err);
            res.status(500).json({
                title: "Cannot add new product",
                message: err.message,
            });
        }
    });
}



// עדכון מוצר
export async function updatProduct(req, res) {
    checkManager(req, res, async () => {
        let { id } = req.params;
        let { body } = req;
        if (body.dateOfManufacture) {
            return res.status(400).json({
                title: "Invalid update request",
                message: "Cannot update dateOfManufacture here",
            });
        }
        try {
            console.log("Request Body:", body);
            let product = await productModel.findByIdAndUpdate(id, body, { new: true });
            if (!product) {
                return res.status(404).json({
                    title: "Product not found",
                    message: "No product found with such ID",
                });
            }
            res.json(product);
        } catch (err) {
            console.error("Error updating product:", err);
            res.status(500).json({
                title: "Error updating product",
                message: err.message,
            });
        }
    });
}

// מחיקת מוצר לפי ID
export async function deleteProductById(req, res) {

    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
}