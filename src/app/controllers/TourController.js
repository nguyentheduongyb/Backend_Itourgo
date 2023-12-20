const Tour = require('~/app/Models/TourModels')
const multer = require('multer')
const path = require('path')
class TourController {
        create(req, res, next) {
                const formData = req.body
                const tour = new Tour(formData)
                tour.save()
                        .then((data) => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        get(req, res, next) {
                Tour.find().populate('supplier')
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
                Tour.updateOne({ _id: req.params.id }, req.body)
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
                Tour.deleteOne({ _id: req.params.id })
                        .then(() => {
                                res.sendStatus(200); // Trả về status code 200 nếu lưu thành công
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });
        }
        filter(req, res, next) {
                Tour.findOne({ slug: req.params.slug })
                        .then(result => {
                                res.json(result)
                        })
                        .catch((error) => {
                                res.sendStatus(500); // Trả về status code 500 nếu có lỗi xảy ra
                        });

        }
        detail(req, res, next) {
                Tour.findOne({ _id: req.params.id })
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
                cb(null, 'public/Uploads/Images/Tours')

        },
        filename: function (req, file, cb) {
                cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
        }
})
module.exports = new TourController();
