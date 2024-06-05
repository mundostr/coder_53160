import multer from 'multer';
import config from './config.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, `${config.DIRNAME}/${config.UPLOAD_DIR}`)
        cb(null, config.UPLOAD_DIR)
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

export const uploader = multer({ storage: storage });
