app.controller('userControll', function($scope, $http, $mdSidenav, $log){
    
    $http({
        method: 'POST',
        url: 'http://localhost:8000/api/get-details',
        headers: {
            "Accept": 'application/json',
            "Authorization": JSON.parse(sessionStorage.getItem('token')),
        }
    }).then( data => {
        $scope.user = data.data.success;
    }).catch(err => {
        window.location.href="/home";
        console.error("Error :: Unauthorised");
    });
        
    $scope.logout = () => {
        $http({
            method: 'POST',
            url: 'http://localhost:8000/api/logout',
            headers: {
                "Accept": 'application/json',
                "Authorization": JSON.parse(sessionStorage.getItem('token')),
            }
        }).then( data => {
            sessionStorage.removeItem('token');
            window.location.href="/home"
        }).catch(err => {
            console.error("Error", err);
        });
    }

});