"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
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
const storage = multer_1.default.memoryStorage();
// Multer instance for multiple file upload (fields: 'profileImage', 'cv')
exports.upload = (0, multer_1.default)({
    storage
}).fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
]);
