import multer from "multer";
import path from "path";

const tmpDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tmpDir);
    },
    filename: (req, file, cb) => {
        cb(null, "obraz.jpg");
    },
    limits: {
        fileSize: 1048576,
    },
});

export const upload = multer({
    storage: storage,
});
