const express = require('express');
const router = express.Router();
const multer = require('multer');
const Todo = require('../models/todo');
const User = require('../models/user');
const fileUploader = require('../fileUploader');
const nodeCron = require('../nodeCron');
var path = require("path");

const passport = require('../passport');
const jwt = require('jsonwebtoken');


// _______________________________USER API____________________________


// router.get('/user', function (req, res) {
//   console.log('GET request');
//   User.find({})
//     .populate('todo')
//     .exec(function (err, user) {
//       res.send(user);
//     });

// });

// router.post('/user', function (req, res) {
//   User.create(req.body).then(function (user) {
//     console.log('POST request');  // res.send(req.body);
//     res.send(user);
//   });
// });


// router.put('/user/:id', function (req, res) {
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (user) {
//     console.log('UPDATE request');
//     res.send(user);
//   });
// });

// router.delete('/user/:id', function (req, res) {
//   User.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (user) {
//     console.log('DELETE request');
//     res.send(user);
//   });
// });



// _______________________________TODO API____________________________


router.get('/todo', function (req, res) {
  console.log('GET request');
  // res.send(req.body);
  Todo.findOne({ _id: "5eac296b7bef8226940cddaf" }).populate('User').exec(function (err, todo) {
    res.send(todo);
  });
});

router.post('/todo', function (req, res) {
  Todo.create(req.body).then(function (todo) {
    res.send(todo);
    console.log('POST request');  // res.send(req.body);
  });
});

router.put('/todo/:id', function (req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (todo) {
    res.send(todo);
  });
});

router.delete('/todo/:id', function (req, res) {
  User.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (todo) {
    res.send(todo);
  });
});


// _______________________________FILE UPLOADER API____________________________

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, 'uploads');
  },
  filename: function (req, file, next) {
    next(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
});

const upload = multer({ storage: storage });


router.get('/uploadfile', function (res, req) {
  console.log("good");
})
router.post('/uploadfile', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.fielename);
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  };
  res.send(file)
  console.log('it worked !!');
});

// _______________________________NODE CRON API____________________________

router.get('/timer', (req, res, next) => {
  task = nodeCron.schedule("*/2 * * * * *", () => {
    console.log('posting a user every 2 Sec')
  })
     res.send({
      data: 'data'
    })
})

//____________________________Register User __________________________

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  res.json({
    message : 'Signup successful',
    user : req.user
  });
  try{
    const savedUser = await user.save();
    res.send(savedUser)
  }catch(err){
    res.status(400)
  }
 
});

//____________________________Login User __________________________
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {  try {
      if(err || !user){
        const error = new Error('An Error occurred')
        return next(error);
      }
      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body },'top_secret');
        //Send back the token to the user
        return res.json({ token });
      });    
     } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


//____________________________Securing Routes__________________________
//Let's say the route below is very sensitive and we want only authorized users to have access

// Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  })
});

module.exports = router


