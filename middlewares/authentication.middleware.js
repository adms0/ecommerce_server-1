const { verifyToken } = require("../helpers/jwt.helper")
const { User } = require("../models/index")

async function authentication(req, res, next) {

    try {
        const { token } = req.headers
        console.log(token, "<<<< token di authentication");

        if (!token) {
            throw { name: "Authentication failed" }
        } else {
            let decoded = verifyToken(token)
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
                req.loggedInUser = user;
                next()
                console.log(req.loggedInUser, "<<<< loggedInUser");
            }
        }
    } catch (err) {
        next(err)
    }
}


module.exports = authentication