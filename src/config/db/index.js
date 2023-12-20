const mongoose = require('mongoose');

const connect = () => {
        mongoose.connect('mongodb+srv://nguyentheduongyb:MAwTNKqRDmvQtRyP@cluster0.axoynjo.mongodb.net/?retryWrites=true&w=majority',
                {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                        useFindAndModify: false
                })
                .then(() => console.log('Connected!'))
                .catch(() => console.log('false'))
}

module.exports = { connect }