const bcrypt = require("bcrypt");

module.exports = async function (password, hash){
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}