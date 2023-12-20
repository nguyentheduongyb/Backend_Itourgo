const Handlebars = require('handlebars');

// Đăng ký helper toàn cục
Handlebars.registerHelper('myHelper', function (context) {
        // Thực hiện tác vụ của helper ở đây
        // Ví dụ:
        return context.toUpperCase();
});

// Sử dụng helper trong template Handlebars
const template = Handlebars.compile("Hello, {{myHelper name}}!");
const result = template({ name: "World" });

console.log(result); // Kết quả: "Hello, WORLD!"
