var express = require("express");
var app = express();

app.get('/produto', (request, response) => {
    response.send('<h1>Hi!</h1>');
});

app.listen(3000, () => {
    console.log("Server runnig");
});