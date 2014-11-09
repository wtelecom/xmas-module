/**
 * @file api.js
 * Xmasspace Xmas Admin Routes
 * @desc Xmas admin routes
 */

var rek = require('rekuire'),
    m_settings = rek('modules/xmas/settings'),
    xmasModel = rek('modules/xmas/data/models/xmas'),
    configModel = rek('modules/xmas/data/models/config'),
    voteImage = rek('modules/xmas/middlewares/vote_image'),
    loadImagesWithAuthorVotes= rek('modules/xmas/middlewares/load_images_with_author_votes'),
    settings= rek('/settings');

var routes = {};


/**
 * @desc  Parent admin Xmas route
 * @return object - Xmas admin parent page render
 */
routes[settings.apiPrefix + '/' + m_settings.route_prefix + '/misc/all'] =  {
    methods: ['get'],
    middleware: [loadImagesWithAuthorVotes(xmasModel)],
    fn: function(req, res, next) {
        res.send({
            'success':true,
            'categories':req.objects
            }
        );
    }
};

/**
 * @desc  Parent admin Xmas route
 * @return object - Xmas admin parent page render
 */
routes[settings.apiPrefix + '/' + m_settings.route_prefix + '/misc/vote'] =  {
    methods: ['get'],
    middleware: [voteImage(xmasModel)],
    fn: function(req, res, next) {
        res.send({
            'success':true,
            'images':req.objects
            }
        );
    }
};

routes[settings.apiPrefix + '/' + m_settings.route_prefix + '/misc/config/add/category'] =  {
    methods: ['post'],
    middleware: [],
    fn: function(req, res, next) {
        configModel.addCategory(req.body.category, req, function() {
            res.send({
                'success':true
            });
        });
    }
};

routes[settings.apiPrefix + '/' + m_settings.route_prefix + '/misc/config/update/category'] =  {
    methods: ['post'],
    middleware: [],
    fn: function(req, res, next) {
        configModel.updateCategory(req.body.category, req, function() {
            res.send({
                'success':true
            });
        });
    }
};

routes[settings.apiPrefix + '/' + m_settings.route_prefix + '/misc/config/remove/category'] =  {
    methods: ['post'],
    middleware: [],
    fn: function(req, res, next) {
        configModel.removeCategory(req.body.category, req, function() {
            res.send({
                'success':true
            });
        });
    }
};

module.exports = routes;
