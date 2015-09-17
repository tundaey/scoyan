/**
 * Created by Tundaey on 9/14/2015.
 */
var base = 'http://localhost:9000/api/';
angular.module('scoyan').factory('RegFactory', function($http){
    var RegAPI = {
        registerUser: function(user){
            return $http.post(base + 'registerUser', user);
        }
    };

    return RegAPI;
})