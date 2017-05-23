angular.module('app', ['ngRoute'])
  .config(function ($routeProvider) {
    'use strict';

    $routeProvider
      .when('/', {
        templateUrl: 'app/partials/homeLayout.html',
        Controller: 'AppCtrl'
      })
      .when('/search', {
        templateUrl: 'app/partials/searchLayout.html',
        Controller: 'AppCtrl'
      })
      .when('/playlist', {
        templateUrl: 'app/partials/playlistLayout.html',
        Controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
