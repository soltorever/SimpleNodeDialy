function route(reqMethod, pathname, handle, res, postData, logger) {
    if(pathname == '/favicon.ico') {
        res.end();
    } else if (typeof handle[reqMethod][pathname] === 'function') {
        return handle[reqMethod][pathname](res, postData, logger);
    } else {
        logger.error.error('No request handler found for ' + pathname);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 NotFound');
        res.end();
    }
}

exports.route = route;
