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



            // $scope.categories = [
            //   {
            //     title: 'De 0 a 3 años',
            //     items: [
            //       {
            //         _id: 1,
            //         url: 'http://fotos.eluniversal.com.mx/web_img/fotogaleria/kate1.jpg',
            //         voted: true,
            //         category: 'De 0 a 3 años'
            //       }
            //     ]
            //   },
            //   {
            //     title: 'De 3 a 6 años',
            //     items: [
            //       {
            //         _id: 2,
            //         url: 'http://g.cdn.ecn.cl/fotografia/files/2014/06/fotos-perturbadoras-6.jpg',
            //         voted: false,
            //         category: 'De 3 a 6 años'
            //       }
            //     ]
            //   }
            // ]

            // getXmas = function() {
            //   $http.get("/api/xmas")
            //   .success(function(data) {
            //
            //     // Map category of each xmas
            //     var categories = _.map(data, function(d){
            //       return d.category;
            //     });
            //
            //     // Get distinct categories
            //     var uniq_categories = _.uniq(categories);
            //
            //     // Make oredered array
            //     uniq_categories.forEach(function(cat) {
            //       $scope.voted_categories[cat] = false;
            //       $scope.categories.push({
            //         title: cat,
            //         items: _.filter(data, function(d) { d.category == cat} )
            //       }); //push
            //     }); // forEach
            //
            //   }); // success
            //
            // }; //getXmas

            vote_sync = function(item, fn) {
              $http.post("/api/xmas/vote")
              .success(function(data) {
                return fn(data);
              }).error(function(data){ return fn(false); });
            }

            unvote_sync = function(item, fn) {

            }

            $scope.toggleVote = function(item) {
              if (DEBUG) console.log("toggle_vote(item)");

              if (item.voted) return unvote(item);
              else return vote(item);
            };

            // Deprecated
            var vote = function(item) {
              if ($scope.voted_categories[item.category]==true) {
                return alert("Ya has votado esta categoría");
              }

              $scope.voted_categories[item.category] = true;
              item.voted = true;
              alert("Voted !");
            };

            var unvote = function(item) {

              $scope.voted_categories[item.category] = false;
              item.voted = false;
              alert("Unvoted !");

            };

            $scope.popupImage = function() {
              console.log("POPUP");
            }

        }
    ]
);
