var app = angular.module("app", ["ngRoute"])
    .config(($routeProvider, $locationProvider) => {

        $routeProvider
            .when('/files', {
                templateUrl: 'views/files.html'
            })
            .when('/cadastrar', {
                templateUrl: 'views/cadastrar.html'
            })
            .otherwise({redirectTo : '/files'});

        $locationProvider.html5Mode(true);
        });