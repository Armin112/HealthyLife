function AdminController($scope,$location, $http, $rootScope, $timeout){
    console.log("Hello from admin controller");

    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
    };
    var curr_blog_id = $location.search().id;

    var init = function(){ 
        get_all_users();
        get_all_blogs();
        get_single_blog();
        get_all_diseases();
        get_single_disease();
        get_all_drugs();
        get_single_drug();
    }

    //GET ALL USERS
    var get_all_users = function (){
        $http.get('/admin/all_users', config).then(function(response){
            $scope.users = response.data;
        }),function(error){
            alert(error.status);
        }
    };

    //GET ALL BLOG POSTS
    var get_all_blogs = function (){
        $http.get('/admin/all_blogs', config).then(function(response){
            $scope.blogs = response.data;
        }),function(error){
            alert(error.status);
        }
    };

    //GET SINGLE BLOG POST
    var get_single_blog = function (){
        $http.get('/admin/single_blog/'+curr_blog_id).then(function(response){
            $scope.single_blog = response.data; 
          }),function(error){
            alert(error.status);
          }
      };

      //GET SINGLE DISEASE
      var get_single_disease = function (){
        $http.get('/admin/single_disease/'+curr_blog_id).then(function(response){
            $scope.single_disease = response.data; 
          }),function(error){
            alert(error.status);
          }
      };

    //GET ALL DISEASES
    var get_all_diseases = function (){
        $http.get('/admin/all_diseases', config).then(function(response){
            $scope.diseases = response.data;
        }),function(error){
            alert(error.status);
        }
    };

    //GET SINGLE DRUG
    var get_single_drug = function (){
        $http.get('/admin/single_drug/'+curr_blog_id).then(function(response){
            $scope.single_drug = response.data; 
          }),function(error){
            alert(error.status);
          }
      };

    //GET ALL DRUGS
    var get_all_drugs = function (){
        $http.get('/admin/all_drugs', config).then(function(response){
            $scope.drugs = response.data;
        }),function(error){
            alert(error.status);
        }
    };

    init();

    //DELETE SINGLE USER
    $scope.delete_user = function(id){
        $http.delete('/admin/delete_user/'+id, config).then(function(response){
            get_all_users();
            $scope.message_success = "You are successfully removed user from your site.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
            console.log(error);
        });
    }

    //ADD SINGLE BLOG POST
    $scope.add_blog = function(blog){
        $http.post('/admin/add_blog', blog, config).then(function(response){
            $scope.blog = null;
            $scope.message_success = "Congratulations, you are successfully added new blog post.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
            console.log(error);
        });
    }
    

    //DELETE SINGLE BLOG POST
    $scope.delete_blog = function(id){
        $http.delete('/admin/blog_delete/'+id, config).then(function(response){
            get_all_blogs();
            $scope.message_success = "You are successfully removed blog post from your site.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
            $timeout(function(){ 
                $scope.message_success = "";
                },3000);       
        }, function(error){
            console.log(error);
        });
    }

    //EDIT SINGLE BLOG POST
    $scope.edit_blog = function(blog){
        $http.put('/admin/blog_edit/'+curr_blog_id, blog,config).then(function(response){
            $scope.message_success = "Congratulations, you are successfully updated your blog post.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
          console.log(error);
        });
      }

    //ADD SINGLE DISEASE
    $scope.add_disease = function(disease){
        $http.post('/admin/add_disease', disease, config).then(function(response){
            $scope.disease = null;
            $scope.message_success = "Congratulations, you are successfully added new disease.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
            console.log(error);
        });
    }

    //DELETE SINGLE DISEASE
    $scope.delete_disease = function(id){
        $http.delete('/admin/disease_delete/'+id, config).then(function(response){
            get_all_diseases();
            $scope.message_success = "You are successfully removed disease from your site.";
            $timeout(function(){ 
                $scope.message_success = "";
                },3000);      
        }, function(error){
            console.log(error);
        });
    }

    //EDIT SINGLE DISEASE
    $scope.edit_disease = function(disease){
        $http.put('/admin/disease_edit/'+curr_blog_id, disease,config).then(function(response){
            $scope.message_success = "Congratulations, you are successfully updated your disease.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
          console.log(error);
        });
      }

    //ADD SINGLE DRUG
    $scope.add_drug = function(drug){
        $http.post('/admin/add_drug', drug, config).then(function(response){
            $scope.drug = null;
            $scope.message_success = "Congratulations, you are successfully added new drug.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
            console.log(error);
        });
    }

    //DELETE SINGLE DRUG
    $scope.delete_drug = function(id){
        $http.delete('/admin/drug_delete/'+id, config).then(function(response){
            get_all_drugs();
            $scope.message_success = "You are successfully removed drug from your site.";
            $timeout(function(){ 
                $scope.message_success = "";
                },3000);      
        }, function(error){
            console.log(error);
        });
    }

    //EDIT SINGLE DRUG
    $scope.edit_drug = function(drug){
        $http.put('/admin/drug_edit/'+curr_blog_id, drug,config).then(function(response){
            $scope.message_success = "Congratulations, you are successfully updated your drug.";
            $timeout(function(){ 
                $scope.message_success = "";
              },3000);
        }, function(error){
          console.log(error);
        });
      }
}