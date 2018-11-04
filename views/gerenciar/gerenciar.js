angular.module('app').controller('gerenciadorController', 
    ($scope, $location, $routeParams, auth) => {

        auth.auth();

        if($routeParams.opt == "empresa") {
            auth.getUser().then(data => {
                if(data.master < 1)
                    $location.url('/files')
                else
                $scope.form = { url: '/views/gerenciar/empresa/gerenciar-empresa.tpl.html'}
            })

        } else if($routeParams.opt == "usuarios"){
            auth.getUser().then(data => {
                if(data.master < 1)
                    $location.url('/files')
                else
                $scope.form = { url: '/views/gerenciar/usuarios/gerenciar-usuarios.tpl.html'}
            })

        } else if($routeParams.opt == "conta") {
            $scope.form = { url: '/views/gerenciar/conta/gerenciar-conta.tpl.html'}
        }
        else {
            $scope.form = { url: '/views/gerenciar/empresa/gerenciar-empresa.tpl.html'}

        }

        $scope.goToFiles = () => {
            $location.url('/files')
        }
    })