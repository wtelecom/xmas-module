/**
 * @file admin.js
 * Xmasspace Xmas admin angular routes
 * @desc Xmas admin angular routes
 */


angular.module('IntrepidJS').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.
                state('admin.modules.xmas', {
                    url: '/xmas',
                    views: {
                        "actions_parent_content":
                            {
                                templateUrl: "/xmas/admin/parent",
                                controller: "XmasAdminIndexController"
                            }
                    }
                }).
                state('admin.modules.xmas.config', {
                    url: '/config',
                    views: {
                        "actions_children_content":
                            {
                                templateUrl: "/xmas/admin/config",
                                controller: "XmasAdminIndexController"
                            }
                    }
                });
        }
    ]
);
