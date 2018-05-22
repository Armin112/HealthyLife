app.controller('headerCtrl', function($scope, $location, $http, $timeout){

  
    $scope.logedtext = "LOGIN";

    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/login', credentials).then(function(response){
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