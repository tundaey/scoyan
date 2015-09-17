/**
 * Created by Tundaey on 6/24/2015.
 */
var auth = require('../controllers/auth');
var userController = require('../controllers/userController')
module.exports = function(app, express){
    var apiRouter = express.Router();

    apiRouter.post('/registerUser', auth.register);
    apiRouter.post('/login', auth.login);
    apiRouter.use(auth.authenticate);
    apiRouter.route('/users/:id')
        .get(userController.getUser)
        .put(userController.updateUser)
        .delete(userController.deleteUser);


    return apiRouter;
}
