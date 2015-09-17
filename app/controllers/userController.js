var User = require('../models/users');
module.exports = {
    getUser: function(req, res, next){
        User.findById(req.params.id, function(err, user){
            if(err) return next(err);
            res.json(user);
        });
    },
    updateUser: function(req, res, next){
        User.findById(req.params.id, function(err, user){
            if(err) return next(err);
            if(req.body.first_name) user.first_name = req.body.first_name;
            if(req.body.last_name) user.last_name = req.body.last_name;
            if(req.body.password) user.password = req.body.password;
            if(req.body.address) user.address = req.body.address;
            if(req.body.genotype) user.genotype = req.body.genotype;
            if(req.body.bloodGroup) user.bloodGroup = req.body.bloodGroup;
            if(req.body.weight) user.weight = req.body.weight;
            if(req.body.height) user.height = req.body.height;
            if(req.body.allergies) user.allergies.push(req.body.allergies);
            user.save(function(err){
                if(err) return next(err);
                res.json({message: 'Data updated'});
            });
        });
    },

    deleteUser: function(req, res, next){
        User.remove({
            __id: req.params.id
        }, function(err, user){
            if(err) return next(err);
            res.json({message: 'Data Deleted'});
        });
    }
}
