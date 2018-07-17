const mongoose = require('mongoose');

 const Schema = mongoose.Schema;

 const userSchema = new Schema ({
     username: {
         type: String,
         default: 'Jhon Doe'
     },
     email: {
         type: String,
         required: true,
         unique: true
     },
     passwordHash: {
         type: String,
         required: true
     }
 });

 module.exports = mongoose.model('User', userSchema);