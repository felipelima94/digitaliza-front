app.directive('appInfo', function() { 
    return { 
      restrict: 'E', 
      scope: { 
        file: '=' 
      }, 
      templateUrl: 'js/directives/tableFile.html' 
    }; 
});