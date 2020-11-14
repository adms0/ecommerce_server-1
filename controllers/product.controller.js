const { Product } = require("../models")

class ProductController {

    static async create(req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body
            console.log(req.body, "<<<< req body dari controller product");
            const id = req.loggedInUser.id
            let product = await Product.create({
                name, image_url, price, stock
            })
            res.status(201).json(product)
        } catch (err) {
            next(err)
            console.log(err, "<<< error create")
        }
    }


    static async findAll(req, res, next) {
        try {
            let product = await Product.findAll()
            res.status(200).json(product)
        } catch (err) {
            next(err)
        }
    }

    static async updateProduct(req, res, next) {
        try {

            const { id } = req.params
            const payload = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            }
            console.log(payload, "<<<payload");

            const productUpdate = await Product.update(payload, {
                where: { id }, returning: true
            })

            res.status(200).json(productUpdate)

        } catch (err) {
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {

            const { id } = req.params

            const product = await Product.destroy({
                where: { id }, returning : true
            })
            res.status(200).json({ 
                message : "product success to delete"
            })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController