var saveURLPair = require('../Controllers/DbController').saveURLPair;
var findByShortURL = require('../Controllers/DbController').findByShortURL;
var findByLongURL = require('../Controllers/DbController').findByLongURL;

// ---------- testing save 

// saveURLPair(
//     "8012", 
//     "www.8012.com"
// );


// --------- testing findShortURL 

// findByShortURL("qq", function(shortURL, longURL){
//     console.log(shortURL);
//     console.log(longURL);
// });

// findByShortURL("tb", function(shortURL, longURL){
//     console.log(shortURL);
//     console.log(longURL);
// });


// -------- testing findByLongURL
findByLongURL("www.qq.com", function(shortURL, longURL) {
    console.log(shortURL);
    console.log(longURL);
})

findByLongURL("www.90sdf.com", function(shortURL, longURL) {
    console.log(shortURL);
    console.log(longURL);
})