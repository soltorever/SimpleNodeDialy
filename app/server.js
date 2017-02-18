var http = require('http');
var url = require('url');


function start(route, handle, logger) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        logger.access.info('Request for ' + pathname + ' from ' + request.headers['user-agent']);

        var postData = '';
        request.addListener('data', function(chunk) {
            postData += chunk;
        });

        request.addListener('end', function() {
            route(request.method, pathname, handle, response, postData, logger);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log('server has started.');
    logger.app.info('server has start');
}

exports.start = start;
