(function () {
    "use strict";

    angular.module('app').service('http', function ($http) {
        let serverUrl = "http://192.168.15.24:8000";
        let apiUrl = serverUrl+"/api";
        return {
            get: (url, header=null) => {
                return $http.get(apiUrl+url, header)
            },
            post: (url, data, header) => {
                return $http.post(apiUrl+url, data, header)
            },
            put: (url, data, header) => {
                return $http.put(apiUrl+url, data, header)
            },
            delete: (url, data, header) => {
                return $http.delete(apiUrl+url, data, header)
            },
            apiUrl: url => apiUrl+url,
            serverUrl: url => serverUrl+url
        }
    });
})();