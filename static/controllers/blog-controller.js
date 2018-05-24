function BlogController($scope, $http, $location){
    console.log("Hello from blog controller");
    var curr_blog_id = $location.search().id; 
    var init = function(){
      
        get_all_blogs();
        get_single_blog();
      
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
      init();
}