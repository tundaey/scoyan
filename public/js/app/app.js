/**
 * Created by Tundaey on 9/10/2015.
 */
var app = angular.module('scoyan', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home',{
        url: '/',
        templateUrl: 'index.html'
    })
}])