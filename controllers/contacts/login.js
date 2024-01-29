import { contact } from "../../app.mjs";
import { signUpValidation } from "#validators/signUpValidator.mjs";
import jwt from "jsonwebtoken";

async function login(req, res, next) {
    const { email, password } = req.query;

    const { error, value } = signUpValidation.validate(req.query);

    if (error) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            data: "Błąd z Joi lub innej biblioteki walidacji",
        });
    }

    const user = await contact.findOne({ email });

    if (!user || !user.validPassword(password)) {
        return res.status(401).json({
            status: "Unauthorized",
            code: 401,
            data: "Email or password is wrong",
        });
    }

    const payload = {
        id: user.id,
        username: user.username,
        password: user.password,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    res.status(200).json({
        status: "OK",
        code: 200,
        data: token,
    });
}

export { login };
