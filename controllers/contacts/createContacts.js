import { contact } from "../../app.mjs";
import { signUpValidation } from "#validators/signUpValidator.mjs";

function createContacts(req, res, next) {
    const { name, email, phone } = req.query;

    const { error, value } = signUpValidation.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
        });
    }

    contact
        .create({
            name: name,
            email: email,
            phone: phone,
            favorite: false,
        })
        .then((contacts) => {
            return res.status(201).json({
                status: "success",
                code: 201,
                data: contacts,
            });
        })
        .catch((error) => {
            return res.status(500).json(`An error occurred: ${error}`);
        });
}

export { createContacts };
