var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');
var logger = require('./logger');

var handle = {};
handle['GET'] = {};
handle['POST'] = {};

handle['GET']['/'] = requestHandlers.list;
handle['GET']['/list'] = requestHandlers.list;
handle['GET']['/style.css'] = requestHandlers.css;
handle['GET']['/link.js'] = requestHandlers.js;

handle['POST']['/info'] = requestHandlers.info;
handle['POST']['/edit'] = requestHandlers.edit;
handle['POST']['/add'] = requestHandlers.add;
handle['POST']['/save'] = requestHandlers.save;
handle['POST']['/delete'] = requestHandlers.delete;

server.start(router.route, handle, logger);
