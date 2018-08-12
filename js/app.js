var app = angular.module("app", ["ngRoute", '$http'])
    .config(($routeProvider, $locationProvider) => {
        $locationProvider.html5Mode(true);

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
            .when('/cadastro/', {
                redirectTo : '/cadastro/empresa'
            })
            .when('/cadastro/:opt', {
                templateUrl: "views/content.html"
            })
            .otherwise({redirectTo : '/home'});

        });