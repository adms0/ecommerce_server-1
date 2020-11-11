const { verifyToken } = require("../helpers/jwt.helper")
const { User } = require("../models/index")

async function authentication(req, res, next) {

    try {
        const { access_token } = req.headers
        console.log(access_token, "<<<< access_token di authentication");

        if (!access_token) {
            throw { name: "Authentication failed" }
        } else {
            let decoded = verifyToken(access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            console.log(user, "<<<< instance user di authentication");
            if (!user) {
                throw { name: "Authentication failed" }
            } else {
                console.log(req.loggedInUser, "<<<< loggedInUser");
                req.loggedInUser = decoded;
                next()
                console.log(req.loggedInUser, "<<<< loggedInUser");
            }
        }
    } catch (err) {
        next(err)
    }
}


module.exports = authentication