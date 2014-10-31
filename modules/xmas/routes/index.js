/**
 * @file index.js
 * Xmasspace Xmas Routes
 * @desc Xmas routes
 */

var _ = require('underscore'),
    rek = require('rekuire'),
    m_settings = rek('modules/xmas/settings');


var routes = {};


/**
 * @desc  Main Xmas route
 * @return object - Xmas main page render
 */
routes['/' + m_settings.route_prefix] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        res.render(m_settings.viewsPath + 'index');
    }
};

/**
 * @desc  Xmas partial route
 * @return object - Xmas partial render
 */
routes['/' + m_settings.route_prefix + '/partials/:name'] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
        var name = req.params.name;
        res.render(m_settings.viewsPath + '/partials/' + name);
    }
};

module.exports = routes;
