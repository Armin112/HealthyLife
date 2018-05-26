function AdminController($scope,$location, $http, $rootScope, $timeout){
    console.log("Hello from admin controller");

    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
    };

    var init = function(){ 
        get_all_users();
        get_all_blogs();
        get_all_diseases();
    }

    var get_all_users = function (){
        $http.get('/admin/all_users', config).then(function(response){
            $scope.users = response.data;
        }),function(error){
            alert(error.status);
        }
    };

    var get_all_blogs = function (){
        $http.get('/admin/all_blogs', config).then(function(response){
            $scope.blogs = response.data;
        }),function(error){
            alert(error.status);
        }
    };

    var get_all_diseases = function (){
        $http.get('/admin/all_diseases', config).then(function(response){
            $scope.diseases = response.data;
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

    $scope.add_blog = function(blog){
        $http.post('/admin/add_blog', blog, config).then(function(response){
            $scope.blog = null;
            $scope.message_success = "Congratulations, you are successfully added new blog post.";
        }, function(error){
            console.log(error);
        });
    }

    $scope.delete_blog = function(id){
        $http.delete('/admin/blog_delete/'+id, config).then(function(response){
            get_all_blogs();
            $scope.message_success = "You are successfully removed blog post from your site.";
            $timeout(function(){ 
                $scope.message_success = "";
                },3000);       
        }, function(error){
            console.log(error);
        });
    }

    $scope.add_disease = function(disease){
        $http.post('/admin/add_disease', disease, config).then(function(response){
            $scope.disease = null;
            $scope.message_success = "Congratulations, you are successfully added new disease.";
        }, function(error){
            console.log(error);
        });
    }

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
}