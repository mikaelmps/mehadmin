'use strict';

angular.module('mehadminApp').controller('MainCtrl', function ($scope) {

    var points = [];
	function listStores() {
		var stores = [
			{name: 'Store 1', locationX: 105, locationY: 110, hits: 38},
			{name: 'Store 2', locationX: 215, locationY: 212, hits: 28},
			{name: 'Store 3', locationX: 335, locationY: 314, hits: 18},
            {name: 'Store 1', locationX: 405, locationY: 410, hits: 38},
            {name: 'Store 2', locationX: 415, locationY: 412, hits: 28},
            {name: 'Store 3', locationX: 435, locationY: 414, hits: 18}
		];
        points = _.map(stores, function(store){
            var ret = {};
            ret.x = store.locationX;
            ret.y = store.locationY;
            ret.value = store.hits;
            return ret;
        })
	}

    listStores();

	// now generate some random data
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
