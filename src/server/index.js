var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var userSchema = mongoose.Schema({
    name: String,
    score: Number
});

var UserScore = mongoose.model('UserScore', userSchema);

// var fluffy = new Kitten({ name: 'fluffy' });

// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
// });

app.get('/', function (req, res) {
    UserScore.find(function (err, userScore) {
        if (err) return console.error(err);
        console.log(userScore);
        res.send(userScore);
    })
})

app.post('/addScore', function (req, res) {
    console.log(req.body)
    var newUserScore = new UserScore(req.body);

    newUserScore.save(function (err, userScore) {
      if (err) return console.error(err);
       res.send('success');
    });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})