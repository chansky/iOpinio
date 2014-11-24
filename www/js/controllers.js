    var optionCounter=0; var uniquePhotoCount=0; var photos = []; var WickedIndex;  var options = [];
    var tImgID;
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

function option(){
  optionText="";
  containsImg=0;
  counterNum=-1;
}
function usernameObject(){
    name="";
    checked="false";
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function alreadyContains(arr, testVal){
    for(var i=0; i<arr.length; i++){
        if(arr[i].name==testVal)
            return true;
    }
    return false;
}

angular.module('iOpinio.controllers', [])

    
    .controller('homeCtrl', function ($scope, $location) {
        $scope.changeView = function(view){
            $location.path(view);
        }
    }) 

    .controller('registerPageCtrl', function($scope, $location, iOpinio){

        $scope.submitRegisterForm=function(){
            console.log("register clicked");
            var g = $scope.Reggender;
            var ph = $scope.Regphonenumber;
            var em = $scope.Regemail;
            var u = $scope.Regusername;
            console.log("obtained username: "+u);
            var p = $scope.Regpassword;
            var a = $scope.Regage;
            var theToken=1;
            var deviceID=1;
            var deviceType=1;

            if(theToken!=-1&&deviceID!=-1){
                var deviceType=-1;
                    if(devicePlatform=="Android"){
                        deviceType=1;
                    }
                    else{
                        deviceType=2;
                    }
                var devicePlatform="chansky";
                if(em!='' && u!='' && p!=''&& deviceID!=''){
                    iOpinio.registerPost("https://web.engr.illinois.edu/~chansky2/register.php",{gender:g,phonenumber:ph,email:em,username:u,password:p,age:a,token:theToken,deviceID:deviceID,deviceType:deviceType}).success(function(res){
                        console.log("res at 0: "+res[0]+" ,res at 1: "+res[1]+ ", res at 2: "+res[2]);
                        if(res[2]=='t'){
                            console.log("inside the res==t");
                            $location.path("contactsPage");
                        }
                        console.log("return vals from register call: "+res);
                    }); 
                    for(var i=0; i<20000; i++){
                        //do nothing
                        if(i==19999)
                            console.log("finished third round of doing nothing");
                    }
                    //window.alert(res);
                    //window.alert("outside of post");
                    console.log("outside of post");

                }
                else{
                    window.alert("empty field(s)");
                }
            }
        }


    })

    .controller('sendToPageCtrl', function($scope, $location, iOpinio){
        console.log("in sendTo page");
        
         $scope.contacts = [];
        var fullNames= [];
        $scope.groupNames=[];

        iOpinio.get("https://web.engr.illinois.edu/~chansky2/buildGroup.php").success(function(resp){
            console.log("response is: "+resp);
            var obj = resp;            
            console.log("obj[i][gn]: "+obj[0]["gn"]);
            console.log("length of obj is: "+obj.length);
            //console.log("obj[i].gn: "+obj[i].gn);
            for(var i = 0; i < obj.length; i++) {
             // if(inArray(obj[i].gn, groupNames)==-1)  //to prevent duplicates
                console.log("obj at: "+i+" is: "+obj[i]["gn"]+"\n");
                $scope.groupNames.push(obj[i]["gn"]);     
            }
        });
        iOpinio.get("https://web.engr.illinois.edu/~chansky2/getFriends.php").success(function(data){
            var obj = data;
            console.log("get Friends obj: "+obj);
            console.log("obj[0]['username']: "+obj[0]["username"]);
            for(var i = 0; i < obj.length; i++) {
             // if(jQuery.inArray(obj[i].username, contacts)==-1)  //to prevent duplicates
                if(!alreadyContains($scope.contacts, obj[i]["username"])){
                    console.log("obj at: "+i+" is: "+obj[i]["username"]+"\n");
                    temp= new usernameObject();
                    temp.name=obj[i]["username"];
                    $scope.contacts.push(temp);     
                }
            }
        });  


         $scope.sendInfo =function(){
        var selected = [];
        var groupsSelected=[];
       /* $('#sendToCheckboxes input:checked').each(function() {
            selected.push($(this).attr('name'));
        });
    */
       // console.log("i can see contacts array is of length: "+$scope.contacts.length);
            for(var i=0; i<$scope.contacts.length; i++){
                console.log("val at "+i+" is: "+$scope.contacts[i].name);
                console.log("val at "+i+" is: "+$scope.contacts[i].checked);
                if($scope.contacts[i].checked==true)
                    selected.push($scope.contacts[i].name);
            }
    /*
        $('#groupNameCheckBoxes input:checked').each(function(){
            groupsSelected.push($(this).attr('name'));
        });
    */
           // console.log("1st group selected: "+groupsSelected[0]);
    //get info from local storage
        var info=(localStorage.getItem("allPollInfo"));
        var parsedInfo=JSON.parse(info);
        var et = parsedInfo["endTime"];  //weird ios only issue with this?
        var dt= parsedInfo["disappearTime"];
        var isInsta=parsedInfo["isInsta"];
        var options=parsedInfo["optionsArr"];
        var question=parsedInfo["question"];
        var photos=parsedInfo["photoArr"];
        console.log("example data, question: "+question);
        console.log("endtime: "+et);
        console.log("disappearTime: "+dt);
        console.log("options looks like this: "+options);
        console.log("parsed options looks like: "+JSON.stringify(options));
        var betterOptions=JSON.stringify(options);
        var betterReceivers = JSON.stringify(selected);
        var betterGroups = JSON.stringify(groupsSelected);
       // window.alert("your poll is being created!");
        iOpinio.post("https://web.engr.illinois.edu/~chansky2/addPollI.php",{question:question, num_options:options.length,
            options:betterOptions, insta:isInsta, endtime:et, disappearTime:dt, receivers:betterReceivers, receivingGroups:betterGroups}).success(function(res){
            //window.alert("res: "+res);
        //iOpinio.post("https://web.engr.illinois.edu/~chansky2/addPollI.php",parsedInfo).success(function(res){
            console.log("the output of the call to addPollI: "+res);
            var retVal=parseInt(res);
            //console.log("res at 0 is: "+res[0]);
            //console.log("res at 1 is: "+res[1]);
            //console.log("ret val is: "+retVal);
            $scope.uploadStuff(retVal, photos);
            localStorage.removeItem("allPollInfo");
            $location.path("createPoll");
            //window.location.hash="createPoll";
        }); 
      }

    $scope.uploadStuff =function(num, photos){
        console.log("in upload stuff (the function that uploads the photos)");
        console.log("photo length is: "+photos.length);
        var fileName="";
        var image=0;
        if(photos.length>0)
            image=1;
        if(image==1){
            for(var i=0; i<photos.length; i++){  
                fileName=photos[i];
                var uploadOptions = new FileUploadOptions();
                uploadOptions.fileKey="file";
                uploadOptions.fileName=num+".jpg";  //look at num
                console.log("pic file name: "+uploadOptions.fileName);
                uploadOptions.mimeType="image/jpg";
                uploadOptions.chunkedMode=false;
                //uploadOptions.correctOrientation= true;  //this didn't do anything
             //   uploadOptions.chunkedMode = true;  //new
                uploadOptions.headers = {Connection: "close"}; //new, this really helped android upload!
                var params = new Object();
                uploadOptions.params = params;
                var ft = new FileTransfer();
                ft.upload(fileName, encodeURI("https://web.engr.illinois.edu/~chansky2/uploadFile.php"), win, fail, uploadOptions, true);
                num++;
            }
        }
                    options=[]; photos=[];  //testing emptying   
    }  
          
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
                    console.log(d);
                });
            }
            else{
               // window.alert("username or password is missing");
                //location.reload();
            }
            return false;
        }
    }])


    .controller('createPollCtrl', function($scope, $location, $ionicModal){



$ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  




      $scope.options=[]; 
      $scope.photos=[]; 
      $scope.timeOptions = [
          {time:'1 Minute'},
          {time:'5 Minutes'},
          {time:'10 Minutes'},
          {time:'30 Minutes'},
          {time:'1 Hour'},
          {time:'1 Day'},
          {time:'1 Week'}
      ];    

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
            //$scope.openModal();
            modal.show();
        }

        $scope.goToSendToPage = function(){
            console.log("clicked go to send to page");
            var isInsta= $scope.INSTABOX;
            if(!isInsta){
              isInsta="0";
            }
            var question = $scope.question;
            var selectedValue="null"
            if($scope.mytimeOptions!=null)
             selectedValue = $scope.mytimeOptions.time;
            console.log("selected time: "+selectedValue);

            var d = new Date();
            var seconds = d.getUTCSeconds();
            var minutes = d.getUTCMinutes();
            var hour = d.getUTCHours();
            var year = d.getUTCFullYear();
            var month = d.getUTCMonth()+1; // beware: January = 0; February = 1, etc.  //need +1 b/c of php
            var day = d.getUTCDate();
            //second set of these values for dissapear time
            var s, m, h, y, mo, d;
            y=year;
            mo=month;
            s=seconds;
            h=hour;
            m=minutes;
            d=day;
            var noTimePicked=0;
            if(selectedValue=="1 Minute"){
                minutes=minutes+1;
                m=minutes+1;
            }
            else if(selectedValue=="5 Minutes"){
                minutes=minutes+5;
                m=minutes+5;
            }
            else if(selectedValue=="10 Minutes"){
                minutes=minutes+10;
                m=minutes+10;
            }
            else if (selectedValue=="30 Minutes"){
                minutes=minutes+30;
                m=minutes+30;
            }
            else if (selectedValue=="1 Hour"){
                hour=hour+1;
                h=hour+1;
            }
            else if (selectedValue=="1 Day"){
                day=day+1;
                d=day+1;
            }
            else if (selectedValue=="1 Week"){
                day=day+7;
                d=day+7
            }
            else{
                noTimePicked=1;
            }
            //seems like the below should only happen if no time picked is still equal to 0...
            if(minutes>=60){
              minutes=minutes%60;
              hour=hour+1;
            }
            if(m>=60){
              m=m%60;
              h=h+1;
            }
            if(hour>=24){
              hour=hour%24;
              day=day+1;
            }
            if(h>=24){
              h=h%24;
              d=d+1;
            }
            if(day>daysInMonth(month,year)){
              day=day-daysInMonth(month,year);
              month=month+1;
            }
            if(d>daysInMonth(mo, y)){
              d=d-daysInMonth(mo, y);
              mo=mo+1;
            }
            if(month>11){
              month=0;
              year=year+1;
            }
            if(mo>11){
              mo=0;
              y=y+1;
            }
            if(month<10){  //need this to make php and sql happy
                month="0"+month;
            }
            if(m<10){
              m="0"+m;
            }
           var et="";
           var dt="";
           if(noTimePicked!=1){
                var et=year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
                var dt=y+"-"+mo+"-"+d+" "+h+":"+m+":"+s;
            }
            var allPollInfo={'endTime': et, 'optionsArr':$scope.options, 'isInsta': isInsta, 'question': question, 'photoArr': photos, 'disappearTime':dt};
            if(typeof(window.localStorage) != 'undefined'){ 
                console.log('storing local data');
                window.localStorage['allPollInfo']= JSON.stringify(allPollInfo);
            } 
            else{ 
                window.alert("storage failed...");
                console.log("store FAILED");
                throw "window.localStorage, not defined"; 
            }
            optionCounter=0;
            //options=[];  //testing empty  
            //photos=[];  //testing empty
            $location.path("sendToPage");
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

        });  */

    })



    .controller('contactsPageCtrl', function($scope, $location){
        console.log('contacts Page');
        var contactOptions = new ContactFindOptions();   //this used to be var options =... but i changed it
        contactOptions.filter = "";
        contactOptions.multiple = true;
        var fields = ["displayName","phoneNumbers"];
        console.log("about to call find contacts");
        navigator.contacts.find(fields, onSuccess, onError, contactOptions);      
        var loaded = false;
        var pnums = [];  

        function onSuccess(contacts) {
            console.log("Success, found contacts");
            for(var i=0; i<contacts.length; i++){
                if(contacts[i].displayName){
                    if(contacts[i].phoneNumbers != null){
                        for(var j=0; j<contacts[i].phoneNumbers.length; j++){
                            pnums.push(parsenum(contacts[i].phoneNumbers[j].value));
                        }
                    }
                }
            }

            var usernames = [];
            var fullnames = []; 
            console.log("about to make the post request part of find contacts");
             $.post("https://web.engr.illinois.edu/~chansky2/findContacts.php",{phonenumbers:pnums},function(res){
               console.log("find contacts php returned: "+res);
               if(res!="No"){  //never have tested this case (i'd need a phone who doesn't have my #)
                    var obj = jQuery.parseJSON(res);   //or i'd have to remove my # from the DB
                    //window.alert(obj);
                    for(var i=0; i<obj.length; i++){
                        usernames.push(obj[i].username);
                       // fullnames.push(obj[i].fullname);
                    }
                    $("#frame").html('<fieldset id="contactsCheckboxes" data-role="controlgroup"><legend>Select who you want to follow:</legend></fieldset>');
                    for(var i=0; i<usernames.length; i++){
                        //document.write(contacts[i].phoneNumbers.length)
                            $("fieldset").append('<input type="checkbox" name="' + usernames[i] + '" id="id' + i + '"><label for="id' + i + '">' + usernames[i] + '</label>');
                    }   
                    $("#frame").trigger("create");
                    loaded = true;
                }
                else{
                    window.location.hash="createPoll";
                }
             });
        }        
    });


    //modal stuff below

