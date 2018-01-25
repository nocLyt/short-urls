var PRE_URL = "http://api.noclyt.com/s/";

/**
 * 用于返回
 */
function responseShortURL(res, shortURL, longURL) {
    // 数据库中现在有 shortURL 与 longURL 的 pair 
    // 返回 shortURL 
    res.set({
        'content-type': 'application/json',
    })
    res.send(200, {shortURL: PRE_URL + shortURL, longURL: longURL});
}

function redirect(res, shortURL, longURL, next) {
    console.log("------------------------");
    console.log("Now we need to redirect!");
    console.log(shortURL);
    console.log(longURL);
    console.log("------------------------");
    return res.redirect(longURL, next);
}

function four04(res, shortURL, next) {
    console.log("------------------------");
    console.log("404 - Wrong shortURL!");
    console.log(shortURL);
    console.log("------------------------");
    return next();
}

exports.responseShortURL = responseShortURL;
exports.redirect = redirect;
exports.four04 = four04;