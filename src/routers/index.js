const userRouter = require('~/routers/userRouter');
const siteRouter = require('~/routers/siteRouter');
const productRouter = require('~/routers/productRouter');
const genderRouter = require('~/routers/genderRouter');
const categoryRouter = require('~/routers/categoryRouter');
const cartRouter = require('~/routers/cartRouter');
const orderRouter = require('~/routers/orderRouter');
// const paymentRouter = require('~/routers/paymentRouter');
const supplierRouter = require('~/routers/supplierRouter');
const orderStatusRouter = require('~/routers/orderStatusRouter');
const tourRouter = require('~/routers/tourRouter');

function routers(app) {
    app.use('/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/tour', tourRouter);
    app.use('/api/gender', genderRouter);
    app.use('/api/category', categoryRouter);
    app.use('/user/cart', cartRouter);
    app.use('/user/order', orderRouter);
    // app.use('/payment', paymentRouter);
    app.use('/api/supplier', supplierRouter);
    app.use('/user/order/status', orderStatusRouter);
    app.use('/', siteRouter);
}
module.exports = routers;
