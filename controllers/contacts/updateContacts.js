import { contact } from "../../app.mjs";

function updateContact(req, res, next) {
    const { contactId } = req.params;

    // to do poprawy
    const body = {
        name: "ireneusz",
        email: "ireneuszMichalinski@mail.com",
        phone: "",
    };

    if (body.name === "" && body.email === "" && body.phone === "") {
        return res.status(400).json({
            status: "error",
            code: 200,
            message: "missing fields",
        });
    }

    if (body.name) {
        contact
            .updateOne({ _id: contactId }, { name: body.name })
            .then((contacts) => {
                return res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts,
                });
            });
    }

    if (body.email) {
        contact
            .updateOne({ _id: contactId }, { email: body.email })
            .then((contacts) => {
                return res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts,
                });
            });
    }

    if (body.phone) {
        contact
            .updateOne({ _id: contactId }, { phone: body.phone })
            .then((contacts) => {
                return res.status(200).json({
                    status: "success",
                    code: 200,
                    data: contacts,
                });
            });
    }
}

export { updateContact };
