angular.module('iOpinio.controllers', [])

    
    .controller('homeCtrl', function ($scope, $location) {
        $scope.changeView = function(view){
            $location.path(view);
        }
    }) 

    .controller('registerPageCtrl', function($scope, $location){

    })

    .controller('loginPageCtrl', ['$scope', 'iOpinio', '$location', function($scope, iOpinio, $location){
        $scope.submitLogin = function(){
            var u = $scope.username;
            var p = $scope.password;
            if(u!='' && p!=''){
                iOpinio.create(u, p).success(function(res){ 
                    console.log("the db access returned: " +res);
                    if(res[1]==='t'){
                        $location.path("createPoll");  //this line is a f'n miracle     
                    }
                    else{
                      //  window.alert("incorrect username or password");
                        //$location.reload();
                    }
                }).error(function(d){
                    console.log("in error part");
                    console.log(res);
                });
            }
            else{
               // window.alert("username or password is missing");
                //location.reload();
            }
            return false;
        }
    }])

    .controller('createPollCtrl', function($scope, $location){

    });
