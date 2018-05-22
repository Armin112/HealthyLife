const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://localhost:27017/";
var md5 = require('md5');
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';
var jwt    = require('jsonwebtoken');
app.use('/', express.static('static'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies



app.post('/register', function(request, response){
  var user_reg = request.body;

      db.collection('users').save({'firstname': user_reg.firstname, 'lastname': user_reg.lastname, 'username': user_reg.username
      , 'email': user_reg.email, 'password': md5(user_reg.password)}, (err, result) => {
        if (err) return console.log(err);
        response.send('OK');
      
      })
    
 
});

var proba = "";
app.post('/login', function(request, response){
  var user = request.body;
  db.collection("users").findOne({'username': user.username, 'password': md5(user.password)}, function(error, user) {
    if (error){
      throw error;
    }else{
      if(user){
        var token = jwt.sign(user, jwt_secret, {
          expiresIn: 20000 
        });
        proba = user.username;
        response.send({
          success: true,
          message: 'Authenticated',
          token: token
        })
      }else{
        response.status(401).send('Credentials are wrong.');
      }
    }
  });
});



app.get('/users/myprofile', function(request, response){
  db.collection('users').find({username:proba}).toArray((err, users) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(users);
    
    console.log(proba);
  })
});


app.put('/users/edituser', function(request, response){
  user = request.body;
  db.collection('users').findOneAndUpdate( {username:proba }, {
    $set: {firstname: user.firstname, lastname: user.lastname, username: user.username, 
      email: user.email}
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});


MongoClient.connect('mongodb://localhost:27017/healthylife', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3200, () => console.log('Example app listening on port 3200!'))
})