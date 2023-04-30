const createToken = require("./createToken");

module.exports =  (res, user) => {
    const token = createToken(user);

    res.cookie("user", token, {
        httpOnly: true,
    });
}