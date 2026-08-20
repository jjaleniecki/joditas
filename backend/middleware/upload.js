const multer = require('multer');
const path = require('path');
const { randomUUID } = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../src/assets/images'));
    },
    filename: (req, file, cb) => {
        // Nombre único para evitar colisiones entre uploads
        const extension = path.extname(file.originalname); // .jpg, .png, etc.
        const uniqueName = `${randomUUID()}${extension}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes JPG o PNG'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB máximo
});

module.exports = upload;