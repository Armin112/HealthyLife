const express = require('express');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var url = "mongodb://localhost:27017/";
var md5 = require('md5');


app.use('/', express.static('static'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies



app.post('/register', function(request, response){
  var user = request.body;
 
  db.collection('users').count({username: user.username}, function (err, count){ 
    if(count>0){
      return console.log(err);
    }
    else{
      db.collection('users').save({'firstname': user.firstname, 'lastname': user.lastname, 'username': user.username
      , 'email': user.email, 'password': md5(user.password)}, (err, result) => {
if (err) return console.log(err);
response.send('OK');
      
})
    }
}); 
    
 
});



MongoClient.connect('mongodb://localhost:27017/healthylife', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3200, () => console.log('Example app listening on port 3200!'))
})