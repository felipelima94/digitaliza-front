angular.module('app').controller('gerenciarConta',
    function($scope, sessionStore, auth, $route, http, $mdToast) {

        let setForm = () => {
            $scope.sufix = sessionStore.getEmpresa().sufix+'-'
            $scope.formUser = angular.copy(sessionStore.getUser())

            let username = $scope.formUser.user_name;
            username = username.split('-')[0]+'-'
            if(username == $scope.sufix)
                $scope.formUser.user_name = $scope.formUser.user_name.substring($scope.sufix.length)
            
                $scope.formUser.password   = ''
            $scope.formUser.c_password = ''
        }

        if(!(sessionStore.getUser().id > 0)) {
            auth.getUser().then(data => {
                sessionStore.setUser(data)
                
                auth.get('/empresa-by-user/'+sessionStore.getUser().id).then(response => {
                    
                    data = response.data;
                    sessionStore.setEmpresa(data)
                    setForm()
                })
            })
        } else {
            setForm()
        }

        $scope.save = function () {
            headers ={headers: {
				"Authorization": JSON.parse(sessionStorage.getItem('token')),
				"Content-type": undefined,
			}}

            let userForm = angular.copy($scope.formUser)
            userForm.user_name = $scope.sufix+userForm.user_name

            let data = new FormData();
            data.append('first_name', userForm.first_name)
            data.append('last_name', userForm.last_name)
            data.append('user_name', userForm.user_name)
            data.append('password', userForm.password)
            data.append('c_password', userForm.c_password)
            data.append('pic', $('#profile_pic')[0].files[0])
            
            http.post('/user/'+userForm.id, data, headers).then(response => {
                $scope.successToast()
                $route.reload()
            }, error => {
                console.error(error);
                $scope.errorToast()
            })
        }

        
		$scope.successToast = function() {
		
			$mdToast.show(
			  $mdToast.simple()
				.textContent('Salvo com sucesso!')
				.position('bottom right ')
				.hideDelay(5000)
			);
		};
        
		$scope.errorToast = function() {
		
			$mdToast.show(
			  $mdToast.simple()
				.textContent('Erro ao salvar!')
				.position('bottom right ')
				.hideDelay(5000)
			);
		};

    })
