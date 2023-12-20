const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
        user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
        products: [
                {
                        product: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Product' },
                        quantity: { type: Number, required: true }
                }
        ],
        status: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'OrderStatus' }

}, {
        timestamps: true
});
module.exports = mongoose.model('Order', Order)