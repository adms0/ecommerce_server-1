const { Cart, Product } = require('../models/index')

class CartController {

    static async findAll(req, res, next) {

        try {
            const { id } = req.loggedInUser
            let cart = await Cart.findAll({
                where: {
                    UserId: id
                }, include : ['Product'],
                attributes: ['id', 'quantity', 'status']
            })
            console.log(cart, '<<< cart');
            res.status(200).json(cart)
        }
        catch (err) {
            next(err)
        }
    }


    static async create(req, res, next) {

        try {
            const UserId = req.loggedInUser.id
            const { ProductId } = req.body

            const cart = await Cart.findOne({
                where: {
                    UserId, ProductId, status: false
                }, 
                attributes: ['quantity', 'id']
            })
            console.log(cart, '<<< cart id');

            if (!cart) {
                let cartAdd = await Cart.create({
                    ProductId, UserId, quantity: 1, status: false
                })
                res.status(201).json(cartAdd)
            } else {

                const cartUpdate = await Cart.update({
                    quantity: cart.quantity + 1
                }, {
                    where: {
                        id: cart.id
                    }
                })

                res.status(200).json(cartUpdate)
            }
        } catch (err) {
            next(err)
        }
    }

    static async patchQuantity(req, res, next) {

        try {
            const { id } = req.params
            const { quantity } = req.body
            console.log(req.body, "<<<<< req.body")
            const countQuantity = await Cart.update({ quantity }, {
                where: {
                    id
                }, 
            })
            console.log(countQuantity, '<<<< countQuantity');

            res.status(200).json(countQuantity)
        } catch (err) {
            next(err)
        }
    }

    static async deleteCast(req, res, next) {
        try {

            const { id } = req.params

            const deleteCast = await Cart.destroy({
                where: { id },
            })
            res.status(200).json(deleteCast)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = CartController