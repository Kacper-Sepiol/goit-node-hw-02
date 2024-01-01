import { addContact } from "../../models/contacts.mjs";

async function createContacts(req, res, next) {
    const body = {
        name: "Michal",
        email: "",
        phone: "6287468957968735763246",
    };

    try {
        const contactAdded = await addContact(body);

        if (contactAdded === 400) {
            res.status(400).json({
                message: "missing required name - field",
            });
        }

        if (contactAdded[1] === 201) {
            res.status(201).json({
                data: contactAdded[0],
            });
        }
    } catch (error) {
        res.status(500).json(`An error occurred: ${error}`);
    }
}

export { createContacts };
