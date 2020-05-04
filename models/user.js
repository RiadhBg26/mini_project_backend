const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    todo: [{type: Schema.Types.ObjectId , ref: 'Todo'}]
});

UserSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User', UserSchema);
module.exports = User;
