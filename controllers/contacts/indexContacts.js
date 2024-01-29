import { contact } from "../../app.mjs";

function indexContacts(req, res, next) {
    const { contactId } = req.params;

    contact
        .find({ _id: contactId })
        .then((contacts) => {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: contacts,
            });
        })
        .catch((error) => {
            return res.status(500).json(`An error occurred: ${error}`);
        });
}

export { indexContacts };
