// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';
// import config from '../config';
// import fs from 'fs';
// cloudinary.config({
//   cloud_name: config.CLOUDINARY_CLOUD_NAME,
//   api_key: config.CLOUDINARY_API_KEY,
//   api_secret: config.CLOUDINARY_API_SECRET,
// });

// export const sendImageToCloudinary = async (
//   path: string,
//   imageName: string,
// ) => {
//   // Upload an image

//   const uploadResult = await cloudinary.uploader
//     .upload(`${path}`, {
//       public_id: `${imageName}`,
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return uploadResult;
// };

// export const deleteImageFileFromUploadsFolder = (filePath: any) => {
//   // Delete the file
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error('Error deleting file:', err);
//     } else {
//       console.log('File deleted successfully!');
//     }
//   });
// };

// // MULTER CONFIGURATION....................................!!!!
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + '/uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   },
// });

// export const upload = multer({ storage: storage });
