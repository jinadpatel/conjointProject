// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        first_name: String,
        last_name: String,
        email: String,
        password: String
    }
});

// generating a salt and hash using hashSync
userSchema.methods.generateHash = function(password) {
    var hash = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, hash, null);
};

// password validation
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);//checking the entered password with the stored password
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);