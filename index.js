const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const emailSender = require('./nodeMailer')
const fileUploader = require('./fileUploader');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const path = require("path");



const app = express()

mongoose.connect('mongodb://localhost/mydb', { useUnifiedTopology: true,  useNewUrlParser: true, useCreateIndex: true  });
// mongoose.connect('mongodb://localhost/user');

mongoose.Promise = global.Promise;
app.use(bodyParser.json(), bodyParser.urlencoded({ extended : false }));

//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session : false }) );
app.use('/api', require('./routes/api'));

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

app.listen(process.env.port || 4000, function(){
    console.log('listening to requests ..');
})
















































//_____________________________________________________

//session

// app.use(session({
//   name: 'sessionId',
//   secret : 'secretKey',
//   saveUninitialized: false, //don't create session for unlogged users
//   resave : false, //don't save session if unmodified

//   //where to store the session
//   store: new MongoStore({
//       mongooseConnection : mongoose.connection,
//       ttl: 60 * 60 * 24 * 1 // how long store the session (1day)
//   }),
//   cookie: {
//       secure: false,
//       httpOnly: false, //if true, will disallow Javascrpt from reading cookie data
//       expire: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
//   }
// }));  

//passport init must be establishing session above
// app.use(passport.initialize());
// app.use(passport.session())

// app.use(express.static(__dirname + '/public'));


// //navbar page 
// app.get('/',function(req,res){
//   process.chdir('C:/Users/ASUS/Desktop/backend/routes/navbar')
//   // res.sendFile(path.join(__dirname+'/index.html'));
//   res.sendFile(path.join(process.cwd() + '/navbar.html'));
//   //__dirname : It will resolve to your project folder.
// });

// //Registration page 
// app.get('/',function(req,res){
//     process.chdir('C:/Users/ASUS/Desktop/backend/routes/register')
//     // res.sendFile(path.join(__dirname+'/index.html'));
//     res.sendFile(path.join(process.cwd() + '/register.html'));
//     //__dirname : It will resolve to your project folder.
//   });

// //Login page 
// app.get('/',function(req,res){
//     process.chdir('C:/Users/ASUS/Desktop/backend/routes/login')
//     // res.sendFile(path.join(__dirname+'/index.html'));
//     res.sendFile(path.join(process.cwd() + '/login.html'));
//     //__dirname : It will resolve to your project folder.
//   });



// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
