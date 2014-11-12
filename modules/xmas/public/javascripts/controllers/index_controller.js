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
angular.module('IntrepidJS').controller('XmasIndexController',
    [
        '$scope',
        '$state',
        'restService',
        '$upload',
        function ($scope, $state, restService, $upload) {
            $scope.form = {};
            $scope.form.artist = '';
            $scope.form.selectedCat = '';
            $scope.xmas = null;
            $scope.my_images = null;

            restService.get({}, apiPrefix + '/xmas/config',
              function(data){
                  if (data.objects[0].categories.length) {
                      $scope.categories = data.objects[0].categories;
                  }
              },
              function(){}
            );


            restService.get({}, apiPrefix + '/xmas/xmas',
              function(data){
                  $scope.my_images = data.objects;
              }, function(){}
            );

            $scope.onFileSelect = function($files) {
                $scope.xmas= $files[0];
                console.log($scope.xmas);
                $scope.form.xmas=btoa($scope.xmas);
                console.log($scope.form.xmas);
                var file = $scope.xmas;
                // converts file to binary string
                reader.readAsBinaryString(file);
            };
            $scope.readerOnload = function(e){
              var base64 = btoa(e.target.result);
              //$scope.$apply(function(){
              $scope.form.xmas=base64;
              //});
            };

            var reader = new FileReader();
            reader.onload = $scope.readerOnload;
            $scope.upload_picture = function(){
              $scope.form.category = $scope.form.selectedCat;
              $scope.form.artist = user.username + ' by ' + $scope.form.artist;
              restService.post($scope.form, apiPrefix + '/xmas/xmas/create', function(data) {
                restService.get({}, apiPrefix + '/xmas/xmas',
                  function(data){
                    angular.copy({}, $scope.form);
                    $scope.form.artist = "";
                    $scope.form.selectedCat = [];
                    $scope.form.xmas = null;
                    $('.file-input-name').text('');
                    $scope.my_images = data.objects;
                  }, function(){}
                  );
              },
              function(){});
            };

            $scope.checkCategoryContent = function(images, cat) {
                if (_.where(images, {category: cat}).length) {
                    return true;
                } else {
                    return false;
                }
            };

            $scope.deleteImage = function(image) {
              restService.post({}, apiPrefix + '/xmas/xmas/' + image._id + '/delete',
                  function(){
                    $scope.my_images = _.filter($scope.my_images, function(img){
                      return image._id != img._id;
                    });
                  }, function(){});
            };
            $('input[type=file]').bootstrapFileInput();
        }
    ]
);
