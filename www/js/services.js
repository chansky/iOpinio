angular.module('iOpinio.services',[]).factory('iOpinio', function($http){
    return {
        create:function(u, p){
            console.log("passing up: "+u);
          //  var temp= $http.post("https://web.engr.illinois.edu/~chansky2/login.php", {"username": u, "password" : p}, {headers:
            //    {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}
           // });
                var data='username='+u+'&password='+p;  //the data to be send formated for angular's version of jquery
                var request = $http({
                    method: "post",
                    url: "https://web.engr.illinois.edu/~chansky2/login.php",
                    headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"},
                    data: 
                        data
                    
                });
            console.log ("temp returned val: "+request);
            return request;
        }
    }
});

