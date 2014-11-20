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
        },

        get:function(s){
                var stuff;
                var request = $http({
                    method: "get",
                    url: s,
                    headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"},
                    data: stuff
                });    

                return request;        
        },

        post:function(url, data){
                console.log("things being sent up: "+data["question"]);
                console.log("num_options: "+data["num_options"]);
                console.log("insta: "+data["insta"]);
                console.log("endtime: "+data["endtime"]);
           /* var formattedData='question='+data["question"]+
            '&num_options='+data["num_options"]+
            '&options='+data["options"]+
            '&insta='+data["insta"]+
            '&endtime='+data["endtime"]+
            '&disappearTime='+data["disappearTime"]+
            '&receivers='+data["receivers"]+
            '&receivingGroups='+data["receivingGroups"]; */
           // var parsedData=JSON.parse(data);
                console.log("passing up: "+data);
                var request = $http({
                    method: "post",
                    url: url,
                    headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"},
                    //data: 
                      //  data
                    params: {
                        question: data["question"],
                        num_options: data["num_options"],
                        insta: data["insta"],
                        endtime: data["endtime"],
                        disappearTime: data["disappearTime"],
                        receivers: data["receivers"],
                        receivingGroups: data["receivingGroups"],
                        options: data["options"]
                    }  
                    
                });
            console.log ("temp returned val: "+request);
            return request;            
        }
    }
});

