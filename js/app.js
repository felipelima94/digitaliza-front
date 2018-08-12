var app = angular.module("app", ["ngRoute"])
    .config(($routeProvider, $locationProvider) => {

        $routeProvider
            .when('/files', {
                templateUrl: 'views/files.html'
            })
            .when('/cadastrar', {
                templateUrl: 'views/cadastrar.html'
            })
            .when('/home', {
                templateUrl: "views/content.html"
            })
            .when('/cadastro/:opt', {
                templateUrl: "views/content.html"
            })
            .otherwise({redirectTo : '/home'});

        $locationProvider.html5Mode(true);
        });