import Jimp from "jimp";
import path from "path";
import fs from "fs/promises";
import { contact } from "../../app.mjs";

async function updateAvatar(req, res, next) {
    const dane = req.user;
    const avatarsDir = path.join(process.cwd(), "public", "avatars", "/");
    const picture = path.join(process.cwd(), "tmp");
    const avatarDir = path.join(picture, "/obraz.jpg");

    const email = dane.email + ".jpg";
    const newAvatarPath = path.join(avatarsDir, email);

    try {
        const image = await Jimp.read(avatarDir);
        image.resize(250, 250).write(newAvatarPath);
        await fs.unlink(avatarDir);

        contact
            .updateOne({ _id: dane._id }, { avatarURL: newAvatarPath })
            .then((contacts) => {
                return res.status(200).json({
                    message: "Avatar updated successfully",
                    avatar: newAvatarPath,
                });
            });
    } catch (error) {
        next(error);
    }
}

export { updateAvatar };
