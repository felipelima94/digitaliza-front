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
                
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

            function registrationUserController($scope, sessionStore, $route) {
                $scope.formUser = angular.copy(user);
                $scope.sufix = sessionStore.getEmpresa().sufix+'-';

                if(user != null) {
                    let username = $scope.formUser.user_name;

                    username = username.split('-')[0]+'-'
                    
                    if(username == $scope.sufix)
                        $scope.formUser.user_name = $scope.formUser.user_name.substring($scope.sufix.length)
                }

                if(user == null) {
                    $scope.formUser = {statusView :true}
                }

                $scope.cancelar = function() {
                    $mdDialog.hide();
                    $scope.formUser = null;
                }

                $scope.save = () => {
                    let userForm = angular.copy($scope.formUser)
                    userForm.user_name = $scope.sufix+userForm.user_name
                    userForm.status = userForm.statusView ? 1 : 0
                    userForm.master = userForm.masterView ? 1 : 0
                    userForm.empresa_id = sessionStore.getEmpresa().empresa_id
                    if(userForm.id == null) {
                        auth.post('/registerUser', userForm).then(response => {
                            $mdDialog.hide();
                            $route.reload()
                        })
                    } else {
                        auth.put('/registerUser/'+userForm.id, userForm).then(response => {
                            $location.url('/gerenciar/usuarios')
                            $mdDialog.hide();
                            $route.reload()
                        })
                    }
                }
            }
        };

        $scope.arrowOrder = "↓"
        $scope.myOrderByName = 'first_name';
        $scope.orderByName = function(x) {
            if(x == 'first_name'){
                $scope.arrowOrder = "↑"
                $scope.myOrderByName = '-first_name';
            } else {
                $scope.arrowOrder = "↓"
                $scope.myOrderByName = 'first_name';
            }
        }
        
    })