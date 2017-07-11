var http = require('http');
var printer = require('../module/printer')
var port = 8887;
http.createServer(function(req, res) {
    res.writeHead(200,{'Content-Type':'text/html'}); 
    res.end(printer.sayGoodbye());
}).listen(port);
console.log("Server start succeed!");