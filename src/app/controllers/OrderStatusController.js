const OrderStatus = require('~/app/Models/OrderStatusModels')

class OrderStatusController {
        create(req, res, next) {
                const formData = req.body
                const orderStatus = new OrderStatus(formData)
                orderStatus.save()
                        .then(() => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        get(req, res, next) {
                OrderStatus.find({})
                        .then(result => {
                                res.json(result)
                        })
                        .catch(next)
        }

        update(req, res, next) {
                if (!req.params.id) {
                        return res.sendStatus(400)
                }
                OrderStatus.updateOne({ _id: req.params.id }, req.body)
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
                OrderStatus.deleteOne({ _id: req.params.id })
                        .then(() => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }

}
module.exports = new OrderStatusController();
