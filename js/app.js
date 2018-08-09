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
                templateUrl: "views/home.html"
            })
            .when('/home/:opt', {
                templateUrl: "views/home.html",
                controller: "CadastroController"
            })
            .otherwise({redirectTo : '/home'});

        $locationProvider.html5Mode(true);
        });