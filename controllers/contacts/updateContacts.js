// import { updateContact as update } from "../../models/contacts.mjs";
import { contact } from "../../app.mjs";

function updateContact(req, res, next) {
    const { contactId } = req.params;

    const body = {
        name: "ireneusz",
        email: "ireneuszMichalinski@mail.com",
        phone: "",
    };

    if (body.name === "" && body.email === "" && body.phone === "") {
        res.status(400).json({
            status: "error",
            code: 200,
            message: "missing fields",
        });
    }

    if (body.name) {
        contact
            .updateOne({ _id: contactId }, { name: body.name })
            .then((contacts) => {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts,
                });
            });
        // .catch((error) => {
        //     res.status(404).json({
        //         status: "error",
        //         code: 404,
        //         message: "Not found",
        //     });
        // });
    }

    if (body.email) {
        contact
            .updateOne({ _id: contactId }, { email: body.email })
            .then((contacts) => {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts,
                });
            });
        // .catch((error) => {
        //     res.status(404).json({
        //         status: "error",
        //         code: 404,
        //         message: "Not found",
        //     });
        // });
    }

    if (body.phone) {
        contact
            .updateOne({ _id: contactId }, { phone: body.phone })
            .then((contacts) => {
                res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts,
                });
            });
        // .catch((error) => {
        //     res.status(404).json({
        //         status: "error",
        //         code: 404,
        //         message: "Not found",
        //     });
        // });
    }
}

// async function updateContact(req, res, next) {
//     const { contactId } = req.params;
//     const body = {
//         name: "Michal",
//         email: "michalMichalinski@mail.com",
//         phone: "",
//     };

//     try {
//         const updatedContact = await update(contactId, body);

//         if (updatedContact === 400) {
//             res.status(400).json({
//                 message: "missing fields",
//             });
//         }

//         if (updatedContact === 404) {
//             res.status(404).json({
//                 message: "Not found",
//             });
//         }

//         if (updatedContact[1] === 200) {
//             res.status(200).json({
//                 data: updatedContact[0],
//             });
//         }
//     } catch (error) {
//         res.status(500).json(`An error occurred: ${error}`);
//     }
// }

export { updateContact };
