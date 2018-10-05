(function () {
    "use strict";

    angular.module('app').service('auth', function ($http, $location, http) {
        let headers = {
                headers: {
                    "Accept": 'application/json',
                    "Authorization": JSON.parse(sessionStorage.getItem('token')),
                }
            }
        return {
            get: (url) => {
                return http.get(url, headers)
            },
            post: (url, data) => {
                return http.post(url, data, headers)
            },
            put: (url, data) => {
                return http.put(url, data, headers)
            },
            delete: (url, data) => {
                return http.delete(url, data, headers)
            },
            getUser: function () {
                return http.post('/get-details', null, headers)
                .then( response => {
                    return response.data.success;
                }, error => { 
                    sessionStorage.removeItem('token');
                    $location.path('/home');
                    console.error("Error :: Unauthorised");
                })
            },
            logout : () => {
                return http.post('/logout', null, headers).then( data => {
                    sessionStorage.removeItem('token');
                    $location.path('/home');
                }).catch(err => {
                    console.error("Error", err);
                });
            },
            auth: () => {
                http.post('/get-details', null, headers)
                .then( response => {
                    console.log(headers)
                    $location.path('/files');
                }, error => { 
                    sessionStorage.removeItem('token');
                })
            },
            headers: () => headers
        };
    });
})();