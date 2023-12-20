const Product = require('~/app/Models/ProductModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('~/config')
const { multipleMongooseToObject, mongooseToObject } = require('~/util/mongoose')
const { json } = require('express')
const multer = require('multer')
const path = require('path')
class ProductController {
        create(req, res, next) {
                const formData = req.body
                if (req.file) {
                        formData.image = req.file.destination + '/' + req.file.filename
                }
                else {
                        formData.image = ''
                }
                const product = new Product(formData)
                product.save()
                        .then((data) => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        get(req, res, next) {

                Product.find().populate('genre').populate('category')
                        .then(result => {
                                res.json(result)
                        })
                        .catch(next)
        }

        update(req, res, next) {
                if (!req.params.id) {
                        return res.sendStatus(400)
                }
                const formData = req.body
                Product.updateOne({ _id: req.params.id }, req.body)
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
                Product.deleteOne({ _id: req.params.id })
                        .then(() => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        filter(req, res, next) {
                Product.find({ category: req.params.query }).populate('genre').populate('category')
                        .then(result => {
                                res.json(result)
                        })
                        .catch(next)
        }
        upload = multer({
                storage: storage,
                limits: { fileSize: '1000000' },
                fileFilter: (req, file, cb) => {
                        const fileTypes = /jpeg|jpg|png|gif/
                        const mimeType = fileTypes.test(file.mimetype)
                        const extname = fileTypes.test(path.extname(file.originalname))

                        if (mimeType && extname) {
                                return cb(null, true)
                        }
                        cb('Give proper file fomate to upload')

                }
        }).single('image')

}
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'public/Uploads/Images/Products')

        },
        filename: function (req, file, cb) {
                cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
        }
})
module.exports = new ProductController();
