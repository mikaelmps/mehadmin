'use strict';

angular.module('mehadminApp').controller('MainCtrl', function ($scope, $http, $interval, StoreService) {

    var API_URL = 'http://178.62.207.134';
        $scope.stores = [];
        $scope.totalHits = 0;
		// $http.get(API_URL + '/api/stores').success(function(response) {
		// 	stores = response;
  //           points = _.map(stores, function(store){
  //           var ret = {};
  //           ret.x = store.location_x;
  //           ret.y = store.location_y;
  //           ret.value = store.hits;
  //           return ret;
  //       })

        //$scope.stores = stores;
		// }).error(function(err) {
		// 	console.log(err);
		// });
        var update = function () {
            StoreService.getStores();
            $scope.totalHits = StoreService.getData().totalHits;
            $scope.stores = StoreService.getData().stores;
        }
        update();
        $interval(update, 5000);

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

                var rect, text;
                var drawPopUp = function(store){
                    if(rect){
                        rect.remove();
                    }
                    if(text){
                        text.remove()
                    }
                    rect = paper.rect(parseInt(store.location_x), parseInt(store.location_y) -50 ,120 , 50);
                    rect.attr("fill", "#fff");
                    rect.attr("stroke", "#000");
                    rect.attr('opacity', 0.8);
                    text = paper.text(store.location_x + 60, store.location_y -30, store.full_name + "(" + store.hits + ")").attr({fill: '#ff0000'}).attr({stroke: '#000'})
                };

                var paper = Raphael(200, 200, 800, 1000);

            scope.$watch('stores', function(){
                paper.clear();
                var img = paper.image("images/mall-floor-plan-grey.png", 0, 0, 800, 1000);
                _.each(scope.stores, function(store){
                var circle = paper.circle(store.location_x, store.location_y, parseInt(store.hits));

                    circle.hover(function(){
                        drawPopUp(store);
                        circle.attr({"stroke": "#E3E3E3"});
                      },
                      function(){
                        circle.attr({"stroke": "#000"});
                    });
                    // Sets the fill attribute of the circle to red (#f00)
                    circle.attr("fill", "#f00");
                    circle.attr('opacity', 0.7);

                    // Sets the stroke attribute of the circle to white
                    circle.attr("stroke", "#fff");
                });
            },true);


            }

        };
    })
.service('StoreService', function(){
    var historicData = [];
    var stores = [];
    var totalHits = 0;
    this.getData = function(){
        return {
            stores: stores,
            totalHits: totalHits,
            historicData: historicData
        };
    }

    this.getStores = function(){
         stores = [
           {
               "beacon_id": "22",
               "full_name": "Vapiano",
               "game_over": "1",
               "hits": Math.floor((Math.random()*25)+10),
               "id": "vapiano",
               "location_x": 120,
               "location_y": 70,
               "riddle_1": "German Italian Food",
               "riddle_2": "Homemade Pasta",
               "weight": "1"
           },
           {
               "beacon_id": "21",
               "full_name": "Lush",
               "hits": Math.floor((Math.random()*25)+10),
               "id": "lush",
               "location_x": 180,
               "location_y": 200,
               "riddle_1": "We smell",
               "riddle_2": "Bombs",
               "weight": "4"
           },
           {
               "beacon_id": "23",
               "full_name": "Clas Ohlson",
               "hits": Math.floor((Math.random()*25)+10),
               "id": "clas_ohlson",
               "location_x": 210,
               "location_y": 300,
               "riddle_1": "We have blue shirts",
               "riddle_2": "We have glue and grinders",
               "weight": "2"
           },
           {
               "beacon_id": "12",
               "full_name": "Hennes & Mauritz",
               "hits": Math.floor((Math.random()*25)+10),
               "id": "hm",
               "location_x": 300,
               "location_y": 80,
               "riddle_1": "We have jackets",
               "riddle_2": "We have shorts",
               "weight": "3"
           }

        ];
         totalHits =  _.reduce(stores, function(memo, store){
                return parseInt(store.hits) + memo;
            }, 0);
         historicData.push(stores);
    };

})
