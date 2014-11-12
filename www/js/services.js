angular.module('iOpinio.services',[]).factory('iOpinio',['$http',function($http){
    return {
        create:function(u, p){
            console.log("passing up: "+u);
            var params= {"username": u, "password" : p};
            var temp= $http.post("https://web.engr.illinois.edu/~chansky2/login.php",params);
            console.log ("temp returned val: "+temp[1]);
            return temp;
        }
    }
}]);

