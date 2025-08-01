"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deleteImageFileFromUploadsFolder = exports.sendImageToCloudinary = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.default.CLOUDINARY_API_KEY,
    api_secret: config_1.default.CLOUDINARY_API_SECRET,
});
const sendImageToCloudinary = (path, imageName) => __awaiter(void 0, void 0, void 0, function* () {
    // Upload an image
    const uploadResult = yield cloudinary_1.v2.uploader
        .upload(`${path}`, {
        public_id: `${imageName}`,
    })
        .catch((error) => {
        console.log(error);
    });
    return uploadResult;
});
exports.sendImageToCloudinary = sendImageToCloudinary;
const deleteImageFileFromUploadsFolder = (filePath) => {
    // Delete the file
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        }
        else {
            console.log('File deleted successfully!');
        }
    });
};
exports.deleteImageFileFromUploadsFolder = deleteImageFileFromUploadsFolder;
// MULTER CONFIGURATION....................................!!!!
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
