import { contact } from "../../app.mjs";
import { signUpValidation } from "#validators/signUpValidator.mjs";
import gravatar from "gravatar";

async function signUp(req, res, next) {
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
    if (user) {
        return res.status(400).json({
            status: "Conflict",
            code: 409,
            data: "Email is use",
        });
    }

    const avatarURL = gravatar.url(email);

    try {
        const newUser = new contact({ email, password, avatarURL });
        newUser.setPassword(password);
        await newUser.save();
        return res.status(201).json({
            status: "created",
            code: 201,
            data: "Registration successful!",
        });
    } catch (error) {
        next(error);
    }
}

export { signUp };
