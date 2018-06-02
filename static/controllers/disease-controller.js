function DiseaseController($scope, $http, $location){
    var config = {headers:  {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': 'application/json;odata=verbose',
      "JWT" : localStorage.getItem('user')
      }
    };

    var curr_disease_id = $location.search().id; 
    var user_post_comment ="";
    var user_unliked = false;
    var user_liked = false;
    var user_liked_1 = false;
    var user_unliked_1 = false;
    var init = function(){
        get_all_diseases();
        get_single_disease();
        get_comments();
        get_all_unlikes();
        get_all_likes();
        get_all_likes_check();
        get_all_unlikes_check();
        get_user_post_comment();
      }

    var get_all_diseases = function (){
        $http.get('/admin/all_diseases').then(function(response){
          $scope.diseases = response.data;
        }),function(error){
          alert(error.status);
        }
    };

    var get_single_disease = function (){
      $http.get('/admin/single_disease/'+curr_disease_id).then(function(response){
          $scope.single_disease = response.data; 
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

    var get_all_unlikes = function (){
      $http.get('/admin/all_unlikes', config).then(function(response){
          $scope.unlikes = response.data.length;
          console.log($scope.unlikes);
      }),function(error){
          alert(error.status);
      }
    };
    
    var get_all_likes = function (){
      $http.get('/admin/all_likes', config).then(function(response){
        $scope.all_likes = response.data;
          $scope.likes = response.data.length;
      }),function(error){
          alert(error.status);
      }
    };

    var get_all_likes_check = function (){
      $http.get('/admin/all_likes_check', config).then(function(response){
          $scope.likes_check = response.data.length;
      
          if($scope.likes_check != 0)
          {
            user_liked = true;
          }
      }),function(error){
          alert(error.status);
      }
    };

    var get_all_unlikes_check = function (){
      $http.get('/admin/all_unlikes_check', config).then(function(response){
          $scope.unlikes_check = response.data.length;
          console.log($scope.unlikes);
          if($scope.unlikes_check != 0)
          {
            user_unliked = true;
          }
      }),function(error){
          alert(error.status);
      }
    };


    init();

    $scope.unlike_drug = function(disease){
      suggested_drug_id = disease.suggested_drug.substring(0,24);
      get_all_diseases();  
      get_all_unlikes();
      user_unliked = true;
      $scope.message_success = "Congratulations, you are successfully rated drug.";
      $http.post('/admin/unlike_drug', disease, config).then(function(response){
       
      }, function(error){
          console.log(error);
      });
  }


  
  $scope.like_drug = function(disease){
    suggested_drug_id = disease.suggested_drug.substring(0,24);
    get_all_diseases();  
    get_all_likes();
    user_liked = true;
    $scope.message_success = "Congratulations, you are successfully rated drug.";
    $http.post('/admin/like_drug', disease, config).then(function(response){
      
    }, function(error){
        console.log(error);
    });
    console.log(user_liked_1);
  }
  
  $scope.is_user_unliked = function(){
    if(user_unliked == true)
    return true;
    else
    return false;
  }

  $scope.is_user_liked = function(){
    if(user_liked == true)
    return true;
    else
    return false;
  }


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