import { listContacts } from "../../models/contacts.mjs";

async function showContacts(req, res, next) {
    try {
        const contacts = await listContacts();
        res.status(200).json({
            contacts,
        });
    } catch (error) {
        res.status(500).json(`An error occurred: ${error}`);
    }
}

export { showContacts };
