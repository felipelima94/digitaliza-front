angular.module('app').service('sessionStore',
    (auth) => {
        var _user = [];
        var _empresa = [];

        function getUser() {
           return _user
        }
        function setUser(user) {
            _user = user
        }
    //    function setUserById(id) {
    //        auth.getUser().then(response => {
    //            console.log(response)
    //        })
    //    }

        function getEmpresa() { return _empresa }
        function setEmpresa(empresa) { _empresa = empresa }
       
        return {
            getUser: getUser,
            setUser: setUser,
            getEmpresa: getEmpresa,
            setEmpresa: setEmpresa
        }

    })