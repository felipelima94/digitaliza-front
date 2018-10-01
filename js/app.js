var app = angular.module("app", ["ngRoute", "ngMaterial", 'ngMessages', 'ui.utils.masks', 'idf.br-filters'])
    .config(($routeProvider, $locationProvider, $mdThemingProvider) => {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/files', {
                templateUrl: 'views/files.html'
            })
            .when('/files/:pasta', {
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
            
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('orange')
                .warnPalette('red');
        });