const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    ime: {type: String, required: true},
    prezime: {type: String, required: true},
    password: {type: String, required: true}
});

const slikeSchema = new mongoose.Schema({
    id: {type: String, required: true},
    putanja: {type: String, required: true}
});

const oglasSchema = new mongoose.Schema({
    id: {type: String, required: true},
    marka: {type: String, required: true},
    model: {type: String, required: true},
    //godiste: {type: Number, required: true},
    //kilometraza: {type: Number, required: true},
    //snaga: {type: String, required: true},
    //gorivo: {type: String, required: true},
    //cena: {type: Number, required: true},
    mejl_vlasnika: {type: String, required: true},
    slike: [slikeSchema],
    //telefon: {type: String, required: true},
    //naziv: {type: String, required: true},
    //mesto: {type: String, required: true}
});

const User = mongoose.model("User", userSchema);
const Oglas = mongoose.model("Oglas", oglasSchema);
const Slike = mongoose.model("Slike", slikeSchema);

module.exports = {
    User,
    Oglas,
    Slike
}