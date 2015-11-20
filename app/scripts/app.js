'use strict';

/**
 * @ngdoc overview
 * @name mehadminApp
 * @description
 * # mehadminApp
 *
 * Main module of the application.
 */
angular
  .module('mehadminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider

      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/store/:id',{
        templateUrl: 'views/store.html',
        controller: 'StoreCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        templateUrl: 'views/map.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
