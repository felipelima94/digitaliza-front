var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.use('/js', express.static(__dirname + '/js'));
//app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/css', express.static(__dirname + '/css'));
// app.use('/partials', express.static(__dirname + '/partials'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/imagens', express.static(__dirname + '/imagens'));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application');
    next();
});
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