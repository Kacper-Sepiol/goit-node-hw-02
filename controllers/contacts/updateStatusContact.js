import { contact } from "../../app.mjs";

function updateStatusContact(req, res, next) {
    const { contactId } = req.params;

    contact.find({ _id: contactId }).then((contacts) => {
        if (contacts.length > 0) {
            const contactObj = contacts[0];

            if (contactObj.favorite === true) {
                contact
                    .updateOne({ _id: contactId }, { favorite: false })
                    .then((contacts) => {
                        return res.status(200).json({
                            status: "success",
                            code: 200,
                            data: contacts,
                        });
                    })
                    .catch((error) => {
                        return res
                            .status(500)
                            .json(`An error occurred: ${error}`);
                    });
            }

            if (contactObj.favorite === false) {
                contact
                    .updateOne({ _id: contactId }, { favorite: true })
                    .then((contacts) => {
                        return res.status(200).json({
                            status: "success",
                            code: 200,
                            data: contacts,
                        });
                    })
                    .catch((error) => {
                        return res
                            .status(500)
                            .json(`An error occurred: ${error}`);
                    });
            }
        } else {
            return res.status(400).json({
                status: "error",
                code: 400,
                message: "missing field favorite",
            });
        }
    });
}

export { updateStatusContact };
