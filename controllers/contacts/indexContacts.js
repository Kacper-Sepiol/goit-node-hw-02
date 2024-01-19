// import { getContactById } from "../../models/contacts.mjs";
import { contact } from "../../app.mjs";

function indexContacts(req, res, next) {
    const { contactId } = req.params;

    contact
        .find({ _id: contactId })
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

// async function indexContacts(req, res, next) {
//     const { contactId } = req.params;

//     try {
//         const contact = await getContactById(contactId);

//         if (contact.length === 0) {
//             res.status(404).json({
//                 message: "Not found",
//             });
//         }

//         if (contact) {
//             res.status(200).json({
//                 contact,
//             });
//         }
//     } catch (error) {
//         res.status(500).json(`An error occurred: ${error}`);
//     }
// }

export { indexContacts };
