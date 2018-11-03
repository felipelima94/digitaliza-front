angular.module('app').service('sessionStore',
	function () {
		let _user = [];
		let _empresa = [];

		function getUser() { return _user }
		function setUser(user) { _user = user }

		function getEmpresa() { return _empresa }
		function setEmpresa(empresa) { _empresa = empresa }
		
		return {
			getUser: getUser,
			setUser: setUser,
			getEmpresa: getEmpresa,
			setEmpresa: setEmpresa
		}

	})