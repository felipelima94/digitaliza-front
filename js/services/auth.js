(function () {
    "use strict";

    angular.module('app').service('auth', function ($http) {
        let urlApi = 'http://localhost:8000/api';
        return {
            getUser: function () {
                return $http.post(urlApi+'/get-details', null, {headers: {
                    "Accept": 'application/json',
                    "Authorization": JSON.parse(sessionStorage.getItem('token')),
                }}).then( response => {
                    return response.data.success;
                }, error => { 
                    sessionStorage.removeItem('token');
                    window.location.href="/home";
                    console.error("Error :: Unauthorised");
                })
            },
            logout : () => {
                $http({
                    method: 'POST',
                    url: urlApi+'/logout',
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
            },
            auth: () => {
                return $http.post(urlApi+'/get-details', null, {headers: {
                    "Accept": 'application/json',
                    "Authorization": JSON.parse(sessionStorage.getItem('token')),
                }}).then( response => {
                    window.location.href="/files";
                }, error => { 
                    sessionStorage.removeItem('token');
                })
            }
        };
    });
})();