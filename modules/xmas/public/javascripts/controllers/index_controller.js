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
          $scope.categories = [
            {title: 'Menores de 4',
             imgs: [
              { url: "http://d1lalstwiwz2br.cloudfront.net/images_users/tiny_mce/PersianSultan/phpgiGgA8.jpeg",
                author: "Marcos García Ramírez"
              },
              { url: "http://d1lalstwiwz2br.cloudfront.net/images_users/tiny_mce/PersianSultan/phpfJVW9D.png",
                author: "JC García Ramírez"
              },
              { url: "http://d1lalstwiwz2br.cloudfront.net/images_users/tiny_mce/PersianSultan/phpb0a7U8.jpeg",
                author: "Marcos Ramírez Perez"
              },
              ]
            }, 
            {title: 'Entre 5 y 12',
             imgs: [
              { url: "http://2.bp.blogspot.com/-EKTLKkuSnV0/Ue7XHo8MxgI/AAAAAAAACJg/S5iNHTcG9d0/s1600/Think+Twice,+Code+Once!+by+pcbots.jpg",
                author: "Miguel Angel de lujo"
              },
              { url: "http://4.bp.blogspot.com/-YB0k1FfNrqI/Umfb8V7iduI/AAAAAAAACdI/rj-vxr_rZKI/s640/Code+for+Coffee+By+Pcbots.jpg",
                author: "Mi niño el más guapo del mundo"
              },
              { url: "http://fc06.deviantart.net/fs71/i/2010/044/f/c/ProgrammingOOP_Wallpaper_Black_by_hexeno.png",
                author: "Que bonita mi niñaaa"
              },
              ]
            }, 
          ];
          $scope.upload_picture = function(){
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

            $scope.onFileSelect = function($files) {
                $scope.form.picture = $files[0];
            };

            $scope.upload_picture = function(){
                $scope.upload = $upload.upload({
                    url: apiPrefix + '/xmas/xmas/create',
                    file: $scope.form.picture[0],
                    data: $scope.form
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    //$scope.user = data.object;
                    angular.element('.file-input-name').remove();
                });
            };
            $('input[type=file]').bootstrapFileInput();
        }
    ]
);
