/**
 * Created by Tundaey on 9/10/2015.
 */
var app = angular.module('scoyan', ['ui.router', 'angular-flexslider', 'angularSpinner','ngMessages']);

app.config(function($stateProvider, $urlRouterProvider, usSpinnerConfigProvider){
    usSpinnerConfigProvider.setDefaults({color: 'green'});
    $stateProvider.state('home',{
        url: '/',
        templateUrl: '/templates/home.html',
        controller: 'HomeCtrl',
        resolve: {
            mySlides : function(){
                return {value : [
                    {
                        img: '../img/African youths.jpg', title:'SCOYAN,',
                        second_title: 'The socio-community youth associations of nigeria',
                        other_text: 'Strengthening the institutional building and operations',
                        other_text2: 'of youth organizations',
                        button_text: 'Join us'
                    },

                    {
                        img: '../img/Asia-Africa-Youth-Dialogue.jpg', title:'What is SCOYAN ?,',
                        second_title: '',
                        other_text: 'The socio-community youth association of Nigeria (SCOYAN) was launched as a signature effort to invest',
                        other_text2: 'in the next generation of nigerian youths in order to groom strong, result-oriented leaders',
                        button_text: 'Learn more about SCOYAN'

                    }
                ]}
            }
        }
    }).state('about', {
        url: '/about',
        templateUrl: '/templates/about-us.html',
    }).state('contact', {
        url: '/contact',
        templateUrl: '/templates/contact.html'
    }).state('register', {
        url: '/register',
        templateUrl: '/templates/register.html',
        controller: 'RegCtrl'
    }).state('news', {
        url: 'news',
        templateUrl: '/templates/news.html'
    }).state('confirmation', {
        url: '/confirmation',
        templateUrl: '/templates/confirmation.html'
    })

    $urlRouterProvider.otherwise('/');
})