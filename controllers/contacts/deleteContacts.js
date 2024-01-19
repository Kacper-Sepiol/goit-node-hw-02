// import { removeContact } from "../../models/contacts.mjs";
import { contact } from "../../app.mjs";

function deleteContacts(req, res, next) {
    const { contactId } = req.params;

    contact
        .deleteOne({ _id: contactId })
        .then((contacts) => {
            res.status(200).json({
                status: "success",
                code: 200,
                message: "contact deleted",
            });
        })
        .catch((error) => {
            res.status(404).json({
                status: "error",
                code: 404,
                message: "Not found",
            });
        });
}

// async function deleteContacts(req, res, next) {
//     const { contactId } = req.params;

//     try {
//         const deletedContact = await removeContact(contactId);

//         if (deletedContact === 200) {
//             res.status(200).json({
//                 message: "Contact deleted",
//             });
//         }

//         if (deletedContact === 404) {
//             res.status(404).json({
//                 message: "Not found",
//             });
//         }
//     } catch (error) {
//         res.status(500).json(`An error occurred: ${error}`);
//     }
// }

export { deleteContacts };
