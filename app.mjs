import express from "express";
import morgan from "morgan";
import cors from "cors";
import { router as contactsRouter } from "./routes/api/contacts.js";
import "dotenv/config";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

export const contact = mongoose.model("contact", contacts);

export { app };
