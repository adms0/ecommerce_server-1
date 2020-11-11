const router = require("express").Router()
const ProductController = require("../controllers/product.controller")
const authorization = require("../middlewares/authorization.middleware")

router.post("/", authorization, ProductController.create)
router.get("/", authorization, ProductController.findAll)
router.put("/:id", authorization, ProductController.updateProduct)
router.delete("/:id", authorization, ProductController.deleteProduct)

module.exports = router