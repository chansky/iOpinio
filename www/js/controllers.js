    var optionCounter=0; var uniquePhotoCount=0; var photos = []; var WickedIndex;  var options = [];
    var tImgID;
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

function option(){
  optionText="";
  containsImg=0;
  counterNum=-1;
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

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
            console.log(u);
            console.log(p);
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


      $scope.options=[]; 
      $scope.photos=[]; 
                
        $scope.add_option = function(){
            console.log("clicked add option");
           // var field=document.getElementById("add-option-text");
            console.log("yoooooo: "+$scope.addOptionText);
            tImgID="tmppic"+optionCounter;
            var option_text = $scope.addOptionText;
            var tempObj= new option();
            tempObj.optionText=option_text;
            tempObj.containsImg=0;
            tempObj.counterNum=optionCounter;       
            $scope.options.push(tempObj); 
          //  window.alert("option text: "+option_text);  
            if(option_text !== ''){
             //   $scope.optionsList.append('<li id="'+optionCounter+'"><div class="ui-grid-b"><div class="ui-block-a" style="width: 30%;"><div data-role="fieldcontain"><a id="'+optionCounter+'" href="#createPoll" class="btn btn-lg btn-success" data-toggle="modal" data-target="#basicModal"><span class="ui-btn-inner ui-btn-corner-all"><img style="width:60px;height:60px;" src="img/default_pic.png" id="'+tImgID+'"></span></a></div></div><div class="ui-block-b" style="width: 60%;"><div data-role="fieldcontain"><h2 id="otext">'+ option_text +'</h2></div></div><div class="ui-block-c" style="width: 6%; padding-top: 10px; float: right;"><div style="float: right;"><input type="button" id="remove-option-button" value="remove"/></div></div></div></li>').listview("refresh");          
               // $scope.addOptionText;
                optionCounter++;
            }
            else{
                //window.alert("Nothing to add!",function(){});
            }
            //$("#createPoll").trigger("create");
        }
        /*
        $('#options-list').on('click', '#remove-option-button', function(event) {
            console.log("remove clicked on");
            tImgID="tmppic"+(optionCounter);  //used to be -1
            event.preventDefault();
            var removalIndex=$(this).parent().parent().parent().parent().attr('id');
            console.log("removing (aka removal index): "+removalIndex+", and optionCounter is: "+optionCounter);
            console.log("options size before remove: "+options.length);
            //im thinking if i add a for loop to go through the options array and find the option with the 
            //matching id then thats my true removal index!
            var trueRemovalIndex=-1;
            for(var i=0; i<options.length; i++){
                if(options[i].counterNum==removalIndex)
                    trueRemovalIndex=i;
            }
            console.log("true removal index is: "+trueRemovalIndex);
            options.splice(trueRemovalIndex, 1);  //actually removes the option from the options array
           // optionCounter--;  //this is bad because it leads to li's with the same id
            console.log("options size after removal: "+options.length+" and optionCounter is: "+optionCounter);
            console.log("photos length is: "+photos.legnth+", and uniquePhotoCount is: "+uniquePhotoCount);
            var i=0;
            var helperFlag=0;
            for(var x in photos){
                    if(photos.hasOwnProperty(x)){
                        if(i==trueRemovalIndex)
                            helperFlag=1;
                        i++;
                    }
            }
            console.log("the length of photos pre-remove is: "+i);
            if(helperFlag==1){
                photos.splice(trueRemovalIndex, 1);
                //delete photos[trueRemovalIndex];
                uniquePhotoCount--;
                console.log("new length of photos is: "+photos.length);
            }

           $(this).parent().parent().parent().parent().remove();

        });
        $("#sendTo").on("tap",function(e){
            console.log("# options being sent: "+options.length);
         e.preventDefault();
        });
        $('#options-list').delegate('li', 'vclick', function() {
            console.log("the list item clicked was: "+this.id);
            WickedIndex = this.id;
         });  */
    });
