const { User } = require("../models/index")
const { signToken } = require("../helpers/jwt.helper")
const { comparePassword } = require("../helpers/password.helper")

class UserController {
    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            const user = await User.create(payload)
            res.status(201).json({
                message: "user success to register",
                'status-code': 201,
                id: user.id,
                email: user.email,
                role: user.role
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {

            const payload = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }

            const user = await User.findOne({
                where: { email: payload.email }
            })
            console.log(user, "<<<< ussr login controller");

            if (!user) {
                throw { name: "wrong email/password" }

            } else if (!comparePassword(payload.password, user.password)) {
                throw { name: "wrong email/password" }
            } else {
                const access_token = signToken(payload)
                res.status(200).json({
                    access_token
                })
            }
        } catch (err) {
            next(err)
        }
    }


}

module.exports = UserController