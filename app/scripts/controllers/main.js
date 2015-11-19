'use strict';

angular.module('mehadminApp').controller('MainCtrl', function ($scope, $http) {

    var points = [];
    var API_URL = 'http://178.62.207.134';
	function listStores() {

		$http.get(API_URL + '/api/stores').success(function(response) {
			console.log(response);
		}).error(function(err) {
			console.log(err);
		});

		var stores = [
			{name: 'Store 1', locationX: 105, locationY: 110, hits: 38},
			{name: 'Store 2', locationX: 215, locationY: 212, hits: 28},
			{name: 'Store 3', locationX: 335, locationY: 314, hits: 18},
            {name: 'Store 4', locationX: 405, locationY: 410, hits: 38},
            {name: 'Store 5', locationX: 415, locationY: 412, hits: 28},
            {name: 'Store 6', locationX: 435, locationY: 414, hits: 18}
		];
        points = _.map(stores, function(store){
            var ret = {};
            ret.x = store.locationX;
            ret.y = store.locationY;
            ret.value = store.hits;
            return ret;
        })
        $scope.stores = stores;
	}

    listStores();
    $scope.showStore = function(store, bool){
        store.marked = bool;
    };
	// now generate some random data
            var max = 15;
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
                data: '=',
                stores:'='
            },
            template: '<div container><canvas id="overlay" style="width: 800px; height: 650px; posistion:absolute;"></canvas</div>',
            link: function(scope, ele, attr){
                scope.heatmapInstance = h337.create({
                  container: ele.find('div')[0]
                });
                scope.heatmapInstance.setData(scope.data);

                var ctx = ele.find('div')[0].firstChild.getContext('2d');

                var c = document.getElementById("overlay");
				var ctx2 = c.getContext("2d");

                function draw(lX, lY, cX, cY){
                    // line from
                    ctx2.moveTo(lX,lY);
                    // to
                    ctx2.lineTo(cX,cY);
                    // color
                    ctx2.strokeStyle = "#4bf";
                    // draw it
                    ctx2.stroke();
                }
                scope.$watch('stores' ,function(){
                	 ctx2.clearRect(0,0,c.width,c.height);
                    _.each(scope.stores, function(store){
                        if(store.marked){
                            draw(store.locationX, store.locationY,store.locationX + 200,store.locationY+200);
                        }
                    });
                }, true);




            }

        };
    });
