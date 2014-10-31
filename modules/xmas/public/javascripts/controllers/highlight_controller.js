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
            $scope.titulo = "Titulo"
        }
    ]
);
