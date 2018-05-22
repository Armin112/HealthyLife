function MyProfileController($scope,$location, $http, $rootScope){
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
        $http.get('/users/myprofile', config).then(function(response){
          $scope.users = response.data;
        }),function(error){
          alert(error.status);
        }
      };
    
      init();

      $scope.edit_user = function(user){
        $http.put('/users/edituser', user,config).then(function(response){
            $scope.message_success = "Congratulations, you are successfully updated your profile.";
          get_users();
        }, function(error){
          console.log(error);
        });
      }

}