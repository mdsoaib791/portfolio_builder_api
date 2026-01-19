import multer from 'multer';

// Set storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../../public/upload'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// Multer instance for multiple file upload (field name: 'files')
// export const upload = multer({ storage }).array('files');

// Usage in controller:
// import { uploadMultiple } from '../utils/multer';
// router.post('/upload', uploadMultiple, (req, res) => {
//   // Access files via req.files, other form data via req.body
// });

const storage = multer.memoryStorage();

// Multer instance for multiple file upload (fields: 'profileImage', 'cv')
export const upload = multer({
  storage
}).fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]);
