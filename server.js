var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

app.use('/js', express.static(__dirname + '/js'));
//app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/css', express.static(__dirname + '/css'));
// app.use('/partials', express.static(__dirname + '/partials'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/imagens', express.static(__dirname + '/imagens'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});
let address = "127.0.0.1";
// let address = "192.168.15.14";
let port = 3000;
server.listen(port,address, () => {
    console.log(`listen ${address}:${port}`);
}); //the port you want to use