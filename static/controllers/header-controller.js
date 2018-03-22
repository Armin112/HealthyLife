app.controller('headerCtrl', function($scope, $location){

    $scope.login = function(){
        $scope.logedin = true;
    }

    $scope.logout = function(){
        $scope.logedin = false;
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