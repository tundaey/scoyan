/**
 * Created by Tundaey on 6/24/2015.
 */
 var image_path = 'mcfly.jpg';
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config');
module.exports = {
    register: function(req, res, next){
        console.log(req.body);
        User.findOne({email: req.body.email}, function(err, user){
            if(err) return next(err);
            if(user){
                return res.status(401).send({message: 'Sorry, there is an existing user with this email address'})
            }
            var user = new User();
            user.email = req.body.email;
            user.user_name = req.body.user_name;
            user.name = req.body.name;
            user.password = req.body.password;
            user.address = req.body.address;
            user.save(function(err, registeredUser){
                if(err) return next(err);
                if(registeredUser){
                    var token = registeredUser.generateJWT();
                    return res.send({token: token, message: 'Registration successful'})
                }
            })
        })
    },

    login: function(req, res, next){
        User.findOne({email: req.body.email}).select('__id password email first_name last_name role').exec(function(err, user){
            if(err) return next(err);
            if(!user){
                res.status(404).send({message: 'Username or password is incorrect'})
            }else if(user){
                var validPassword = user.comparePassword(req.body.password);
                //return res.send(req.body.password);
                if(!validPassword){
                    return res.status(403).send({message: 'Username or Password incorrect', status: false});
                }
                var token = user.generateJWT();
                var user_details = {fullname : user.fullName, email: user.email,id: user._id}
                return res.send({token:token, status: true, role: user.role, user_details: user_details});
            };
        });
    },

    authenticate: function(req, res, next){
        var token = req.body.token || req.param.token || req.headers['x-access-token'];
        if(token){
            jwt.verify(token, config.jwtsecret, function(err, decoded){
                if(err) return res.status(403).send({message: 'Authentication failure'});
                req.decoded = decoded;
                next();
            })
        }else{
            res.send({message: 'No token Provided'});
        }
    }
}
