const { uid } = require("uid");
const {Oglas} = require("../database/connect");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addOglas = async (req, res) => {
    console.log(req.files.length);
    const {marka, model} = req.body;
    const id_o = uid(20);
    const user = req.user;
    const slike = Array.from(Array(req.files.length), (_, idx) => ({
        id: uid(20),
        putanja: req.files[idx].path,
    }));
    console.log(slike);
    
    try{
        const oglas = await Oglas.create({
            id: id_o,
            marka: marka,
            model: model,
            mejl_vlasnika: jwt.verify(user.email, process.env.JWT_SECRET).email,
            slike: slike
        });
        await oglas.save();
        res.status(StatusCodes.CREATED).json({ok: true});
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    addOglas
}