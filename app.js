const http = require("http");
const fs = require('fs')
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
let myReadShort = fs.createReadStream(__dirname + '/src/index.html', 'utf8')
myReadShort.pipe(res)
}).listen(8000);