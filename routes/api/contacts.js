import express from "express";
import { showContacts } from "../../controllers/contacts/showContacts.js";
import { indexContacts } from "../../controllers/contacts/indexContacts.js";
import { createContacts } from "../../controllers/contacts/createContacts.js";
import { deleteContacts } from "../../controllers/contacts/deleteContacts.js";
import { updateContact } from "../../controllers/contacts/updateContacts.js";
import { updateStatusContact } from "../../controllers/contacts/updateStatusContact.js";

const router = express.Router();

router.get("/", showContacts);
router.get("/:contactId", indexContacts);
router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

export { router };
