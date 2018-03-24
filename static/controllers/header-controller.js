app.controller('headerCtrl', function($scope, $location){

 $scope.onako = $location.path();
    $scope.logedtext = "LOGIN";
    $scope.login = function(){
        $scope.logedin = true;
        $scope.logedtext = "LOGOUT";
    }

    $scope.logout = function(){
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