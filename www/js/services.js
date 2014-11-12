angular.module('iOpinio.services',[]).factory('iOpinio', function($http){
    return {
        create:function(u, p){
            console.log("passing up: "+u);
            var temp= $http.post("https://web.engr.illinois.edu/~chansky2/login.php",{"username": u, "password" : p});
            console.log ("temp returned val: "+temp[0]);
            return temp;
        }
    }
});

