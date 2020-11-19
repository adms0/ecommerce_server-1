const router = require("express").Router()
const CartController = require("../controllers/cart.controller")
const Authorization = require("../middlewares/authorization.middleware")

router.get('/',  CartController.findAll)
router.post('/',  CartController.create)
router.patch('/:id', Authorization.cartAuthorization, CartController.patchQuantity)
router.patch('/', CartController.checkout)
router.delete('/:id', Authorization.cartAuthorization, CartController.deleteCast)
module.exports = router