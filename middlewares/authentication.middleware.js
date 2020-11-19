const { verifyToken } = require("../helpers/jwt.helper")
const { User } = require("../models/index")

async function authentication(req, res, next) {

    try {
        const { token } = req.headers
            console.log(token, '<<<< token')
        if (!token) {
            throw { name: "Authentication failed" }
        } else {
            let decoded = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (!user) {
                throw { name: "Authentication failed" }
            } else {
                req.loggedInUser = user;
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}


module.exports = authentication