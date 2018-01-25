var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("连接成功");
});

var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name? "My name is " + this.name: "I don't have a name";
    console.log(greeting);
}


var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({name: "Silence"});

console.log(silence.name);
silence.speak();

var fluffy = new Kitten({ name: 'fluffy' });

fluffy.save(function(err, fluffy) {
    if (err) return console.log(err);
    fluffy.speak();
})

