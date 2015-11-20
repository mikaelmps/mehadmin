'use strict';

angular.module('mehadminApp').controller('StoreCtrl', function ($scope, $http, $routeParams) {
    this.store = $routeParams.id;
    this.stores = [];

});
