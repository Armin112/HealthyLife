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
var cur_user = "";

//REGISTER USER
app.post('/register', function(request, response){
  var user_reg = request.body;
      db.collection('users').save({'firstname': user_reg.firstname, 'lastname': user_reg.lastname, 'username': user_reg.username
      , 'email': user_reg.email, 'password': md5(user_reg.password), 'type': '2'}, (err, result) => {
        if (err) return console.log(err);
        response.send('OK');    
      })
});

//LOGIN USER
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

//GET SINGLE USER PROFILE
app.get('/users/myprofile', function(request, response){
  db.collection('users').find({username:cur_user}).toArray((err, users) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(users);
  })
});

//GET ADMIN USER
app.get('/users/is_admin', function(request, response){
  db.collection('users').find({username:cur_user}).toArray((err, users) => {
    if (err) return console.log(err); 
    response.send(cur_user);
  })
});

//EDIT SINGLE USER PROFILE
app.put('/users/edituser', function(request, response){
  user = request.body;
  db.collection('users').findOneAndUpdate( {username:cur_user }, {
    $set: {firstname: user.firstname, lastname: user.lastname, username: user.username, email: user.email}
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});

//GET ALL USERS
app.get('/admin/all_users', function(request, response){
  db.collection('users').find().toArray((err, users) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(users);
  })
});

//DELETE USER
app.delete('/admin/delete_user/:id', function(request, response){
  db.collection('users').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

//STORE POST IMAGE -- NOT WORKING
var storage	=	multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './Imagews'); },
  filename: function (request, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype)); }});
var upload = multer({ storage : storage }).array('image');

app.get('/admin/addblog', function(request, response){
  console.log("konju");
  response.sendFile(__dirname + '/' + 'static/views/add-blog.html');
  console.log(__dirname);
});

//ADD NEW BLOG POST
app.post('/admin/add_blog', function(request, response){
  var addblog = request.body;
  var excerpt = addblog.content.substring(0, 80);
  upload(request, response, function(err) { 
    if (err) return console.log(err);
    db.collection('blog').save({'title': addblog.title, 'content': addblog.content, excerpt: excerpt, 'tags': addblog.tags
    , 'image': addblog.image, 'date': date}, (err, result) => {
      if (err) return console.log(err);
      response.send('OK');
    })
  }); 
});

//GET ALL BLOG POSTS
app.get('/admin/all_blogs', function(request, response){
  db.collection('blog').find().toArray((err, blogs) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(blogs);
  })
});

