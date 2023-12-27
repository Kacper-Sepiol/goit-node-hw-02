import fs from "fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = resolve(__dirname, "./contacts.json");

const digits = [];

function randomDigit() {
    const digit = Math.floor(Math.random() * 1000000);
    const stringDigit = `A${digit}`;

    for (let i = 0; i <= digits.length; i++) {
        if (stringDigit === digits[i]) {
            randomDigit();
        } else {
            digits.push(stringDigit);
            return stringDigit;
        }
    }
}

export const listContacts = async () => {
    try {
        const dane = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(dane);
        return contacts;
    } catch (error) {
        console.error(error.message);
    }
};

export const getContactById = async (contactId) => {
    try {
        const dane = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(dane);

        const contact = contacts.find((contact) => contact.id === contactId);
        console.log(contact);
        return contact;
    } catch (error) {
        console.error(error.message);
    }
};

export const removeContact = async (contactId) => {
    try {
        const dane = await fs.readFile(contactsPath);
        const contacts = JSON.parse(dane);

        const contactIndex = contacts.findIndex(
            (contact) => contact.id === contactId
        );

        if (contactIndex === -1) {
            return 404;
        }

        contacts.splice(contactIndex, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");

        return 200;
    } catch (error) {
        console.error(error.message);
    }
};

export const addContact = async (body) => {
    if (body.name === "" || body.email === "" || body.phone === "") {
        return 400;
    }

    const newUser = {
        id: randomDigit(),
        name: body.name,
        email: body.email,
        phone: body.phone,
    };

    try {
        const dane = await fs.readFile(contactsPath);
        const contacts = JSON.parse(dane);
        const newContacts = [...contacts, newUser];

        const returnValue = [newUser, 201];

        fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
        return returnValue;
    } catch (error) {
        console.error(error.message);
    }
};

export const updateContact = async (contactId, body) => {
    if (body.name === "" && body.email === "" && body.phone === "") {
        return 400;
    }

    try {
        const dane = await fs.readFile(contactsPath);
        const contacts = JSON.parse(dane);

        const contact = contacts.find(
            (contactid) => contactid.id === contactId
        );

        if (contact === undefined) {
            return 404;
        }

        if (body.name.length > 0) {
            contact.name = body.name;
            console.log("name zostalo zmienione");
        }

        if (body.email.length > 0) {
            contact.email = body.email;
            console.log("email zostal zmieniony");
        }

        if (body.phone.length > 0) {
            contact.phone = body.phone;
            console.log("phone zostalo zmienione");
        }

        const returnValue = [contact, 200];

        fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");

        return returnValue;
    } catch (error) {
        console.error(error.message);
    }
};
