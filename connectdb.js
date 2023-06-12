var mysql = require('mysql'),
    db = null;
module.exports = function () {
    if(!db) {
        db = mysql.createConnection({
            multipleStatements  : true,
            host                : '34.128.117.96',
            user                : 'root',
            password            : 'bluered123',
            database            : 'countlories'
        });
    };
    return db;
};
