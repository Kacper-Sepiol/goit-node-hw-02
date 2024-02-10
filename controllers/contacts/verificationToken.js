import { contact } from "../../app.mjs";
import { sendingEmail } from "../../mailgun/sendEmail.js";

function verificationToken(req, res, next) {
    const { verificationToken } = req.params;

    if (verificationToken) {
        contact
            .findOne({ verificationToken: verificationToken })
            .then((result) => {
                sendingEmail(result.email, verificationToken);
            })
            .catch((error) => console.log(error));
    }

    contact
        .updateOne(
            { verificationToken: verificationToken },
            { $set: { verificationToken: null, verify: true } }
        )
        .then((result) => {
            if (result.n === 0) {
                return res.status(404).json({
                    status: "Not Found",
                    code: 404,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                status: "success",
                code: 200,
                message: "Verification successful",
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "Internal Server Error",
                code: 500,
                message: "An error occurred while processing the request",
            });
        });
}

export { verificationToken };
