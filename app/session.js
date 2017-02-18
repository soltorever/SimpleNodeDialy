var config = require('config'),
    sqlite3 = require('sqlite3').verbose();

var session = function() {
  this.db = new sqlite3.Database(config.sqlite3.dbPath);

  this.selectList = function(callback) {
      var result = [];
      var stmt = this.db.prepare('Select id, date, title from dialy order by id desc');
      stmt.each(function (error, row) {
        var item = {
          id   : row.id,
          date : row.date,
          title: row.title
        }
        result.push(item);
      },
      function (error) {
        stmt.finalize();
        callback(result);
      });
  };
  
  this.selectById = function(id, callback) {
    var stmt = this.db.prepare('Select id, date, title, content from dialy where id = ?');
    stmt.get(id, function (error, row) {
      stmt.finalize();
      callback({
        id     : row.id,
        date   : row.date,
        title  : row.title,
        content: row.content
      });
    });
  };

  this.insert = function(date, title, content, callback) {
    var stmt = this.db.prepare('insert into dialy(date, title, content) values ($date, $title, $content)');
    stmt.run({
      $date: date,
      $title: title,
      $content: content
    },
    function(error) {
        stmt.finalize();
        callback();
    }); 
  };

  this.update = function(id, date, title, content, callback) {
    var stmt = this.db.prepare('update dialy set date = $date, title = $title, content = $content where id = $id');
    stmt.run({
      $id     : id,
      $date   : date,
      $title  : title,
      $content: content
    },
    function(error){
      stmt.finalize();
      callback();
    });
  };

  this.deleteById = function(id, callback) {
    var stmt = this.db.prepare('delete from dialy where id = $id');
    stmt.run({
      $id: id
    },
    function(error){
      stmt.finalize();
      callback();
    });
  }

  this.close = function() {
    this.db.close();
  };

};

module.exports = session;
