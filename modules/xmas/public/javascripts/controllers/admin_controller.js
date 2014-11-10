/**
 * @file admin_controller.js
 * Xmasspace Admin Controller
 * @desc This module manage AngularJS Xmas admin operations
 */

/**
 * @desc  A dummy controller
 * @param object $scope - The controller scope var
 * @param object $state - The controller state route var
 */
angular.module('IntrepidJS').controller('XmasAdminIndexController',
    [
        '$scope',
        '$state',
        'restService',
        function ($scope, $state, restService) {
            $scope.formData = {};
            $scope.steps = [
                {title:'Subida de Xmas', order: 1},
                {title:'Votación de Xmas', order: 2},
                {title:'Resultados', order: 3}
            ];
            $scope.categories = [];
            var categories = [];
            var configId = null;
            restService.get({}, apiPrefix + '/xmas/config',
                function(data){
                    if (data.objects.length) {
                        configId = data.objects[0]._id;
                        var el = _.where($scope.steps, {order: data.objects[0].step});
                        console.log(el);
                        $scope.formData.step = el[0];
                    }
                    if (data.objects[0].categories.length) {
                        $scope.categories = data.objects[0].categories;
                        categories = data.objects[0].categories;
                    }
                },
                function(){}
            );

            $scope.$watch('formData.step', function(newVal, oldVal) {
                if (newVal != oldVal) {
                    if (configId) {
                        restService.post({data:{step:newVal.order}}, apiPrefix + '/xmas/config/' + configId + '/update', function(data){
                            var el = _.where($scope.steps, {order: newVal.order});
                            $scope.formData.step = el[0];
                        }, function(){});
                    } else {
                        restService.post({data:{step:newVal.order}}, apiPrefix + '/xmas/config/create', function(){
                            var el = _.where($scope.steps, {order: newVal.order});
                            $scope.formData.step = el[0];
                        }, function(){});
                    }

                }
            });

            $scope.add_category = function(category) {
                restService.post({category:category}, apiPrefix + '/xmas/misc/config/add/category',
                function(){
                    $scope.categories.push(category);
                }, function(){});
            };

            $scope.removeCategory = function(index) {
                restService.post({category:index}, apiPrefix + '/xmas/misc/config/remove/category',
                function(){
                    $scope.categories.splice(index, 1);
                }, function(){});
            };

            $scope.updateCategory = function(index, category) {
                restService.post({category:{name:category, index:index}}, apiPrefix + '/xmas/misc/config/update/category',
                function(){}, function(){});
            };
        }
    ]
);
