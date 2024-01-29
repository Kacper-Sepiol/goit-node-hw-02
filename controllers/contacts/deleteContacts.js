import { contact } from "../../app.mjs";

function deleteContacts(req, res, next) {
    const { contactId } = req.params;

    contact
        .deleteOne({ _id: contactId })
        .then((contacts) => {
            return res.status(200).json({
                status: "success",
                code: 200,
                message: "contact deleted",
            });
        })
        .catch((error) => {
            return res.status(404).json({
                status: "error",
                code: 404,
                message: "Not found",
            });
        });
}

export { deleteContacts };
