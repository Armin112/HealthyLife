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
var MongoId = require('mongodb').ObjectID;
var nowDate = new Date();
var multer = require('multer');
var cur_blog_id = "";
var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 

app.post('/register', function(request, response){
  var user_reg = request.body;
      db.collection('users').save({'firstname': user_reg.firstname, 'lastname': user_reg.lastname, 'username': user_reg.username
      , 'email': user_reg.email, 'password': md5(user_reg.password), 'type': '2'}, (err, result) => {
        if (err) return console.log(err);
        response.send('OK');    
      })
});

var cur_user = "";
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
        cur_user = user.username;
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
  db.collection('users').find({username:cur_user}).toArray((err, users) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(users);
   
    console.log(cur_user);
  })
});

app.get('/users/is_admin', function(request, response){
  db.collection('users').find({username:cur_user}).toArray((err, users) => {
    if (err) return console.log(err); 
    response.send(cur_user);
    console.log(cur_user);
  })
});

app.put('/users/edituser', function(request, response){
  user = request.body;
  db.collection('users').findOneAndUpdate( {username:cur_user }, {
    $set: {firstname: user.firstname, lastname: user.lastname, username: user.username, 
      email: user.email}
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});

app.get('/admin/all_users', function(request, response){
  db.collection('users').find().toArray((err, users) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(users);
  })
});


app.delete('/admin/delete_user/:id', function(request, response){
  db.collection('users').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

var storage	=	multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './Imagews');
  },
  filename: function (request, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});
var upload = multer({ storage : storage }).array('image');

app.get('/admin/addblog', function(request, response){
  console.log("konju");
  response.sendFile(__dirname + '/' + 'static/views/add-blog.html');
  console.log(__dirname);
});

app.post('/admin/addblog', function(request, response){
  var addblog = request.body;
  var excerpt = addblog.content.substring(0, 80);
  
  upload(request, response, function(err) { 
    if (err) return console.log(err);
    console.log(storage.destination);
    console.log(storage.filename);
    db.collection('blog').save({'title': addblog.title, 'content': addblog.content, excerpt: excerpt, 'tags': addblog.tags
    , 'image': addblog.image, 'date': date}, (err, result) => {
      if (err) return console.log(err);
      response.send('OK');
    })
  }); 
  
});

app.get('/admin/all_blogs', function(request, response){
  db.collection('blog').find().toArray((err, blogs) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(blogs);
  })
});

app.delete('/admin/blog_delete/:id', function(request, response){
  db.collection('blog').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

app.get('/admin/single_blog/:id', function(request, response){
  db.collection('blog').find({_id: new MongoId(request.params.id)}).toArray((err, single_blog) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(single_blog);
    cur_blog_id = request.params.id;
  })
});

app.post('/admin/add_comment', function(request, response){
  var user_comment = request.body;
      db.collection('comments').save({'firstname': user_comment.firstname, 'lastname': user_comment.lastname, 'username': user_comment.username
      , 'email': user_comment.email, 'message': user_comment.message, 'post_id': cur_blog_id, 'date': date}, (err, result) => {
        if (err) return console.log(err);
        response.send('OK');     
      })
});

app.get('/admin/get_comments', function(request, response){
  db.collection('comments').find({post_id: cur_blog_id}).toArray((err, comments) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(comments);
  })
});

MongoClient.connect('mongodb://localhost:27017/healthylife', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3200, () => console.log('Example app listening on port 3200!'))
})