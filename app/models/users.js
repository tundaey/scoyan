/**
 * Created by Tundaey on 6/24/2015.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    user_name: String,
    name: String,
    password: {type: String, select: false},
    address: {type: String}

});

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password){
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

userSchema.methods.generateJWT = function(){
    return jwt.sign({
        id: this._id,
        name: this.first_name + this.last_name
    }, config.jwtsecret)
};

userSchema.virtual('fullName').get(function(){
    return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('User', userSchema);
