const multer = require('multer');
const express = require('express');
const app = express()


// const storage = multer.diskStorage({
//     destination: function(req, file, next) {
//         next(null, 'uploads');
//     },
//     filename: function(req, file, next) {
//         next(null, file.fieldname + '-' + Date.now() + '.jpg');
//     }
// });

// const upload = multer({ storage : storage});

module.exports = multer