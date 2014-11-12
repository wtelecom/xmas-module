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
            $scope.voted_categories = {};

            function init() {
              restService.get({}, apiPrefix + '/xmas/config',
                function(data){
                  if (data.objects.length) {
                    restService.get({}, apiPrefix + '/xmas/misc/all',
                        function(data){
                          $scope.categories = data.categories;
                        },
                        function(){}
                    );
                  }
                },
                function(){}
                );
            };

            init();

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
