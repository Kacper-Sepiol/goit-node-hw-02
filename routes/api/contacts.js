const express = require("express");
const func = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const data = await func.listContacts();
        res.json({
            status: "success",
            code: 200,
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const data = await func.getContactById(contactId);

        if (data.length === 0) {
            res.json({
                status: "ERROR",
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
    const body = { name: "irka", email: "irka@mail.com", phone: "34243423434" };

    try {
        const result = await func.addContact(body);

        if (result === 400) {
            res.send({
                status: "ERROR",
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
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;

    const numericContactId = parseInt(contactId);

    try {
        const result = await func.removeContact(numericContactId);

        if (result === 200) {
            res.json({
                status: "success",
                code: 200,
                message: "Contact deleted",
            });
        }

        if (result === 404) {
            res.json({
                status: "ERROR",
                code: 404,
                message: "Not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:contactId", async (req, res, next) => {
    res.json({ message: "template message" });
});

module.exports = router;
