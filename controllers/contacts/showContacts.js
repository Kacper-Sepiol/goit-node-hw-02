// import { listContacts } from "../../models/contacts.mjs";
import { contact } from "../../app.mjs";

// async function showContacts(req, res, next) {
//     try {
//         const contacts = await listContacts();
//         res.status(200).json({
//             contacts,
//         });
//     } catch (error) {
//         res.status(500).json(`An error occurred: ${error}`);
//     }
// }

function showContacts(req, res, next) {
    contact
        .find()
        .then((contacts) => {
            res.status(200).json({
                status: "success",
                code: 200,
                data: contacts,
            });
        })
        .catch((error) => {
            res.status(500).json(`An error occurred: ${error}`);
        });
}

export { showContacts };
