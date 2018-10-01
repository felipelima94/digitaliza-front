angular.module('app')
.controller('managerFiles', function($scope, $routeParams, $mdDialog, http, auth, date_Helper){
    
    var toglerightBar = false;

    hideRightBar = () => {
        if(toglerightBar) { 
            document.querySelector('.rightBar').style.display = 'none';
            toglerightBar = !toglerightBar;
        }
        console.log("go hider");
    }
    document.querySelector('.userInfo').addEventListener('click', (e) => {
        if(!toglerightBar) {
            document.querySelector('.rightBar').style.display = 'block';
            toglerightBar = !toglerightBar;
        } else if(toglerightBar) { 
            document.querySelector('.rightBar').style.display = 'none';
            toglerightBar = !toglerightBar;
        }
        e.stopPropagation();
    })
    document.querySelector('.rightBar').addEventListener('click', (e) => {
        e.stopPropagation();
    })
    document.querySelector('body').addEventListener('click', () => {
        if(toglerightBar) {
            document.querySelector('.rightBar').style.display = 'none'
            toglerightBar = !$scope.rightBar;
        }
    });

    let headers = {
        headers: {
            "Accept": 'application/json',
            "Authorization": JSON.parse(sessionStorage.getItem('token')),
        }
    }

    $scope.dadosUtil = {
        usuario_id: "",
        empresa_id: "",
        storage: "",
    }
    //////////// D O C U M E N T ////////////////////
    auth.getUser().then(data => {
        let user = data;
        $scope.dadosUtil.usuario_id = user.id;
        
        http.get('/empresa-by-user/'+user.id, headers).then(response => {
            console.log(response);
            
            data = response.data;
            console.log(data);
            
            data.forEach(data => {
                $scope.dadosUtil.empresa_id = data.empresa_id;
                let storage = data.storage
                if($routeParams.pasta > 0) {
                    storage = $routeParams.pasta
                }
                $scope.dadosUtil.storage = storage;
                $scope.getFolders(storage);
            })
        }, error => {
            // window.location.href="/home";
            console.error("Error::Unauthorised");
        })
    });
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
                usuario_id: $scope.dadosUtil.usuario_id,
                empresa_id: $scope.dadosUtil.empresa_id,
                raiz: $scope.dadosUtil.storage
            }
            http.post('/pasta', data, headers).then(response => {
                data = response.data;
                window.location.href="/files/"+data.id;
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
        console.log(storage);
        $scope.rastro = [];
        http.get('/pasta/rastro/'+storage, headers)
        .then(response => {
            console.log("rastro", response);
            
            let rastro = response.data;
            rastro.forEach(r => {
                $scope.rastro.push({
                    link: '/files/'+r.id,
                    nome: r.nome
                })
            })
        })

        $scope.files = []
        http.get('/pasta/'+storage, headers)
            .then(response => {
                console.log("pastas", response);
                let folders = response.data;
                
                
                folders.forEach(folder => {
                    lastUpdate = date_Helper.timestampToDate(folder.updated_at);
                    $scope.files.push({
                        'link': "/files/"+folder.id,
                        'type': typeFile('folder'),
                        'name': folder.nome,
                        'author': folder.usuario.first_name,
                        'date': lastUpdate,
                        'size': '--'
                    })
                })
            })
        getDocumentos(storage);
    }
    let getDocumentos = storage => {
        http.get('/documentos/'+storage, {headers: {"Authorization": JSON.parse(sessionStorage.getItem('token'))}})
        .then(response => {
            console.log("get document", response)
            docs = response.data
            docs.forEach(doc => {
                
                let date = doc.updated_at;

                // date = date.split(" ")[0];
                // date = date.split("-");
                // lastUpdate = `${date[2]}/${date[1]}/${date[0]}`
                lastUpdate = date_Helper.timestampToDate(date);
                
                $scope.files.push({
                    'type': typeFile(doc.tipo),
                    'name': doc.nome_arquivo,
                    'author': doc.usuario.first_name,
                    'date': lastUpdate,
                    'size': doc.tamanho
                })
                
            });
        }, error => {
            console.error(error);
        });
    }

    $scope.file = [
        {
            type: typeFile('folder'),
            name: 'Pasta 007',
            author: 'James Bond',
            date: '07/07/1962',
            size: '--'
        },
        {
            type: typeFile('folder'),
            name: 'Get Smart',
            author: 'Agente 86',
            date: '18/09/1965',
            size: '--'
        },
        {
            type: typeFile('pdf'),
            name: 'Lista de inimigos.pdf',
            author: 'Agente 86',
            date: '18/05/2018',
            size: '86 KB'
        },
        {
            type: typeFile('pdf'),
            name: 'Novos recrutas.pdf',
            author: 'Agente K',
            date: '21/04/2018',
            size: '25 KB'
        },
        {
            type: typeFile('folder'),
            name: 'Contabilidade',
            author: 'SouljaGirl',
            date: '13/06/2018',
            size: '--'
        },
        {
            type: typeFile('folder'),
            name: 'Videos',
            author: 'SouljaGirl',
            date: '11/06/2018',
            size: '--'
        },
        {
            type: typeFile('pics'),
            name: 'Galera 2017.jpg',
            author: 'SouljaGirl',
            date: '16/02/2018',
            size: '897 KB'
        },
        {
            type: typeFile('pics'),
            name: 'Foto-12884.jpg',
            author: 'SouljaGirl',
            date: '06/08/2017',
            size: '877 KB'
        },
        {
            type: typeFile('pics'),
            name: 'Foto-12235.jpg ',
            author: 'SouljaGirl',
            date: '06/08/2017',
            size: '972 KB'
        },
        {
            type: typeFile('pics'),
            name: 'Foto-12784.jpg',
            author: 'SouljaGirl',
            date: '06/08/2017',
            size: '658 KB'
        },
        {
            type: typeFile('pics'),
            name: 'Fachada da empresa.jpg',
            author: 'SouljaGirl',
            date: '23/11/2017',
            size: '951 KB'
        }
    ]
    
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