function MyProfileController($scope,$location, $http, $rootScope, $timeout){
    console.log("Hello from controller");

    
    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
      };
  
      var init = function(){
      
        get_users();
      
      
      }

      var get_users = function (){
        var current_user = localStorage.getItem('logged_user');
        $http.get('/users/myprofile/'+current_user, config).then(function(response){
            $scope.users = response.data;
        }),function(error){
            alert(error.status);
        }
    };
    
      init();

      $scope.edit_user = function(user){
        $http.put('/users/edituser', user,config).then(function(response){
            $scope.message_success = "Congratulations, you are successfully updated your profile.";
            $timeout(function(){ 
              $scope.message_success = "";
            },3000);
          get_users();
        }, function(error){
          console.log(error);
        });
      }

      $scope.edit_password = function(user){
        $http.put('/users/editpassword', user,config).then(function(response){
            $scope.message_success = "Congratulations, you are successfully updated your password.";
            $timeout(function(){ 
              localStorage.clear();
              $scope.logedin = false;
              $scope.logedtext = "LOGIN";
              $location.path("/login"); 
            },2000);
        }, function(error){
          console.log(error);
        });
      }

}