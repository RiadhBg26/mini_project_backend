const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const emailSender = require('./emailSender')
const fileUploader = require('./fileUploader');
const app = express()

mongoose.connect('mongodb://localhost/mydb', { useUnifiedTopology: true,  useNewUrlParser: true  });
// mongoose.connect('mongodb://localhost/user');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', require('./routes/api'));


app.listen(process.env.port || 4000, function(){
    console.log('listening to requests ..');
})



// "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
