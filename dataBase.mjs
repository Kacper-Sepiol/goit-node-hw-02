// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// export const connection = mongoose.connect(process.env.URIDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// connection
//     .then((conn) => {
//         console.log("Database connection successful");
//     })
//     .catch((error) => {
//         console.log("Datebase connection error");
//         process.exit(1);
//     });

// const contacts = new Schema({
//     name: {
//         type: String,
//         required: [true, "Set name for contact"],
//     },
//     email: {
//         type: String,
//     },
//     phone: {
//         type: String,
//     },
//     favorite: {
//         type: Boolean,
//         default: false,
//     },
// });

// export const contact = mongoose.model("contact", contacts);
