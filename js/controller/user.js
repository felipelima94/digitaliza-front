(function () {
    "use strict";
    app.controller('userControll', function($scope, http, auth){
        $scope.user = {};
        auth.getUser().then( data => {
            $scope.user = data;
            $scope.user.pic = http.serverUrl($scope.user.pic);
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