import { updateContact as update } from "../../models/contacts.mjs";

async function updateContact(req, res, next) {
    const { contactId } = req.params;
    const body = {
        name: "Michal",
        email: "michalMichalinski@mail.com",
        phone: "",
    };

    try {
        const updatedContact = await update(contactId, body);

        if (updatedContact === 400) {
            res.status(400).json({
                message: "missing fields",
            });
        }

        if (updatedContact === 404) {
            res.status(404).json({
                message: "Not found",
            });
        }

        if (updatedContact[1] === 200) {
            res.status(200).json({
                data: updatedContact[0],
            });
        }
    } catch (error) {
        res.status(500).json(`An error occurred: ${error}`);
    }
}

export { updateContact };
