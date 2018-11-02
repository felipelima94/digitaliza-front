(function () {
    "use strict";
    app.controller('userControll', function($scope, http, auth, $location){
        $scope.user = {};
        auth.getUser().then( data => {
            $scope.user = data;
            $scope.user.pic = http.serverUrl($scope.user.pic);
        }). catch(err => {
            sessionStorage.removeItem('token');
            window.location.href="/home";
            console.error("Error :: Unauthorised");
        })
            
        $scope.logout = () => {
            auth.logout();
        };

        $scope.gerenciarEmpresa = () => {
            $location.url('/gerenciar/empresa')
        }

        $scope.gerenciarUsuarios = () => {
            $location.url('/gerenciar/usuarios')
        }
        $scope.gerenciarConta = () => {
            $location.url('/gerenciar/conta')
        }

        let rightBar = false
        $('.userInfo').on("click", (e) => {

            !rightBar ? $('.rightBar').slideDown("slow") : $('.rightBar').slideUp("slow");

            rightBar = !rightBar
        })

        $(!'.userInfo').on("click", (e) => {
            if(rightBar) { 
                $('.rightBar').slideUp("slow")
                rightBar = false;
            }
        })

        $(document).on("click", (e) => {
            if(!jQuery(e.target).is('.rightBar, .rightBar *') && !jQuery(e.target).is('.userInfo, .userInfo *')) {
                $('.rightBar').slideUp("slow", () => {rightBar = false})
            }
        })

    });
})();