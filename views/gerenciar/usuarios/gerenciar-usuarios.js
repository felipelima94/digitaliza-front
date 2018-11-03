angular.module('app').controller('gerenciarUsuarios',
($scope, auth, $location, sessionStore, date_Helper, $mdDialog) => {
        
        $scope.users = []
        let getUsers = () => {
            auth.get('/usuarios-by-empresa/'+sessionStore.getEmpresa().empresa_id).then(response => {
                $scope.users = response.data
                $scope.users.map(user => {
                    user.statusView = user.status == 1 ? true : false,
                    user.masterView = user.master == 1 ? true : false,
                    user.modify     = date_Helper.timestampToDate(user.updated_at)
                })
                console.log($scope.user)
            })
        }
        
        
        if(!(sessionStore.getEmpresa().empresa_id > 0)) {
            auth.getUser().then(data => {
                sessionStore.setUser(data)
                
                auth.get('/empresa-by-user/'+sessionStore.getUser().id).then(response => {
                    
                    data = response.data;
                    sessionStore.setEmpresa(data)
                    getUsers()
                })
            })
        } else {
            getUsers()
        }

        $scope.regUser = function(ev, user=null) {
            $mdDialog.show({
                controller: registrationUserController,
                templateUrl: '/views/gerenciar/usuarios/registrationUser.tpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            function registrationUserController($scope) {
                $scope.formUser = user;
            }
        };

        $scope.arrowOrder = "↓"
        $scope.myOrderByName = 'name';
        $scope.orderByName = function(x) {
            if(x == 'name'){
                $scope.arrowOrder = "↑"
                $scope.myOrderByName = '-name';
            } else {
                $scope.arrowOrder = "↓"
                $scope.myOrderByName = 'name';
            }
        }
        
    })