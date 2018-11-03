self = this;

angular.module('app')
.controller('managerFiles', function($scope, $routeParams, $mdDialog, http, auth, date_Helper, $location, sessionStore){
	self.headers = {
		headers: {
			"Accept": 'application/json',
			"Authorization": JSON.parse(sessionStorage.getItem('token')),
		}
	}

	self.session = {
		usuario_id: "",
		empresa_id: "",
		storage: "",
	}

	$scope.search = () => {
		let dataForm = { search: $scope.searchField }
		if( $scope.searchField ) {
			console.log("buscando: ", $scope.searchField);
			http.post('/documento/search', dataForm, self.headers).then(response => {
				console.log("data found: ", response)
				docs = response.data

				$scope.files = []
				docs.forEach(doc => {

					let date = doc.updated_at;
					lastUpdate = date_Helper.timestampToDate(date);

					localArmazrnado = doc.local_armazenado.id
					auth.get('/pasta/full-rastro/'+localArmazrnado).then(response => {
						console.log("folder found", response)
						data = response.data;
						$scope.link = "/documentos/";
						data.forEach(pasta => {
							$scope.link += pasta.nome+'/';
						})
						$scope.files.push({
							'type': typeFile(doc.tipo),
							'name': doc.nome_arquivo,
							'author': doc.usuario.first_name,
							'date': lastUpdate,
							'size': getSize(doc.tamanho),
							'link': http.serverUrl($scope.link+doc.nome_arquivo),
							'target': '_blank'
						})
						console.log("files", $scope.files);
					})
				})
			})
		} else {
			$scope.getFolders(self.session.storage)
		}
	}

	// ///////// F O L D E R //////// //
	auth.getUser().then(data => {
		let user = data;
		self.session.usuario_id = user.id;

		sessionStore.setUser(user)
		
		http.get('/empresa-by-user/'+user.id, self.headers).then(response => {
			
			data = response.data;
			sessionStore.setEmpresa(data)
			
			self.session.empresa_id = data.empresa_id;
			let storage = data.storage
			if($routeParams.pasta > 0) {
				storage = $routeParams.pasta
			}
			self.session.storage = storage;
			$scope.getFolders(storage);
		}, error => {
			// window.location.href="/home";
			console.error("Error::Unauthorised");
		})
	});
	// ///////////// C R E A T E  N E W  F O L D E R //////////// //
	$scope.showPrompt = function(ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.prompt()
		  .title('Criar Nova Pasta')
		  .placeholder('Nome da pasta')
		  .ariaLabel('Nome da pasta')
		  .targetEvent(ev)
		  .required(true)
		  .ok('Criar')
		  .cancel('Cancelar');
	
		$mdDialog.show(confirm).then(function(result) {
			let data = {
				nome: result,
				usuario_id: self.session.usuario_id,
				empresa_id: self.session.empresa_id,
				raiz: self.session.storage
			}
			http.post('/pasta', data, self.headers).then(response => {
				data = response.data;
				$location.url("/files/"+data.id);
			}, error => {
				console.error(error);
			})
		}, function() {});
	};
	// $scope.files = [
	//     {
	//         type: typeFile('folder'),
	//         name: 'Pasta 007',
	//         author: 'James Bond',
	//         date: '07/07/1962',
	//         size: '--'
	//     }
	// ];
	$scope.getFolders = (storage) => {
		console.log(storage)
		$scope.rastro = [];
		http.get('/pasta/rastro/'+storage, self.headers)
		.then(response => {
			
			let rastro = response.data;
			rastro.forEach(r => {
				$scope.rastro.push({
					link: '/files/'+r.id,
					nome: r.nome
				})
			})
		})

		$scope.files = []
		http.get('/pasta/'+storage, self.headers)
			.then(response => {
				let folders = response.data;
				
				folders.forEach(folder => {
					lastUpdate = date_Helper.timestampToDate(folder.updated_at);
					$scope.files.push({
						'id': folder.id,
						'link': "/files/"+folder.id,
						'type': typeFile('folder'),
						'name': folder.nome,
						'author': folder.usuario.first_name,
						'date': lastUpdate,
						'size': '--',
						'edit': 'folder'
					})
				})
			})
		getDocumentos(storage);
	}

	//////////// D O C U M E N T ////////////////////
	let getDocumentos = storage => {
		http.get('/documentos/'+storage, {headers: {"Authorization": JSON.parse(sessionStorage.getItem('token'))}})
		.then(response => {
			docs = response.data
			auth.get('/pasta/full-rastro/'+self.session.storage).then(response => {
				data = response.data;
				$scope.link = "/documentos/";
				data.forEach(pasta => {
					$scope.link += pasta.nome+'/';
				})
				
				docs.forEach(doc => {
					
					let date = doc.updated_at;
					lastUpdate = date_Helper.timestampToDate(date);
					
					$scope.files.push({
						'id': doc.id,
						'type': typeFile(doc.tipo),
						'name': doc.nome_arquivo,
						'author': doc.usuario.first_name,
						'date': lastUpdate,
						'size': getSize(doc.tamanho),
						'link': http.serverUrl($scope.link+doc.nome_arquivo),
						'target': '_blank',
						'edit': 'file'
					})
				}, error => console.error(error));
				
				
			}, error => {
				console.error(error);
			});
		});
	}

	// ///////////// DOCUMENT FUNCTION ////////////////// //
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

	// /////////// UPLOAD DOCUMENT //////////////// //
	$scope.simpleUpload = function(ev) {
		$mdDialog.show({
			controller: SimpleUploadController,
			templateUrl: '/views/upload/simpleUpload/simpleUpload.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
			// function answer() in ng-click :: make btn
			// $scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			// função ao fechar
			// $scope.status = 'You cancelled the dialog.';
		});
	};
	
	function SimpleUploadController($scope, $mdDialog, $mdToast, $scope, $http, $route) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function(answer) {
			let data = new FormData();
			data.append('local_armazenado', self.session.storage);
			data.append('file', $('#simpleUploadField')[0].files[0])
			// data.append('file', $scope.simpleUpload.file);
			console.log($('#simpleUploadField')[0].files[0]);
			
			
			
			
			headers ={headers: {
				"Authorization": JSON.parse(sessionStorage.getItem('token')),
				"Content-type": undefined,
			}}
			
			if(answer == 'upload') {

				http.post('/documento', data, headers).then(response => {
					console.log("sending");
					console.log(response);
					$scope.hide();
					$route.reload()
					
					// window.location.href="/files/"+self.session.storage;
				}, error => {
					$scope.errorToast();
					console.error(error);
					
				})
			}
			// $mdDialog.hide(answer);
		};

		$scope.errorToast = function() {
		
			$mdToast.show(
			  $mdToast.simple()
				.textContent('Erro ao enviar!')
				.position('bottom right ')
				.hideDelay(5000)
			);
		};
	}
	
	// /////////// DIGITALIZA UPLOAD //////////////// //
	$scope.digitalizaUpload = function(ev) {
		$mdDialog.show({
			controller: DigitalizaUploadController,
			templateUrl: '/views/upload/digitalizaUpload/digitalizaUpload.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true,
			fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(answer) {
			// function answer() in ng-click :: make btn
			// $scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			// função ao fechar
			// $scope.status = 'You cancelled the dialog.';
		});
	};
	
	function DigitalizaUploadController($scope, $mdDialog, $mdToast, $scope, $http, $route) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function(answer) {
			let data = new FormData();
			data.append('local_armazenado', self.session.storage);
			data.append('filename', $scope.digitalizaUploadField.filename)
			for(i = 0; i < $('#digitalizaUploadField')[0].files.length; i++) {
				data.append('images[]', $('#digitalizaUploadField')[0].files[i])
			}

			console.log($('#digitalizaUploadField')[0].files[0]);
			
			headers ={headers: {
				"Authorization": JSON.parse(sessionStorage.getItem('token')),
				"Content-type": undefined,
			}}
			
			if(answer == 'upload') {
				http.post('/documento/digitaliza', data, headers).then(response => {
					console.log("sending");
					console.log(response);
					$scope.hide();
					$route.reload()
					
					// window.location.href="/files/"+self.session.storage;
				}, error => {
					$scope.errorToast();
					console.error(error);
					
				})
			}
			// $mdDialog.hide(answer);
		};

		$scope.errorToast = function() {
		
			$mdToast.show(
			  $mdToast.simple()
				.textContent('Erro ao enviar!')
				.position('bottom right ')
				.hideDelay(5000)
			);
		};
	}
	
	$scope.deleteFile = function(ev, file) {
		// Appending dialog to document.body to cover sidenav in docs app
			console.log(file)
			var confirm = $mdDialog.confirm()
			  .title('Excluir')
			  .textContent('Tem certeza disso?')
			  .textContent('Tem certeza que deseja excluir '+file.name+'?')
			  .ariaLabel('delete file')
			  .targetEvent(ev)
			  .ok('Excluir')
			  .cancel('Cancelar');
	
		$mdDialog.show(confirm).then(function() {
			if(file.edit == 'folder') {
				auth.postdelete('/pasta/delete/'+file.id, file).then(response => {
					$scope.getFolders(self.session.storage)
				}, error => {
					$scope.errorToast()
					console.error(error);
				})
			} else {
				auth.postdelete('/documento/delete/'+file.id, file).then(response => {
					$scope.getFolders(self.session.storage)
				}, error => {
					$scope.errorToast()
					console.error(error);
				})
			}

			$scope.errorToast = function() {
		
				$mdToast.show(
				$mdToast.simple()
					.textContent('Erro ao excluir!')
					.position('bottom right ')
					.hideDelay(5000)
				);
			};
		}, function() {
		//   $scope.status = 'You decided to keep your debt.';
			
		});
	};

	$scope.editFile = function(ev, file) {
		// Appending dialog to document.body to cover sidenav in docs app
		let fileName, tempType;
		if(file.edit != 'folder') {
			fileName = file.name.split('.')[0]
			tempType = file.name.split('.')[1]
		} else {
			fileName = file.name
		}
		var confirm = $mdDialog.prompt()
		  .title('Alterar')
		  .textContent('Nome')
		  .placeholder('Novo Nome')
		  .ariaLabel('alter name')
		  .initialValue(fileName)
		  .targetEvent(ev)
		  .required(true)
		  .ok('Salvar')
		  .cancel('Cancelar');
	
		$mdDialog.show(confirm).then(function(result) {
			if(file.edit == 'folder') {
				file.nome = result
				auth.put('/pasta/'+file.id, file).then(response => {
					console.log(response)
					$scope.getFolders(self.session.storage)
					$route.reload()
				})
			} else {
				file.nome_arquivo = result+'.'+tempType;
				auth.put('/documento/'+file.id, file).then(response => {
					console.log(response)
					$scope.getFolders(self.session.storage)
					
				}, error => {
					console.error(error)
				})
			}

			$scope.errorToast = function() {
		
				$mdToast.show(
				$mdToast.simple()
					.textContent('Erro ao excluir!')
					.position('bottom right ')
					.hideDelay(5000)
				);
			};
		}, function() {
		  $scope.status = 'You didn\'t name your dog.';
			
		});
	};
});

function typeFile(type) {
	if(type == "folder") {
		return '/img/folder.png';
	} else if (type == "pics" || type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif') {
		return "/img/pics_icon.png";
	} else {
		return "/img/doc.png";
	}
}

let prefix = ['B', 'KB', 'MB', 'GB']
function getSize(value, pass=0) {
	if(value > 1024) {
		value = value / 1024
		pass = pass + 1
		return getSize(value, pass)
	}
	let size = value.toFixed(2)
	if(value > 100)
		size = value.toFixed(1)
	return size+' '+prefix[pass]
}