/**
 * @file index.js
 * Xmasspace Xmas Routes
 * @desc Xmas routes
 */

var _ = require('underscore'),
    rek = require('rekuire'),
    m_settings = rek('modules/xmas/settings'),
    configModel = rek('modules/xmas/data/models/config');


var routes = {};


/**
 * @desc  Main Xmas route
 * @return object - Xmas main page render
 */
routes['/' + m_settings.route_prefix] =  {
    methods: ['get'],
    middleware: [],
    fn: function(req, res, next) {
      if (req.isAuthenticated()){
        configModel.getStep(function(step) {
            if (step == 2) {
                res.render(m_settings.viewsPath + 'index');
            } else {
                res.send();
            }
        });
      }else{
        res.render(m_settings.viewsPath + 'please_signin');
      }
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
        if (name == 'highlights') {
            configModel.getStep(function(step) {
                if (step == 1) {
                    res.render(m_settings.viewsPath + '/partials/highlights_step_one');
                } else if (step == 2) {
                    res.render(m_settings.viewsPath + '/partials/highlights_step_two');
                } else if (step == 3){
                    res.render(m_settings.viewsPath + '/partials/highlights_step_three');
                } else {
                    res.render(m_settings.viewsPath + '/partials/highlights_step_one');
                }
            });
        } else {
            res.render(m_settings.viewsPath + '/partials/' + name);
        }
    }
};

module.exports = routes;
