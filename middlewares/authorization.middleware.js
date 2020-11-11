const { User } = require("../models/index")

async function authorization(req, res, next) {

    try {

        const user = await User.findByPk(req.loggedInUser.id)
        console.log(user, "<<< user authorization");
        if (user.role === 'admin') {
            next()
        } else {
            throw { message: "Not authorize" }
        }

    } catch (err) {
        next(err)
    }



}

module.exports = authorization