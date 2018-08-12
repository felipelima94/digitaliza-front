app.controller("starting", ($scope, $routeParams, $http) => {
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

    $scope.goHome = () => {
        window.location.href="/home";
    }

    $scope.formEmpresa = {};
    $scope.submitEmpresa = () => {
        // verificar Razão social
        // Nome Fantasia 
        // CNPJ
        // Inscrição Estadual
        $http.get("/empresas").then((response) => {
            if(response.razaoSocial == $scope.formEmpresa.razaoSocial) {
                log("Razão social já está cadastrada");
            } else if( response.nomeFantasia == $scope.formEmpresa.nomeFantasia){
                log("Nome fantasia já está em uso");
            } else if(response.cnpj == $scope.formEmpresa.cnpj) {
                log("CNPJ já está em uso");
            } else if(response.inscricaoEstadual == $scope.formEmpresa.inscricaoEstadual && $scope.formEmpresa.inscricaoEstadual != null){
                log("Inscrição estadual já está em uso");
            } else {
                sessionStorage.setItem("empresa", JSON.stringify($scope.formEmpresa));
                window.location.href="/cadastro/representante";
            }
        })
    }

    $scope.formUser = {}
    $scope.registerUser = () => {
        if($scope.formUser.senha != $scope.formUser.verifySenha) {
            console.log("senha incorreta");
        } else {
            //verificar usuario;
            $http.get("usuario/"+$scope.formUser.usuario).then((response) => {
                if(response == false) {
                    let empresa = sessionStorage.getItem("empresa");
                    $http.post("empresa", empresa).then((response) => {
                        $http.post("usuario", $scope.formUser).then(() => {
                            console.log("sucesso");
                        })
                    })
                }
            }) // end of get request
        }
    }

    console.log("$scope", $scope);

    $scope.estados = [
        {name: "Acre", sigla: ""},
        {name: "Alagoas", sigla: ""},
        {name: "Amapá", sigla: ""},
        {name: "Amazonas", sigla: ""},
        {name: "Bahia", sigla: ""},
        {name: "Ceará", sigla: ""},
        {name: "Distrito Federal", sigla: ""},
        {name: "Espírito Santo", sigla: ""},
        {name: "Goiás", sigla: ""},
        {name: "Maranhão", sigla: ""},
        {name: "Mato Grosso", sigla: ""},
        {name: "Mato Grosso do Sul", sigla: ""},
        {name: "Minas Gerais", sigla: ""},
        {name: "Pará", sigla: ""},
        {name: "Paraíba", sigla: ""},
        {name: "Paraná", sigla: ""},
        {name: "Pernambuco", sigla: ""},
        {name: "Piauí", sigla: ""},
        {name: "Rio de Janeiro", sigla: ""},
        {name: "Rio Grande do Norte", sigla: ""},
        {name: "Rio Grande do Sul", sigla: ""},
        {name: "Rondônia", sigla: ""},
        {name: "Roraima", sigla: ""},
        {name: "Santa Catarina", sigla: ""},
        {name: "São Paulo", sigla: ""},
        {name: "Sergipe", sigla: ""},
        {name: "Tocantins", sigla: ""}
    ]
})