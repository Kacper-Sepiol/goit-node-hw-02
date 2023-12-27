import express from "express";
import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from "../../models/contacts.mjs";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const data = await listContacts();
        res.json({
            status: "success",
            code: 200,
            data: data,
        });
    } catch (error) {
        console.error(error);
    }
});

router.get("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const data = await getContactById(contactId);

        if (data.length === 0) {
            res.json({
                status: "error",
                code: 404,
                message: "Not found",
            });
        }

        if (data) {
            res.json({
                status: "success",
                code: 200,
                data: data,
            });
        }
    } catch (error) {
        console.error();
    }
});

router.post("/", async (req, res, next) => {
    const body = {
        name: "Irmina",
        email: "",
        phone: "6287468957968735763246",
    };

    try {
        const result = await addContact(body);

        if (result === 400) {
            res.send({
                status: "error",
                code: 400,
                message: "missing required name - field",
            });
        }

        if (result[1] === 201) {
            res.send({
                status: "success",
                code: 201,
                data: result[0],
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.delete("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;

    try {
        const result = await removeContact(contactId);

        if (result === 200) {
            res.json({
                status: "success",
                code: 200,
                message: "Contact deleted",
            });
        }

        if (result === 404) {
            res.json({
                status: "error",
                code: 404,
                message: "Not found",
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.put("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const body = { name: "Darek", email: "", phone: "" };

    try {
        const result = await updateContact(contactId, body);

        if (result === 400) {
            res.json({
                status: "error",
                code: 400,
                message: "missing fields",
            });
        }

        if (result === 404) {
            res.json({
                status: "error",
                code: 404,
                message: "Not found",
            });
        }

        if (result[1] === 200) {
            res.json({
                status: "success",
                code: 200,
                data: result[0],
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});

export default router;
