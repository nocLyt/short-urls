var findByLongURL = require('../Controllers/DbController').findByLongURL;
var findShortURLExist = require('../Controllers/DbController').findShortURLExist;
var saveURLPair = require('../Controllers/DbController').saveURLPair;
var hashMD5ToInt = require('./hash').hashMD5ToInt;
var intToBase62 = require('./hash').intToBase62;
var responseShortURL = require('./response').responseShortURL;

var PRE_URL = "http://api.noclyt.com/s/";


/**
 * longURL: 如数的 longURL 
 * shorURLInt: hash 后的一个Int 整数
 * 
 * callback 参数 (isExist)
 * 
 * @param {*} longURL 
 * @param {*} shortURLInt 
 * @param {*} shortURL 
 * @param {*} callback 
 */
function collision(longURL, shortURLInt, shortURL, collisionCount, callback) {
    console.log("-----------------");
    console.log(longURL);
    console.log(shortURLInt);
    console.log(shortURL);
    console.log(collisionCount);

    findShortURLExist(shortURL, function(isExist){
        // 如果存在， 则自增 shortURLInt, 获得新的shortURL，继续调用 collision
        if (isExist){
            console.log("Collision happen! This is times " + collisionCount+1);
            newShortURLInt = shortURLInt + 1;
            return collision(longURL, newShortURLInt, intToBase62(newShortURLInt), collisionCount+1, callback);
        } else { 
            // 不存在， 则先存储
            console.log("Collision Over! We all have " + collisionCount + " times. ");
            return saveURLPair(shortURL, longURL, callback);
        }
    });
}

/**
 * 
 * 根据 longURL 生成 short URL
 * callback 提供调用返回 http 请求
 * 
 * callback(shortURL, longURL)
 * @param {*} longURL 
 * @param {*} callback 
 */
function geneShortURL(longURL, callback) {
    // hash 函数
    console.log("This is geneShortURL Function");
    // 
    var shortURLInt = hashMD5ToInt(longURL);
    var shortURL = intToBase62(shortURLInt);
    return collision(longURL, shortURLInt, shortURL, 0, callback);
    // return callback(shortURL, longURL);
}


/**
 * 获取输入的 longURL，将 longURL hash 出 shortURL并解决冲突问题
 * 
 */
function shortenURLByLongURL(req, res, next) {
    var longURL = req.params[0];
    console.log("long URL is : " + longURL);
    findByLongURL(longURL, function(shortURL) {
        // 1. 判断数据 shortURL 是否存在
        if (shortURL === undefined) { // shortURL 不存在
            // 生成 shortURL 并使用 res 返回
            console.log("The LongURL is not in database, we shoudl insert it and generate a short URL");
            return geneShortURL(longURL, function(shortURL, longURL) {
                return responseShortURL(res, shortURL, longURL);
            });
        } else {
            // shortURL 存在，则返回。
            return responseShortURL(res, shortURL, longURL);
        }
    });
}

exports.shortenURLByLongURL = shortenURLByLongURL;