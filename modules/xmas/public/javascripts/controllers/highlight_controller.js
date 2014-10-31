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
        function ($scope, $state) {
            $scope.titulo = "Titulo";

            $scope.categories = [
              {
                title: 'De 0 a 3 años',
                items: [
                  {
                    _id: 1,
                    url: 'http://fotos.eluniversal.com.mx/web_img/fotogaleria/kate1.jpg',
                    vote: true
                  }
                ]
              },
              {
                title: 'De 3 a 6 años',
                items: [
                  {
                    _id: 2,
                    url: 'http://g.cdn.ecn.cl/fotografia/files/2014/06/fotos-perturbadoras-6.jpg',
                    vote: false
                  }
                ]
              }
            ]

            getXmas = function() {
              $http.get("/api/xmas")
              .success(function(data) {

               var categories = _.map(data, function(d){
                 return d.category
               });

               var uniq_categories = _.uniq(categories);

               data.forEach(function(d) {

               })

             });

            }

        }
    ]
);
