const bcrypt = require("bcryptjs")

module.exports = {
    hashPassword(password) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt)
    },

    comparePassword(password, hashPassword) {
        return bcrypt.compareSync(password, hashPassword)
    }
}