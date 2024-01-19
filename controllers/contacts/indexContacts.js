import { getContactById } from "../../models/contacts.mjs";

async function indexContacts(req, res, next) {
    const { contactId } = req.params;

    try {
        const contact = await getContactById(contactId);

        if (contact.length === 0) {
            res.status(404).json({
                message: "Not found",
            });
        }

        if (contact) {
            res.status(200).json({
                contact,
            });
        }
    } catch (error) {
        res.status(500).json(`An error occurred: ${error}`);
    }
}

export { indexContacts };
