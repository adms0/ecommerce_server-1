const router = require("express").Router()
const ProductController = require("../controllers/product.controller")
const Authorization = require("../middlewares/authorization.middleware")

router.post("/",  ProductController.create)
router.get("/",  ProductController.findAll)
router.put("/:id", Authorization.authorizationUser, ProductController.updateProduct)
router.delete("/:id", Authorization.authorizationUser, ProductController.deleteProduct)

module.exports = router