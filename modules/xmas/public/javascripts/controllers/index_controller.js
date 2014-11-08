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
          console.log($scope.form.artist.length);
          $scope.my_images = null;
          $scope.categories = [
            {title: 'Menores de 4'
            },
            {title: 'Entre 5 y 12'
            },
          ];
          restService.get({}, apiPrefix + '/xmas/xmas',
          function(data){
              $scope.my_images = data.objects;
          }, function(){});
        /*  $scope.upload_picture = function(){
            //console.log(angular.element("input type=['file']").files);
            //$scope.form.picture = $scope.selectedFile;
            restService.post($scope.form, apiPrefix + '/xmas/xmas/create',
                function(data){
                  console.log("success:", data);
                },
                function(data){
                  console.log("error:", data);
                }
                )};
*/

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
            //   console.log($scope.form.picture);
                console.log($scope.form.selectedCat);
            //   console.log($scope.form);
              $scope.form.category = $scope.form.selectedCat.title;
              console.log($scope.form);
              restService.post($scope.form, apiPrefix + '/xmas/xmas/create', function() {

              },
              function(){});
                // $scope.upload = $upload.upload({
                //     url: apiPrefix + '/xmas/xmas/create',
                //     //file: $scope.form.picture,
                //     data: $scope.form
                // }).progress(function(evt) {
                //     console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                // }).success(function(data, status, headers, config) {
                //     //$scope.user = data.object;
                //     angular.element('.file-input-name').remove();
                // });
            };
            $('input[type=file]').bootstrapFileInput();
        }
    ]
);
