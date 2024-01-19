// import { addContact } from "../../models/contacts.mjs";
import { contact } from "../../app.mjs";

function createContacts(req, res, next) {
    const body = {
        name: "jarek",
        email: "jarek@mail.com",
        phone: "6287468957968735763246",
        favorite: false,
    };

    if (
        body.name === "" ||
        body.email === "" ||
        body.phone === "" ||
        body.favorite === ""
    ) {
        res.status(400).json({
            status: "error",
            code: 400,
            message: "missing required name - field",
        });
    }

    contact
        .create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            favorite: body.favorite,
        })
        .then((contacts) => {
            res.status(201).json({
                status: "success",
                code: 201,
                data: contacts,
            });
        })
        .catch((error) => {
            res.status(500).json(`An error occurred: ${error}`);
        });
}

// async function createContacts(req, res, next) {
//     const body = {
//         name: "Michal",
//         email: "",
//         phone: "6287468957968735763246",
//     };

//     try {
//         const contactAdded = await addContact(body);

//         if (contactAdded === 400) {
//             res.status(400).json({
//                 message: "missing required name - field",
//             });
//         }

//         if (contactAdded[1] === 201) {
//             res.status(201).json({
//                 data: contactAdded[0],
//             });
//         }
//     } catch (error) {
//         res.status(500).json(`An error occurred: ${error}`);
//     }
// }

export { createContacts };
