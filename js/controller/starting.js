angular.module('app')
.controller("starting", ($scope, $routeParams, $http, $mdDialog) => {
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
        $.post("http://localhost:8000/api/verify/empresa", $scope.formEmpresa).then( response => {
            console.log("empresa", response);
            if(response.length > 0) {
                alert(response)
            }
        }).catch(function (err) { console.log(err)});
        
        // .success( response => {
        //     sessionStorage.setItem("empresa", JSON.stringify($scope.formEmpresa));
        //     window.location.href="/cadastro/representante";
        // }).error(error => {
        //     alert("esta empresa já existe");
        // })

        // $http.get("/empresas").then((response) => {
        //     if(response.razaoSocial == $scope.formEmpresa.razaoSocial) {
        //         console.log("Razão social já está cadastrada");
        //     } else if( response.nomeFantasia == $scope.formEmpresa.nomeFantasia){
        //         console.log("Nome fantasia já está em uso");
        //     } else if(response.cnpj == $scope.formEmpresa.cnpj) {
        //         console.log("CNPJ já está em uso");
        //     } else if(response.inscricaoEstadual == $scope.formEmpresa.inscricaoEstadual && $scope.formEmpresa.inscricaoEstadual != null){
        //         console.log("Inscrição estadual já está em uso");
        //     } else {
                // sessionStorage.setItem("empresa", JSON.stringify($scope.formEmpresa));
                // window.location.href="/cadastro/representante";
        //     }
        // })
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

    $scope.showAlert = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

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