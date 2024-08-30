import path from 'path';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import config from './config.js';

/**
 * Generamos un storage para upload en la nube a servicio de Cloudinary (cloudStorage),
 * y otro para almacenamiento en disco local (localStorage)
 */
cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
})

const cloudStorage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
        folder: path.basename(req.path),
        allowed_formats: ['jpg', 'png'],
        transformation: [{ width: 640 }],
        // public_id: (req, file) => file.originalname.split('.')[0]
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`
    }
});

const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const subFolder = path.basename(req.path);
        cb(null, `${config.UPLOAD_DIR}/${subFolder}/`);
    },

    filename: (req, file, cb) => {
        // cb(null, file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Activamos el uploader cloud o local según config.STORAGE
export const uploader = multer({ storage: config.STORAGE === 'cloud' ? cloudStorage: localStorage });
