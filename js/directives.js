'use strict';

/* Directives */


angular.module('fuselageMaker.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).directive('newWindow', ['$window', '$compile', '$rootScope', function($window, $compile, $rootScope) {
    return {
      restrict: 'EA',
      link: function($scope, $element, attr) {
        $rootScope.window = $window.open('','_blank');
        // $rootScope.window = $window.open('', '_blank', 'toolbar=1,scrollbars=1,location=1,status=1,menubar=1,resizable=1,width=300,height=550,left = 300,top=100').focus();
        angular.element($rootScope.window.document.body).append($compile($element.contents())($scope));
        // angular.element($rootScope.window.document.head).append($window.document.head);
        $element.on('$destroy', function() {
          $rootScope.window.close();
        });
      },
      controller: function($scope, $element) {

      }
    }
  }]);
