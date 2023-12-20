const Product = require('~/app/Models/ProductModels');
const User = require('~/app/Models/UserModels')

class CartController {
        add(req, res, next) {
                const formData = {
                        product: req.body.productId,
                        quantity: req.body.quantity
                }
                if (!formData.product || !formData.quantity) {
                        return res.sendStatus(400)
                }
                Product.findById(formData.product)
                        .then(() => {
                                User.findById(req.userId).where('cart.items.product', formData.product)
                                        .select({ 'cart.items.$': 1 })
                                        // User.find({ "cart.items": { $elemMatch: { product: formData.product } } }, { "cart.items.$": 1 })
                                        .then((item) => {
                                                if (item) {
                                                        formData.quantity = item.cart.items[0].quantity + formData.quantity
                                                        User.findOneAndUpdate({ _id: req.userId, "cart.items.product": formData.product }, { $set: { "cart.items.$.quantity": formData.quantity } })
                                                                .then((result) => {
                                                                        res.sendStatus(200)
                                                                })
                                                                .catch((error) => {
                                                                        console.log(error);
                                                                        res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                                                                });
                                                }
                                                else {
                                                        User.findByIdAndUpdate(req.userId, { $push: { "cart.items": formData } })
                                                                .then((result) => {
                                                                        res.sendStatus(200)
                                                                })
                                                                .catch((error) => {
                                                                        console.log(error);
                                                                        res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                                                                });
                                                }
                                        })
                                        .catch((error) => {
                                                res.json(error);
                                        })
                        })
        }
        get(req, res, next) {
                User.findById(req.userId).populate({ path: "cart.items.product" })
                        .then(result => {
                                res.json(result.cart.items)
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }

        update(req, res, next) {
                if (!req.params.id) {
                        return res.sendStatus(400)
                }
                User.updateOne({ _id: req.params.id }, req.body)
                        .then(() => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        delete(req, res, next) {
                if (!req.params.id) {
                        return res.sendStatus(400)
                }
                User.updateOne(
                        { _id: req.userId },
                        { $pull: { "cart.items": { _id: req.params.id } } },
                        { new: true }
                )
                        .then(() => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }

}


module.exports = new CartController();
