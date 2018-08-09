angular.module("app")
.controller("CadastroController", ($scope,$routeParams) => {
    if($routeParams == "cadastro") {
        $scope.template.url = "../../views/model/cadastro.html";
    }
});