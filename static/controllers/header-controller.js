app.controller('headerCtrl', function($scope, $location, $http, $timeout){
    var config = {headers:  {
        'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
        'Accept': 'application/json;odata=verbose',
        "JWT" : localStorage.getItem('user')
        }
      };

var check_admin = "";
var curr_blog_id = $location.search().id;
var init = function(){
    get_users();
   
   
}


var get_users = function (){
    var current_user = localStorage.getItem('logged_user');
    $http.get('/users/myprofile/'+current_user, config).then(function(response){
        $scope.users = response.data;
    }),function(error){
        alert(error.status);
    }
};

$scope.logedtext = "LOGIN";
$scope.check_login = function(){
    if(localStorage.getItem('user')){
        return true;
    }
    return false;
}

$scope.is_admin = function(){
   var if_admin = localStorage.getItem('logged_user');
    if(if_admin == 'admin'){
        return true;
    }
    return false;
}

$scope.login = function(credentials){
    $http.post('/login', credentials).then(function(response){
        localStorage.setItem('logged_user', credentials.username);
        localStorage.setItem('user',response.data.token);
        $scope.logedin = true;
            $location.path("/index"); 
        $scope.logedtext = "LOGOUT";
    }),function(error){
        console.log(error);
    }
}

$scope.logout = function(){
    localStorage.clear();
    $scope.logedin = false;
    $scope.logedtext = "LOGIN";
}


init();

$scope.getClass = function (path) {
    if (path == '/index' && $location.path() == '/') return 'active';
    return ($location.path() === path) ? 'active' : '';
},

$scope.openNavigationDrawer = function(){
    if ($scope.mobileNavigationOpen == 'nav-open'){
        $scope.mobileNavigationOpen = '';
    }else{
        $scope.mobileNavigationOpen = 'nav-open';
    }
    
}
$scope.menuItemClicked = function(){
    $scope.mobileNavigationOpen = '';
}

});