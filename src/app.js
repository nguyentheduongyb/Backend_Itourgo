app.engine('.hbs', expressHbs({
    defaultLayout: 'layout', extname: '.hbs', helpers: {
        inc: function (value, options) {
            return parseInt(value) + 1;
        }
    }
}));