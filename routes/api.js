const express = require('express');
const router = express.Router();
const multer = require('multer');
const Todo = require('../models/todo');
const User = require('../models/user');
const fileUploader = require('../fileUploader');
const nodeCron = require('../nodeCron');

// _______________________________USER API____________________________


router.get('/user', function (req, res) {
  console.log('GET request');
  User.find({})
    .populate('todo')
    .exec(function (err, user) {
      res.send(user);
    });

});

router.post('/user', function (req, res) {
  User.create(req.body).then(function (user) {
    console.log('POST request');  // res.send(req.body);
    res.send(user);
  });
});


router.put('/user/:id', function (req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (user) {
    console.log('UPDATE request');
    res.send(user);
  });
});

router.delete('/user/:id', function (req, res) {
  User.findByIdAndDelete({ _id: req.params.id }, req.body).then(function (user) {
    console.log('DELETE request');
    res.send(user);
  });
});

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
  // console.log(file.fielename);
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
// router.post("/scheduler", (req, res) => {
//     console.log('posting a user every 5 Sec')
//     var myData = new Data({id:'23151', name: "xxx"});
//     myData.save()
//       .then(item => {
//         res.send(item, "item saved to database");
//       })
//       .catch(err => {
//         res.status(400).send("unable to save to database");
//       });
//   });



module.exports = router