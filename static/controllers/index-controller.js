function IndexController($scope, $http){
    console.log("Hello from dashboard controller");
    var config = {headers:  {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': 'application/json;odata=verbose',
      "JWT" : localStorage.getItem('user')
      }
    };
    var init = function(){ 
        get_all_blogs();
        get_users(); 
      }

    var get_all_blogs = function (){
        $http.get('/admin/all_blogs').then(function(response){
          $scope.blogs = response.data;
          console.log(response.data);
        }),function(error){
          alert(error.status);
        }
      };

      var get_users = function (){
        $http.get('/users/myprofile', config).then(function(response){
            $scope.users_test = response.data;
            console.log(response.data);
        }),function(error){
            alert(error.status);
        }
    };
    
    init();
    console.log("hehe");
}