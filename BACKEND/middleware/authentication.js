const auth = async (req, res, next) => {
    try{
        const user = req.cookies;
        req.user = user.user;
        next();
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = auth;