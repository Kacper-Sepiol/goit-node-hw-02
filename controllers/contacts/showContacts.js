import { contact } from "../../app.mjs";

function showContacts(req, res, next) {
    contact
        .find()
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

export { showContacts };
