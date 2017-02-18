var config = require('config'),
    log4js = require('log4js');
log4js.configure(config.log4js.configure);

var logger = {
    app: log4js.getLogger('app'),
    access: log4js.getLogger('access'),
    error: log4js.getLogger('error')
}

for (key in logger) {
    logger[key].setLevel(config.log4js.level);
}

module.exports = logger;
