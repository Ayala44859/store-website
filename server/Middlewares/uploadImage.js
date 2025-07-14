import multer from 'multer';

// הגדרת הגדרות של multer להעלאת הקובץ
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'staticFile/images/'); // מיקום שבו ישמרו התמונות
//   },
//   filename: function (req, file, cb) {
//     const originalFilename = file.originalname; // שם הקובץ המקורי
//     cb(null, originalFilename);
//   }
// });

// const storage = multer.memoryStorage();

// פונקציה להעלאת התמונה
// const upload = multer({ storage: storage }).single('file'); // קובץ בודד תחת המפתח 'file'

// const upload = multer({ storage: storage });


// const uploadImage = (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error uploading image.');
//     }
//     next(); // אחרי שהעלאת התמונה הצליחה, נמשיך לפונקציה הבאה
//   });
// };


const upload = multer({ storage: multer.memoryStorage() });



export default upload;