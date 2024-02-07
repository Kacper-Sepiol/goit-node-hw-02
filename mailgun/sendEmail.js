import Mailgun from "mailgun.js";
import formData from "form-data";

function sendingEmail(email, token) {
    const API_KEY = process.env.API_KEY;
    const DOMAIN = process.env.DOMAIN;

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: "api", key: API_KEY });

    const link = `http://localhost:3000/api/contacts/users/verify/${token}`;

    const messageData = {
        from: "kacperus0987654321@gmail.com",
        to: email,
        subject: "Hello",
        text: `klikniej <a href=${link}>tutaj</a> aby zweryfikowac swoje konto`,
    };

    client.messages
        .create(DOMAIN, messageData)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
}

export { sendingEmail };
