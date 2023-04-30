const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({email, name, surname}) => {
    email =  jwt.sign({email}, process.env.JWT_SECRET);
    return {email, name, surname};
}