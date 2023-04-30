const {StatusCodes} = require("http-status-codes");
const cookieParser = require("cookie-parser");
const attachCookies = require("../utils/attachCookies");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const {User} = require("../database/connect");

const register = async (req, res) => {
    const {name, surname, email, password} = req.body;
    if(!name || !surname || !email || !password){
        res.status(StatusCodes.OK).json({ok:false, message: "Sva polja moraju biti popunjena"});
    }
    else{
    const userArray = await User.find({email});
    if(userArray.length > 0){
        res.status(StatusCodes.BAD_REQUEST).json({ok: false, message:"Nalog sa ovim mejlom vec postoji"});
    }
    else{
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            email: email,
            ime: name,
            prezime: surname,
            password: hashedPassword
        });
        await user.save();
        attachCookies(res, {email, name, surname});
        res.status(StatusCodes.CREATED).json({ok:true, user: {email: email, name: name, surname: surname, password: password}});
    }
}
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(StatusCodes.OK).json({ok:false, message: "Sva polja moraju biti popunjena"});
    }
    else{
    const userArray = await User.find({email});
    if(userArray.length == 0){
        res.status(StatusCodes.BAD_REQUEST).json({ok: false, message:"Nalog sa ovim mejlom ne postoji"});
    }
    else{
        if(await comparePassword(password, userArray[0].password)){
            attachCookies(res, {email, name: userArray[0].ime, surname: userArray[0].prezime});
            res.status(StatusCodes.OK).json({ok:true, user: {email: email, name: userArray[0].ime, surname: userArray[0].prezime}});
        }
        else{
            res.status(StatusCodes.UNAUTHORIZED).json({ok:false, message:"Pogresna lozinka"});
        }
        
    }
}
}

const showMe = async (req, res) => {
    const user = req.user;
    if(user == undefined){
        res.status(StatusCodes.OK).json({ok: false});
    }
    else{
        res.status(StatusCodes.OK).json({ok:true, user});
    }
}

const logout = async (req, res) => {
    res.cookie("user","logout", {
        httpOnly: true,
        expires: new Date(Date.now() - 24 * 60 * 60 * 1000)
    })
    res.status(StatusCodes.OK).json({ok: true});
}

module.exports = {
    register,
    login,
    showMe,
    logout
}