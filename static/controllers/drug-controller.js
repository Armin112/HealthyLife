function DrugController($scope, $http, $location, $timeout){
    var config = {headers:  {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': 'application/json;odata=verbose',
      "JWT" : localStorage.getItem('user')
      }
    };

    var curr_drug_id = $location.search().id; 
    var user_post_comment ="";
    var init = function(){
        get_all_drugs();
        get_single_drug();
        get_comments();
        get_users();
        get_user_post_comment();
        get_all_drugs_vegetables();
        get_all_drugs_herbs();
        get_all_drugs_fruits();

      }

      var get_users = function (){
        var current_user = localStorage.getItem('logged_user');
        $http.get('/users/myprofile/'+current_user, config).then(function(response){
            $scope.users = response.data;
        }),function(error){
            alert(error.status);
        }
    };
    

    var get_all_drugs = function (){
        $http.get('/admin/all_drugs').then(function(response){
          $scope.drugs = response.data;
        }),function(error){
          alert(error.status);
        }
    };

    var get_all_drugs_herbs = function (){
      $http.get('/admin/all_drugs_herbs').then(function(response){
        $scope.herb_drugs = response.data;
      }),function(error){
        alert(error.status);
      }
  };

  var get_all_drugs_fruits = function (){
    $http.get('/admin/all_drugs_fruits').then(function(response){
      $scope.fruit_drugs = response.data;
    }),function(error){
      alert(error.status);
    }
};

var get_all_drugs_vegetables = function (){
  $http.get('/admin/all_drugs_vegetables').then(function(response){
    $scope.vegetable_drugs = response.data;
  }),function(error){
    alert(error.status);
  }
};

    var get_single_drug = function (){
      $http.get('/admin/single_drug/'+curr_drug_id).then(function(response){
          $scope.single_drug = response.data; 
        }),function(error){
          alert(error.status);
        }
    };

    var get_comments = function (){
      $http.get('/admin/get_comments', config).then(function(response){
        $scope.comments = response.data;
      }),function(error){
        alert(error.status);
      }
    };

    var get_user_post_comment = function (){
      $http.get('/admin/user_post_comment', config).then(function(response){
        $scope.user_comments = response.data;
        user_post_comment = response.data;
      }),function(error){
        alert(error.status);
      }
    };


    init();

    $scope.add_comment = function(user){
      $http.post('/admin/add_comment', user,  config).then(function(response){
        get_comments();
        get_user_post_comment();
        $scope.user = null;   
        $scope.message_success = "Congratulations, you are successfully added new comment on this post.";
        $timeout(function(){ 
          $scope.message_success = "";
        },3000);
      }, function(error){
        console.log(error);
      });
    }

    $scope.delete_comment = function(id){
      $http.delete('/admin/comment_delete/'+id, config).then(function(response){
        get_comments();
        get_user_post_comment();
          $scope.message_success = "You are successfully removed comment from this post.";
          $timeout(function(){ 
              $scope.message_success = "";
            },3000); 
      }, function(error){
        console.log(error);
      });
    }

    $scope.edit_comment = function(user_comment, id){
      $http.put('/admin/comment_edit/'+id, user_comment,config).then(function(response){
          $scope.message_success = "Congratulations, you are successfully updated your comment.";
          $timeout(function(){ 
            $scope.message_success = "";
          },3000);
          get_comments();
          get_user_post_comment();
      }, function(error){
        console.log(error);
      });
    }
}