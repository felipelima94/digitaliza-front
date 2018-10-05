angular.module('app').config(function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
})
.controller("starting", ($scope, $routeParams, $http, $mdDialog, auth, http, $location) => {

	// verifica se está logado
	auth.auth();

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
		$location.url("/home");
	}

	$scope.formEmpresa = {
		razao_social: "mesh transparent paradigms",
		nome_fantasia: "Nienow-Ledner Inc",
		cnpj: "73.183.337/0001-55",
		email: "john.doe@gmail.com",
		telefone1: "1111111111111",
		cep: "11111111",
		endereco: "11111111",
		numero: "1111",
		cidade: "araçatuba",
		uf: "SP",
		validade: "2018-12-12"
	};
	
	$scope.submitEmpresa = () => {
		// verificar Razão social
		// Nome Fantasia 
		// CNPJ
		// Inscrição Estadual
		http.post("/verify/empresa", $scope.formEmpresa).then( response => {
			response = response.data
			if(response.length > 0) {
				response.forEach(element => {
					$scope[element] = $scope.formEmpresa[element];
					// $scope.formEmpresa[element].$valid = false;
				});
				document.querySelector("[name="+response[0]+"]").focus()
			} else {
				sessionStorage.setItem("empresa", JSON.stringify($scope.formEmpresa));
				$location.url("/cadastro/representante");
			}
		}, err => { console.error(err)});
		
	}

	$scope.formUser = {}
	$scope.empresaData = JSON.parse(sessionStorage.getItem("empresa"));
	sessionStorage.removeItem("empresa");
	$scope.registerUser = () => {
		$scope.data = {
			usuario: $scope.formUser,
			empresa: $scope.empresaData
		}
		http.post('/new/empresa', $scope.data).then( response => {
			let token = "Bearer "+response.data.success.token;
			sessionStorage.setItem("token", JSON.stringify(token));
			// $location.url("/files");
			window.location.href="/files"

		}, err => {
			console.error(err);
		})
	}


	// login box
	$scope.loginField;

	$scope.showLoginBox = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: '/views/cadastro/login.html',
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
	function DialogController($scope, $mdDialog, $mdToast) {
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function(answer) {
			if(answer == 'login') {
				http.post('/login', $scope.loginField, null).then(response => {
					let token = "Bearer "+response.data.success.token;
					sessionStorage.setItem("token", JSON.stringify(token));
					// $location.path("/files")
					window.location.href="/files"
				}, error => {
					$scope.showSimpleToast();
				})
			}
			// $mdDialog.hide(answer);
		};

		$scope.showSimpleToast = function() {
		
			$mdToast.show(
			  $mdToast.simple()
				.textContent('Nome de usuário ou senha incorretos!')
				.position('bottom right ')
				.hideDelay(5000)
			);
		};
	}

	$scope.estados = [
		{name: "Acre", 					sigla: "AC"},
		{name: "Alagoas", 				sigla: "AL"},
		{name: "Amapá", 				sigla: "AP"},
		{name: "Amazonas", 				sigla: "AM"},
		{name: "Bahia ", 				sigla: "BA"},
		{name: "Ceará", 				sigla: "CE"},
		{name: "Distrito Federal", 		sigla: "DF"},
		{name: "Espírito Santo", 		sigla: "ES"},
		{name: "Goiás ", 				sigla: "GO"},
		{name: "Maranhão", 				sigla: "MA"},
		{name: "Mato Grosso", 			sigla: "MT"},
		{name: "Mato Grosso do Sul",	sigla: "MS"},
		{name: "Minas Gerais", 			sigla: "MG"},
		{name: "Pará", 					sigla: "PA"},
		{name: "Paraíba", 				sigla: "PB"},
		{name: "Paraná", 				sigla: "PR"},
		{name: "Pernambuco", 			sigla: "PE"},
		{name: "Piauí", 				sigla: "PI"},
		{name: "Rio de Janeiro", 		sigla: "RJ"},
		{name: "Rio Grande do Norte",	sigla: "RN"},
		{name: "Rio Grande do Sul", 	sigla: "RS"},
		{name: "Rondônia", 				sigla: "RO"},
		{name: "Roraima", 				sigla: "RR"},
		{name: "Santa Catarina", 		sigla: "SC"},
		{name: "São Paulo", 			sigla: "SP"},
		{name: "Sergipe", 				sigla: "SE"},
		{name: "Tocantins", 			sigla: "TO"},
	]

}).directive('noRepeat', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
		function myValidation(value) {
			if (attr.noRepeat != value) {
			mCtrl.$setValidity('charE', true);
			} else {
			mCtrl.$setValidity('charE', false);
			}
			return value;
		}
		mCtrl.$parsers.push(myValidation);
		}
	};
}).directive('iqual', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
		function myValidation(value) {
			if (attr.iqual == value) {
			mCtrl.$setValidity('iqual', true);
			} else {
			mCtrl.$setValidity('iqual', false);
			}
			return value;
		}
		mCtrl.$parsers.push(myValidation);
		}
	};
});