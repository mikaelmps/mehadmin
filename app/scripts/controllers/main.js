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
    $scope.showStore = function(store){
        store.marked = true;
    }
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
            template: '<div container></div>',
            link: function(scope, ele, attr){
                //scope.heatmapInstance = h337.create({
                //  container: ele.find('div')[0]
                //});
                //scope.heatmapInstance.setData(scope.data);

                var drawPopUp = function(store){
                    var rect = paper.rect(store.locationX, store.locationY - 50, 100 , 200);
                    rect.attr("fill", "#fff");
                    rect.attr("stroke", "#000");
                };

                var paper = Raphael(200, 200, 800, 1000);

                // Creates circle at x = 50, y = 40, with radius 10


                // var ctx = ele.find('div')[0].firstChild.getContext('2d');

                // function draw(lX, lY, cX, cY){
                //     // line from
                //     ctx.moveTo(lX,lY);
                //     // to
                //     ctx.lineTo(cX,cY);
                //     // color
                //     ctx.strokeStyle = "#4bf";
                //     // draw it
                //     ctx.stroke();
                // }
                scope.$watch('stores' ,function(){
                    _.each(scope.stores, function(store){
                        var circle = paper.circle(store.locationX, store.locationY, store.hits);

                            circle.hover(function(){
                                drawPopUp(store);
                                circle.attr({"stroke": "#E3E3E3"});
                              },
                              function(){
                                circle.attr({"stroke": "#000"});
                            });
                            // Sets the fill attribute of the circle to red (#f00)
                            circle.attr("fill", "#f00");

                            // Sets the stroke attribute of the circle to white
                            circle.attr("stroke", "#fff");
                        });
                    }, true);




            }

        };
    });
