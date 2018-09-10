(function () {
    "use strict";
    app.controller('userControll', function($scope, $http, auth){
        $scope.user = {};
        auth.getUser().then( data => {
            $scope.user = data;
        }). catch(err => {
            sessionStorage.removeItem('token');
            window.location.href="/home";
            console.error("Error :: Unauthorised");
        })
            
        $scope.logout = () => {
            auth.logout();
        };

    });
})();