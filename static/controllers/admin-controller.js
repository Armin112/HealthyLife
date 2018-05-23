function AdminController($scope,$location, $http, $rootScope){
    console.log("Hello from admin controller");

    
    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
      };
  
      var init = function(){
      
        get_all_users();
      
      
      }

    var get_all_users = function (){
        $http.get('/admin/all_users', config).then(function(response){
          $scope.users = response.data;
          console.log(response.data);
        }),function(error){
          alert(error.status);
        }
      };

      init();

      $scope.delete_user = function(id){
        $http.delete('/admin/delete_user/'+id, config).then(function(response){
            get_all_users();
            $scope.message_success = "You are successfully removed user from your site.";
        }, function(error){
          console.log(error);
        });
      }

}