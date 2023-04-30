const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRouter = require("./routers/user");
const oglasRouter = require("./routers/oglas");
const mongoose = require("mongoose");

const app = express();

mongoose.set('strictQuery', true)

mongoose.connect(`mongodb+srv://dimi:${process.env.PASSWORD}@cluster0.8ax13mm.mongodb.net/?retryWrites=true&w=majority`).then(
    console.log("Povezan sa MongoDB")
);

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/oglasi", oglasRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server slusa na portu ${PORT}...`);});