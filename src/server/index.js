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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var userSchema = mongoose.Schema({
    name: String,
    score: Number
});

var UserScore = mongoose.model('UserScore', userSchema);

app.get('/', function (req, res) {
    UserScore.find(function (err, userScore) {
        if (err) return console.error(err);
        res.send(userScore);
    })
});

app.post('/addScore', function (req, res) {
    var newUserScore = new UserScore(req.body);

    newUserScore.save(function (err, userScore) {
      if (err) return console.error(err);
       res.send('success');
    });
});

app.get('/getScores', function (req, res) {
    UserScore.find(function (err, userScores) {
        if (err) return console.error(err);
        res.send(userScores);
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})