function IndexController($scope, $http){
    console.log("Hello from dashboard controller");

    var init = function(){ 
        get_all_blogs(); 
      }

    var get_all_blogs = function (){
        $http.get('/admin/all_blogs').then(function(response){
          $scope.blogs = response.data;
          console.log(response.data);
        }),function(error){
          alert(error.status);
        }
      };
    
    init();
}