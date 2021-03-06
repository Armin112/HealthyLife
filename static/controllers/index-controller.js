function IndexController($scope, $http, $location){
    console.log("Hello from dashboard controller");
    var config = {headers:  {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': 'application/json;odata=verbose',
      "JWT" : localStorage.getItem('user')
      }
    };
    var num_users = "";
    var is_unliked = false;
    var is_liked = false;
    var num_drugs = "";
    var suggested_drug_id = "";
    var num_diseases = "";
    var searched_key = $location.search().key;
    $scope.searched_key = searched_key;
    var init = function(){ 
        get_all_blogs();
        get_users(); 
      
        get_all_diseases();
        get_all_users();
        get_all_drugs();
        get_searched_diseases();
       
      }
    
    var get_all_blogs = function (){
        $http.get('/admin/all_blogs').then(function(response){
          $scope.blogs = response.data;
          console.log($scope.blogs.id);
        }),function(error){
          alert(error.status);
        }
      };

    var get_all_drugs = function (){
        $http.get('/admin/all_drugs').then(function(response){
          $scope.drugs = response.data;
          $scope.num_of_drugs = $scope.drugs.length;
        }),function(error){
          alert(error.status);
        }
    };

    var get_all_diseases = function (){
      $http.get('/admin/all_diseases').then(function(response){
        $scope.diseases = response.data;
        $scope.num_of_diseases = $scope.diseases.length;
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
 
    var get_all_users = function (){
      $http.get('/admin/all_users', config).then(function(response){
          $scope.users = response.data;
          $scope.num_of_users = $scope.users.length;
      }),function(error){
          alert(error.status);
      }
  };

  var get_searched_diseases = function (){
    $http.get('/admin/get_searched_diseases/'+searched_key).then(function(response){
      $scope.searched_diseases = response.data; 
    }),function(error){
      alert(error.status);
    }
};




  init();

}