var fs = require('fs'),
    querystring = require('querystring'),
    ejs = require('ejs')
    Session = require('./session');


function list(response, postData, logger) {
    logger.app.info('Logic [list] has started.');

    logger.app.info('DB accessing [selectList] has started.');
    var session = new Session();
    session.selectList(function(selectResult) {
        session.close();
        logger.app.info('DB accessing [selectList] has started.');

        var data = {
          items: selectResult
        }
        logger.app.info('Logic [list] has finished.');
        returnPage(response, 'list.ejs', data, logger);
    });
}


function add(response, postData, logger) {
    logger.app.info('Logic [add] has started.');
    var date = new Date();
    var dummyData = {
        id     : -1,
        date   : date.getFullYear()
                 + '-' + ('0' + (date.getMonth() + 1)).slice(-2)
                 + '-' + ('0' + date.getDate()).slice(-2),
        title  : '',
        content: '',
        mode   : 'ADD'
    };

    logger.app.info('Logic [add] has finished.');
    returnPage(response, 'edit.ejs', dummyData, logger);
}


function edit(response, postData, logger) {
    logger.app.info('Logic [edit] has started.');
    var id = querystring.parse(postData).id;

    logger.app.info('DB accessing [selectById] has started.');
    var session = new Session();
    session.selectById(id, function(selectResult) {
        session.close();
        logger.app.info('DB accessing [selectById] has finished.');

        data = selectResult;
        data.mode = 'EDIT';
        logger.app.info('Logic [edit] has finished.');
        returnPage(response, 'edit.ejs', data, logger);
    });
}


function info(response, postData, logger) {
    logger.app.info('Logic [info] has started.');
    var id = querystring.parse(postData).id;

    logger.app.info('DB accessing [selectById] has started.');
    var session = new Session();
    session.selectById(id, function(selectResult) {
        session.close();
        logger.app.info('DB accessing [selectById] has finished.');
        
        logger.app.info('Logic [info] has finished.');
        returnPage(response, 'info.ejs', selectResult, logger);
    });
}


function returnPage(response, page, data, logger) {
    fs.readFile('./WebContent/pages/' + page, 'utf-8', function(error, template) {
        if(error) {
            logger.error.error('Showing file is missed.\n' + error);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end();
        } else {
            var out = ejs.render(template, data);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(out);
            response.end();
        }
    });
}


function save(response, postData, logger) {
    logger.app.info('Logic [save] has started.');
    var mode = querystring.parse(postData).mode;
    var id = querystring.parse(postData).id;
    var date = querystring.parse(postData).date;
    var title = querystring.parse(postData).title;
    var content = querystring.parse(postData).content;

    if( mode == 'ADD') {
        logger.app.info('DB accessing [insert] has started.');
        var session = new Session();
        session.insert(date, title, content, function() {
            session.close();
            logger.app.info('DB accessing [insert] has finished.');

            logger.app.info('Logic [save] has finished.');
            response.writeHead(303, {'Location': '/list'});
            response.end();
        });
    }
    if(mode == 'EDIT') {
        var session = new Session();
        logger.app.info('DB accessing [update] has started.');
        session.update(id ,date, title, content, function() {
            session.close();
            logger.app.info('DB accessing [update] has finished.');

            logger.app.info('Logic [save] has finished.');
            response.writeHead(303, {'Location': '/list'});
            response.end();
        });
    }
}


function del(response, postData, logger) {
    logger.app.info('Logic [del] has started.');
    var id = querystring.parse(postData).id;

    logger.app.info('DB accessing [delete] has started.');
    var session = new Session();
    session.deleteById(id, function() {
        session.close();
        logger.app.info('DB accessing [delete] has finished.');
         
        logger.app.info('Logic [del] has finished.');
        response.writeHead(303, {'Location': '/list'});
        response.end();
    });
}


function returnCSS(response, postData, logger) {
    logger.app.info('Logic [returnCSS] has started.');
    fs.readFile('./WebContent/css/style.css', 'utf-8', function(error, data) {
        if(error) {
            logger.error.error('Showing file is missed.\n' + error);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end();
        } else {
            logger.app.info('Logic [returnCSS] has finished.');
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(data);
            response.end();
        }
    });
}


function returnJS(response, postData, logger) {
    logger.app.info('Logic [returnJS] has started.');
    fs.readFile('./WebContent/js/link.js', 'utf-8', function(error, data) {
        if(error) {
            logger.error.error('Showing file is missed.\n' + error);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        } else {
            logger.app.info('Logic [returnJS] has finished.');
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.write(data);
            response.end();
        }
    });
}


exports.list = list;
exports.add = add;
exports.edit = edit;
exports.info = info;
exports.save = save;
exports.delete = del;
exports.css = returnCSS;
exports.js = returnJS;
