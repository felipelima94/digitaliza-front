app.controller("CadastroController", ($scope, $routeParams) => {
    console.log($routeParams);
    if($routeParams.opt == "cadastro") {
        $scope.template = {
            url: "../../views/modules/cadastro.html"
        };
    }
    else {
        $scope.template = {
            url: null
        };
    }
});