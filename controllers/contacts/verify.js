import { contact } from "../../app.mjs";
import { sendingEmail } from "../../mailgun/sendEmail.js";
import { verifyEmail } from "../../validators/signUpValidator.mjs";

function verify(req, res, next) {
    const { email } = req.body;

    const { error, value } = verifyEmail.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "missing required field email",
        });
    }

    contact.findOne({ email: email }).then((result) => {
        if (result.verify === true) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: "Verification has already been passed",
            });
        }

        if (result.verify === false) {
            sendingEmail(result.email);
            return res.status(200).json({
                status: "OK",
                code: 200,
                message: "Verification email sent",
            });
        }
    });
}

export { verify };
