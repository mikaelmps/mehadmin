'use strict';
/* global _ */
/* global console */
/* global window */

/* Directives */

angular.module('mehadminApp.directives', [])  

  .directive('activeMenuLink', ['$location', function(location) { 
    return {
      restrict: 'A',
      scope: {
        menuPath:'@'
      },
      link: function(scope, element, attrs, controller) {
        var activeClassName = "active";
        console.log(scope);
        var path = scope.menuPath || '';
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        var parentLi = element.parent();
        scope.$watch('location.path()', function(newPath) {
          newPath = newPath || '';
          if (path === '/' && newPath === path){
            parentLi.addClass(activeClassName);
          }
          else if (path === newPath.substring(0, path.length) && path !== '/') {
            parentLi.addClass(activeClassName);
          } else {
            parentLi.removeClass(activeClassName);
          }
        });
      }
    };
  }]);