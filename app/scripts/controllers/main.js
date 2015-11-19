'use strict';

angular.module('mehadminApp').controller('MainCtrl', function ($scope) {

    var points = [];
	function listStores() {
		var stores = [
			{name: 'Store 1', locationX: 5, locationY: 10, hits: 38},
			{name: 'Store 2', locationX: 15, locationY: 12, hits: 28},
			{name: 'Store 3', locationX: 35, locationY: 14, hits: 18}
		];
        points = _.map(stores, function(store){
            var ret = {};
            ret.x = store.locationX;
            ret.y = store.locationY;
            ret.value = store.hits;
        })
	}

    listStores();

	// now generate some random data
            var points = [];
            var max = 0;
            var width = 840;
            var height = 400;
            var len = 200;


            // heatmap data format
            $scope.passed_data = {
                max: max,
                data: points
            };
	// if you have a set of datapoints always use setData instead of addData
	// for data initialization
})
.directive('heatMap', function(){
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            template: '<div container></div>',
            link: function(scope, ele, attr){
                scope.heatmapInstance = h337.create({
                  container: ele.find('div')[0]
                });
                scope.heatmapInstance.setData(scope.data);
            }

        };
    });
