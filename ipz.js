var http = require('http');

var server = http.createServer(function(req, res) {
    if (req.method === 'GET') {
        switch (req.headers.accept) {
            case 'application/json':
                res.writeHead(200, {'content-type': 'application/json'});
                res.write(JSON.stringify({'ip': req.connection.remoteAddress}));
                res.end();
                break;

            default:
                res.writeHead(200, {'content-type': 'text/plain' });
                res.write(req.connection.remoteAddress);
                res.end();
        }
    }
    else {
        // not implemented
        res.writeHeader(501);
        res.end();
    }
});

var port = process.env.PORT || 8080
server.listen(port);
