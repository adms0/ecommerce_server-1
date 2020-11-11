const router = require("express").Router()
const authentication = require("../middlewares/authentication.middleware.js")
const UserRouter = require("./user.route")
const ProductRouter = require("./product.route")


router.use(UserRouter)
router.use(authentication)

router.use("/products", ProductRouter)

module.exports = router