import { contact } from "../../app.mjs";
import { signUpValidation } from "#validators/signUpValidator.mjs";

function createContacts(req, res, next) {
    const { name, email, phone } = req.query;

    const resultValidate = signUpValidation.validate(req.body);

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
