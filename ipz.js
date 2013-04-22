var http = require('http');
var dns = require('dns');

var server = http.createServer(function(req, res) {
    if (req.method === 'GET') {
        ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        dns.reverse(ip, handleResponse);
    }
    else {
        // not implemented
        res.writeHeader(501);
        res.end();
    }

    function handleResponse(error, domains) {
        switch (req.headers.accept) {
            case 'application/json':
                var data = {'ip': ip};
                if (!error && domains.length > 1){
                    data.hostname = domains[0];
                }

                res.writeHead(200, {'content-type': 'application/json'});
                res.write(JSON.stringify(data));
                res.end();
                break;

            default:
                res.writeHead(200, {'content-type': 'text/plain' });
                res.write(ip);
                res.end();
        }
    }
});

var port = process.env.PORT || 8080
server.listen(port);
