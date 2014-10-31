/**
 * @file index.js
 * Xmasspace Xmas angular routes
 * @desc Xmas angular routes
 */


angular.module('IntrepidJS').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            
            $stateProvider.
                state('xmas', {
                    url: '/xmas',
                    views: {
                        "main_content":
                            {
                                templateUrl: "/xmas",
                                controller: 'XmasIndexController'
                            }
                    }
                });
        }
    ]
);