/**
 * @file index_controller.js
 * Xmasspace Index Controller
 * @desc This module manage AngularJS Xmas index operations
 */


/**
 * @desc  Xmas Index controller
 * @param object $scope - The controller scope var
 * @param object $state - The controller state route var
 */
angular.module('IntrepidJS').controller('CtrlHighlight',
    [
        '$scope',
        '$state',
        'restService',
        function ($scope, $state, restService) {
            var DEBUG = true;
            $scope.titulo = "Titulo";
            $scope.voted_categories = {};

            function init(){
              restService.get({}, apiPrefix + '/xmas/config',
                function(data){
                  if (data.objects.length) {
                    if (data.objects[0].step < 3) {
                      restService.get({}, apiPrefix + '/xmas/misc/all',
                        function(data){
                          $scope.categories = data.categories;
                        },
                        function(){}
                        );
                    }
                  }
                },
                function(){}
                );
            };
            init();

            vote_sync = function(item, fn) {
              $http.post("/api/xmas/vote")
              .success(function(data) {
                return fn(data);
              }).error(function(data){ return fn(false); });
            }

            unvote_sync = function(item, fn) {

            }

            $scope.toggleVote = function(item_id) {
              restService.post({}, apiPrefix + '/xmas/misc/xmas/vote/' + item_id._id,
                  function(d){
                    init();    //TODO: just upload the images votes
                  }, function(){});
            };

            $scope.popupImage = function(image) {
                $scope.modal_image = image;
                $('#photoModal').modal('show');
            }

        }
    ]
);
