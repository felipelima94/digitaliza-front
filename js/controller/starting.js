app.controller("starting", ($scope, $routeParams) => {
    console.log($routeParams);
    if($routeParams.opt == "representante") {
        $scope.template = {
            title: "Cadastro de Representante",
            url: "/views/cadastro/cadastro.html"
        };
    } else if($routeParams.opt == "empresa"){
        $scope.template = {
            title: "Cadastro de Empresa",
            url: "/views/cadastro/empresa.html"
        }
    }
    else {
        $scope.template = {
            title: "Sobre a Empresa",
            url: "/views/home.html"
        };
    }
})