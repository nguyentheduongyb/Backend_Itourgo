const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema({
        name: { type: String, require: true },
        price: { type: Number },
        category: [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Category'
        }],
        gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
        image: {
                type: String
        },
        promotion: { type: String },
        classify: [{ type: String }],
        quantity: { type: Number },
        selled: { type: Number },
        vote: { type: Number },
        rate: { type: Number },
        description: { type: String },
        slug: { type: String, slug: "name" }
}, {
        timestamps: true
});

module.exports = mongoose.model('Product', Product)