import express from "express";
import { auth } from "../../auth/auth.mjs";
import { showContacts } from "#controllers/contacts/showContacts.js";
import { indexContacts } from "#controllers/contacts/indexContacts.js";
import { createContacts } from "#controllers/contacts/createContacts.js";
import { deleteContacts } from "#controllers/contacts/deleteContacts.js";
import { updateContact } from "#controllers/contacts/updateContacts.js";
import { updateStatusContact } from "#controllers/contacts/updateStatusContact.js";
import { signUp } from "#controllers/contacts/signUp.js";
import { login } from "#controllers/contacts/login.js";
import { logout } from "#controllers/contacts/logout.js";
import { current } from "#controllers/contacts/current.js";
import { upload } from "../../multer/configMulter.js";
import { updateAvatar } from "#controllers/contacts/updateAvatar.js";
import { verificationToken } from "#controllers/contacts/verificationToken.js";
import { verify } from "#controllers/contacts/verify.js";

const router = express.Router();

router.get("/", showContacts);
router.get("/:contactId", indexContacts);
router.post("/", createContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);
router.post("/users/signup", signUp);
router.post("/users/login", login);
router.post("/users/logout", auth, logout);
router.post("/users/current", auth, current);
router.patch("/users/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/users/verify/:verificationToken", verificationToken);
router.post("/users/verify/", verify);

export { router };
