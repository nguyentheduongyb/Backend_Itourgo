const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

require('module-alias/register')
const port = 8888;

const app = express();

const hbs = handlebars.create({
    extname: '.hbs',
    helpers: {
        inc: function (value, options) {
            return parseInt(value) + 1;
        }
    }
});
app.engine('hbs', hbs.engine);
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.urlencoded({ extended: false }));
const route = require('./routers');
const db = require('./config/db')


app.use(bodyParser.json());
db.connect()
app.use('/public/Uploads', express.static('./public/Uploads'))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Thay đổi giá trị này thành nguồn gốc của bạn
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
