function BlogController($scope, $http, $location){
    console.log("Hello from blog controller");
    var config = {headers:  {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': 'application/json;odata=verbose',
      "JWT" : localStorage.getItem('user')
      }
    };
    var curr_blog_id = $location.search().id; 
    var init = function(){
      
        get_all_blogs();
        get_single_blog();
        get_users();
        get_comments();
      }

    var get_all_blogs = function (){
        $http.get('/admin/all_blogs').then(function(response){
          $scope.blogs = response.data;
          console.log(response.data);
        }),function(error){
          alert(error.status);
        }
      };

      var get_single_blog = function (){
        $http.get('/admin/single_blog/'+curr_blog_id).then(function(response){
            $scope.single_blog = response.data;
            console.log(curr_blog_id);
           
          }),function(error){
            alert(error.status);
          }
      };
      var get_users = function (){
        $http.get('/users/myprofile', config).then(function(response){
          $scope.users = response.data;
        
        }),function(error){
          alert(error.status);
        }
      };
    
      var get_comments = function (){
        $http.get('/admin/get_comments', config).then(function(response){
          $scope.comments = response.data;
         
          get_comments();
        }),function(error){
          alert(error.status);
        }
      };
    

      init();
  
     
      $scope.add_comment = function(user){
        $http.post('/admin/add_comment', user,  config).then(function(response){
          $scope.user = null;   
          $scope.message_success = "Congratulations, you are successfully added new comment on this post.";
        }, function(error){
          console.log(error);
        });
}

}