//DELETE BLOG POST
app.delete('/admin/blog_delete/:id', function(request, response){
  db.collection('blog').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

//EDIT SINGLE BLOG POST
app.put('/admin/blog_edit/:id', function(request, response){
  edit_blog = request.body;
  var excerpt = edit_blog.content.substring(0, 80);
  db.collection('blog').findOneAndUpdate( {_id: new MongoId(request.params.id) }, {
    $set: {title: edit_blog.title, content: edit_blog.content, excerpt: excerpt, tags: edit_blog.tags, image: edit_blog.image  }
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});

//GET SINGLE BLOG POST
app.get('/admin/single_blog/:id', function(request, response){
  db.collection('blog').find({_id: new MongoId(request.params.id)}).toArray((err, single_blog) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(single_blog);
    cur_blog_id = request.params.id;
  })
});

//ADD NEW DISEASE
app.post('/admin/add_disease', function(request, response){
  var add_disease = request.body;
  var excerpt = add_disease.content.substring(0, 80);
  upload(request, response, function(err) { 
    if (err) return console.log(err);
    db.collection('disease').save({'title': add_disease.title, 'content': add_disease.content, excerpt: excerpt, 'tags': add_disease.tags
    , 'image': add_disease.image, 'date': date}, (err, result) => {
      if (err) return console.log(err);
      response.send('OK');
    })
  }); 
});

//GET ALL DISEASES
app.get('/admin/all_diseases', function(request, response){
  db.collection('disease').find().toArray((err, diseases) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(diseases);
  })
});

//DELETE DISEASE
app.delete('/admin/disease_delete/:id', function(request, response){
  db.collection('disease').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

//EDIT SINGLE DISEASE
app.put('/admin/disease_edit/:id', function(request, response){
  edit_disease = request.body;
  var excerpt = edit_disease.content.substring(0, 80);
  db.collection('disease').findOneAndUpdate( {_id: new MongoId(request.params.id) }, {
    $set: {title: edit_disease.title, content: edit_disease.content, excerpt: excerpt, tags: edit_disease.tags, image: edit_disease.image  }
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});

//GET SINGLE DISEASE
app.get('/admin/single_disease/:id', function(request, response){
  db.collection('disease').find({_id: new MongoId(request.params.id)}).toArray((err, single_disease) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(single_disease);
    cur_blog_id = request.params.id;
  })
});

//ADD NEW DRUG
app.post('/admin/add_drug', function(request, response){
  var add_drug = request.body;
  var excerpt = add_drug.content.substring(0, 80);
  upload(request, response, function(err) { 
    if (err) return console.log(err);
    db.collection('drug').save({'title': add_drug.title, 'content': add_drug.content, excerpt: excerpt, 'category':add_drug.category,
     'tags': add_drug.tags, 'image': add_drug.image, 'date': date}, (err, result) => {
      if (err) return console.log(err);
      response.send('OK');
    })
  }); 
});

//GET ALL DRUGS
app.get('/admin/all_drugs', function(request, response){
  db.collection('drug').find().toArray((err, drugs) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(drugs);
  })
});

//DELETE DRUG
app.delete('/admin/drug_delete/:id', function(request, response){
  db.collection('drug').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

//EDIT SINGLE DRUG
app.put('/admin/drug_edit/:id', function(request, response){
  edit_drug = request.body;
  var excerpt = edit_drug.content.substring(0, 80);
  db.collection('drug').findOneAndUpdate( {_id: new MongoId(request.params.id) }, {
    $set: {title: edit_drug.title, content: edit_drug.content, excerpt: excerpt, category: edit_drug.category, tags: edit_drug.tags, image: edit_drug.image  }
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});

//GET SINGLE DRUG
app.get('/admin/single_drug/:id', function(request, response){
  db.collection('drug').find({_id: new MongoId(request.params.id)}).toArray((err, single_drug) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(single_drug);
    cur_blog_id = request.params.id;
  })
});

//ADD COMMENT ON POST
app.post('/admin/add_comment', function(request, response){
  var user_comment = request.body;
      db.collection('comments').save({'firstname': user_comment.firstname, 'lastname': user_comment.lastname, 'username': user_comment.username
      , 'email': user_comment.email, 'message': user_comment.message, 'post_id': cur_blog_id, 'date': date}, (err, result) => {
        if (err) return console.log(err);
        response.send('OK');     
      })
});

//GET COMMENTS FROM OTHER USERS
app.get('/admin/get_comments', function(request, response){
  db.collection('comments').find( { $and: [ { post_id: { $eq: cur_blog_id } }, { username: { $ne: cur_user } } ] }).toArray((err, comments) => {
    if (err) return console.log(err);
    response.setHeader('Content-Type', 'application/json');
    response.send(comments);
  })
});

//GET COMMENTS FROM CURRENT USER
app.get('/admin/user_post_comment', function(request, response){
  db.collection('comments').find({ $and: [ { post_id: { $eq: cur_blog_id } }, { username: { $eq: cur_user } } ] }).toArray((err, user_comment) => {
    if (err) return console.log(err); 
    response.setHeader('Content-Type', 'application/json');
    response.send(user_comment);
  })
});

//DELETE COMMENT
app.delete('/admin/comment_delete/:id', function(request, response){
  db.collection('comments').findOneAndDelete({_id: new MongoId(request.params.id)}, (err, result) => {
    if (err) return res.send(500, err)
    response.send('OK');
  })
});

//EDIT COMMENT
app.put('/admin/comment_edit/:id', function(request, response){
  post_comment = request.body;
  db.collection('comments').findOneAndUpdate( {_id: new MongoId(request.params.id)}, {
    $set: {message: post_comment.message}
  }, (err, result) => {
    if (err) return res.send(err);
    response.send('OK');
  })
});

//CONNECT TO DATABASE AND RUN APP
MongoClient.connect('mongodb://localhost:27017/healthylife', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3200, () => console.log('Example app listening on port 3200!'))
})