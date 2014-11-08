/**
 * @file admin.js
 * Xmasspace Xmas Admin Routes
 * @desc Xmas admin routes
 */

var rek = require('rekuire'),
    m_settings = rek('modules/xmas/settings');

var routes = {};


/**
 * @desc  Parent admin Xmas route
 * @return object - Xmas admin parent page render
 */
routes['/' + m_settings.route_prefix + '/admin/parent'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'admin/parent');
    }
};

routes['/' + m_settings.route_prefix + '/admin/config'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'admin/config');
    }
};


module.exports = routes;
