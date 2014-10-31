/**
 * @file api.js
 * Xmasspace Xmas Admin Routes
 * @desc Xmas admin routes
 */

var rek = require('rekuire'),
    m_settings = rek('modules/xmas/settings'),
    xmasModel = rek('modules/xmas/data/models/xmas'),
    voteImage = rek('modules/xmas/middlewares/vote_image'),
    loadImagesWithAuthorVotes= rek('modules/xmas/middlewares/load_images_with_author_votes'),
    settings= rek('/settings');

var routes = {};


/**
 * @desc  Parent admin Xmas route
 * @return object - Xmas admin parent page render
 */
routes[settings.apiPrefix + '/' + m_settings.route_prefix + '/misc/get_all_images'] =  {
    methods: ['get'],
    middleware: [loadImagesWithAuthorVotes(xmasModel)],
    fn: function(req, res, next) {
        res.send({
            'success':true,
            'images':req.objects
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

module.exports = routes;
