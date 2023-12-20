const Order = require('~/app/Models/OrderModels')
const OrderStatus = require('~/app/Models/OrderStatusModels')
const { json } = require('express')

class OrderController {
        create(req, res, next) {
                const formData = {
                        user: req.userId,
                        products: req.body.products,
                }
                if (!formData.user || formData.products.length <= 0) {
                        return res.sendStatus(400)
                }
                OrderStatus.find({})
                        .then((status) => {
                                formData.status = status[0]._id
                                Order.create({ user: formData.user, products: formData.products, status: formData.status })
                                        .then((order) => {
                                                res.json(order); // Trả về status code 200 nếu lưu thành công
                                        })
                                        .catch((error) => {
                                                res.json(error);
                                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                                        });
                        })


        }
        get(req, res, next) {
                if (!req.params.id) return res.sendStatus(400)
                Order.find({ _id: req.params.id, user: req.userId }).populate('user').populate('products.product').populate('status')
                        .then(genre => {
                                res.json(genre)
                        })
                        .catch((error) => {
                                res.json(error);
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        update(req, res, next) {
                const id = req.params.id;
                let status
                OrderStatus.find({})
                        .then((status) => {
                                status = status[1]._id
                                Order.findByIdAndUpdate({ _id: id, user: req.userId }, { $set: { status: status } })
                                        .then((order) => {
                                                res.json(order); // Trả về status code 200 nếu lưu thành công
                                        })
                                        .catch((error) => {
                                                res.json(error);
                                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                                        });
                        })
        }

}
module.exports = new OrderController();
