const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Supplier = new Schema({
        name: { type: String, require: true },
        description: { type: String },
        logo: { type: String },
        rate: { type: Number }
}, {
        timestamps: true
});

module.exports = mongoose.model('Supplier', Supplier)