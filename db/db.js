var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/short-urls';
 
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log(" 连接成功！");
});