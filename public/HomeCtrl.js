/**
 * Created by Tundaey on 9/10/2015.
 */
angular.module('scoyan')
    .controller('HomeCtrl', ['$scope', 'mySlides', function($scope, mySlides){
        console.log(mySlides.value);
        $scope.mySlides = mySlides.value;

   /* $scope.mySlides = [
        {
            img: '../img/African youths.jpg', title:'scoyan,',
            second_title: 'The socio-community youth associations of nigeria',
            other_text: 'Strengthening the institutional building and operations',
            other_text2: 'of youth organizations'
        },

        {
            img: '../img/Asia-Africa-Youth-Dialogue.jpg', title:'scoyan,',
            second_title: 'The socio-community youth associations of nigeria',
            other_text: 'Strengthening the institutional building and operations',
            other_text2: 'of youth organizations'
        }
    ]*/
}]).controller('RegCtrl', ['$scope', 'usSpinnerService','RegFactory', '$state', function($scope, usSpinnerService, RegFactory, $state){
        $scope.user = {};
        $scope.registerUser = function(){
            usSpinnerService.spin('spinner-1');
            console.log($scope.user);
            //usSpinnerService.stop('spinner-1');
            RegFactory.registerUser($scope.user).success(function(result){
                usSpinnerService.stop('spinner-1');
                $state.go('confirmation');
                console.log(result)
            }).error(function(error){
                usSpinnerService.stop('spinner-1');
                console.log(error);
            })
        }
    }])