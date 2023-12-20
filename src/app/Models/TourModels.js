const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Tour = new Schema({
        name: { type: String, require: true },
        description: { type: String },
        tourCode: { type: String, require: true },
        location: { type: String, require: true },
        price: {
                adult: { type: Number, require: true },
                child: { type: Number, require: true },
        },
        image: {
                type: String
        },
        period: { type: String },
        experience: { type: String },
        schedule: [
                {
                        name: { type: String },
                        detail: { type: String }
                }
        ],
        pricePolicy: [
                {
                        include: { type: String },
                        notInclude: { type: String }
                }
        ],
        numberOfGuest: { type: String },
        inforVisa: { type: String },
        rate: { type: Number },
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
        slug: { type: String, slug: "name" }
}, {
        timestamps: true
});

module.exports = mongoose.model('Tour', Tour)