const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const digits = [];

function randomDigit() {
    const digit = Math.floor(Math.random() * 1000000);

    for (let i = 0; i <= digits.length; i++) {
        if (digit === digits[i]) {
            randomDigit();
        } else {
            digits.push(digit);
            return digit;
        }
    }
}

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.error(error);
    }
};

const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);

        const contact = contacts.filter((contact) => contact.id === contactId);
        return contact;
    } catch (error) {
        console.error(error);
    }
};

const removeContact = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);

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

const addContact = async (body) => {
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
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
        const newContacts = [...contacts, newUser];

        const returnValue = [newUser, 201];

        fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
        return returnValue;
    } catch (error) {
        console.error(error.essage);
    }
};

const updateContact = async (contactId, body) => {};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
