const { User } = require("../models/index")

async function authorization(req, res, next) {

    try {

        console.log(req.loggedInUser.id, "<<<< req.loggedInUser");
        // const user = await User.findOne({
        //     where: { email: req.loggedInUser.email }
        // })
        const user = await User.findByPk(req.loggedInUser.id)
        console.log(user, "<<< user authorization");
        if (user.role === 'admin') {
            next()
        } else {
            throw { name: "Not authorize" }
        }

    } catch (err) {
        next(err)
    }



}

module.exports = authorization