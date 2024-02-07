import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router as contactsRouter } from "./routes/api/contacts.js";
import "dotenv/config";
import mongoose from "mongoose";
import { Schema } from "mongoose";
import passport from "passport";
import "./config/config-passport.js";
import bCrypt from "bcryptjs";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

export const connection = mongoose.connect(process.env.URIDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connection
    .then((conn) => {
        console.log("Database connection successful");
    })
    .catch((error) => {
        console.log("Datebase connection error");
        process.exit(1);
    });

const contacts = new Schema({
    password: {
        type: String,
        required: [false, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
    },
});

contacts.methods.setPassword = function (password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(7));
};

contacts.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
};

export const contact = mongoose.model("contact", contacts);

export { app };
