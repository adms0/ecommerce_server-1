const jwt = require("jsonwebtoken")

module.exports = {
    signToken(payload) {
        return jwt.sign(payload, "secret")
    },

    verifyToken(token) {
        return jwt.verify(token, "secret")
    }
}