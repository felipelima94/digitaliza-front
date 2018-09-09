angular.module('app')
.controller('managerFiles', function($scope, $http){
    
    $scope.rightBar = false;

    $scope.hideRightBar = () => {
        if($scope.rightBar) { 
            document.querySelector('.rightBar').style.display = 'none';
            $scope.rightBar = !$scope.rightBar;
        }
    }
    document.querySelector('.userInfo').addEventListener('click', (e) => {
        if(!$scope.rightBar) {
            document.querySelector('.rightBar').style.display = 'block';
            $scope.rightBar = !$scope.rightBar;
        } else if($scope.rightBar) { 
            document.querySelector('.rightBar').style.display = 'none';
            $scope.rightBar = !$scope.rightBar;
        }
        e.stopPropagation();
    })
    document.querySelector('.rightBar').addEventListener('click', (e) => {
        e.stopPropagation();
    })
    document.querySelector('body').addEventListener('click', () => {
        if($scope.rightBar) {
            document.querySelector('.rightBar').style.display = 'none'
            $scope.rightBar = !$scope.rightBar;
        }
    });

    $scope.files = [
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
        return 'img/folder.png';
    } else if (type == "pdf") {
        return "img/doc.png";
    } else if (type == "pics") {
        return "img/pics_icon.png";
    }
}