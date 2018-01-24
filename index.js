var restify = require("restify");

var ip_addr = '127.0.0.1';
var port = '8080';
var name = "ShortURLs";

var server = restify.createServer({
    name: name
});


function helloShortUrls(req, res, next) {
    console.log("Please input your origin URL.");
    res.send("Please input your origin URL.");
    return next();
}

function showOriginURL(req, res, next) {
    originURL = req.params[0];
    console.log("Your origin URL is " + originURL);
    res.set({
        'content-type': 'application/json',
    })
    // res.send("Your origin URL is " + originURL);
    // res.redirect(301, 'www.baidu.com', next);
    res.send(200, {originURL: originURL});
    next();
}

// --------------  配置 restify 插件
// 解析 HTTP 查询字符串（如 /jobs?skills=java,mysql），解析后的内容将会在req.query里可用。
server.use(restify.plugins.queryParser());
// restify.bodyParser() 会在服务器上自动将请求数据转换为 JavaScript 对象。
server.use(restify.plugins.bodyParser());


// ------------- 路由配置

// 1. Encode longURL to shortURL
server.get(/shorten\/?(.*)/, showOriginURL);

// 2. Decode shortURL to rederict longURL
server.get(/s\/(.*)/, );


server.listen(port, ip_addr, ()=> {
    console.log("%s listening at %s", server.name, server.url);
})