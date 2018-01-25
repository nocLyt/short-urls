var hashMD5ToInt = require('./hash').hashMD5ToInt;
var intToBase62 = require('./hash').intToBase62;
var response = require('./response');
var findByShortURL = require('../Controllers/DbController').findByShortURL;


function redirectByShortURL(req, res, next) {
    // 先拿到
    var shortURL = req.params[0];
    console.log("func redirectByShortURL: " + req.params[0]);
    findByShortURL(shortURL, function(longURL) {
        if (longURL === undefined){
            console.log("shortURL 不存在");
            // longURL 不存在
            return response.four04(res, shortURL, next);
        } else {
            // shortURL 存在
            // response 跳转
            console.log("shortURL 存在!");
            return response.redirect(res, shortURL, longURL, next);
        }
    });
}

// 

exports.redirectByShortURL = redirectByShortURL;