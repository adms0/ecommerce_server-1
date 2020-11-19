const { User, Cart } = require("../models/index")

class Authorization {

    static async authorizationUser(req, res, next) {

        try {

            // const user = await User.findOne({
            //     where: { email: req.loggedInUser.email }
            // })
            const user = await User.findByPk(req.loggedInUser.id)
            console.log(user, '<<< user authorizations');
            if (user.role === 'admin') {
                next()
            } else {
                throw { name: "Not authorize" }
            }

        } catch (err) {
            next(err)
        }
    }

    static async cartAuthorization(req, res, next) {

        try {

            const { id } = req.params
            console.log(id, '<<<< id params');
            const cart = await Cart.findOne({
                where : { id}
            })
            console.log(cart, '<<<< cart');
            if (cart.UserId == req.loggedInUser.id) {
                next()
            } else {
                throw { name: 'Not authorize' }
            }
        } catch (err) {
            next(err)

        }
    }

}



module.exports = Authorization 