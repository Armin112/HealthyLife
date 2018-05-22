function RegisterController($scope,$location, $http, $timeout){
    console.log("Hello from controller");

    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
      };

    $scope.add_user = function(){
        $http.post('/register', $scope.user).then(function(response){
          $scope.user = null;
          $scope.message_success = "Congratulations, you are successfully created your profile. You will be redirected to login page now.";
          $timeout(function(){ 
            $location.path("/login"); 
          },3000);
        }, function(error){
          console.log(error);
        });
      }

      
      
}