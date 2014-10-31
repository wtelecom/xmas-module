/**
 * @file app.js
 * Xmasspace Main module file
 * @desc Xmas module main methods
 */

var rek = require('rekuire'),
    _ = require('underscore'),
    mainSettings = rek('/settings');

/**
  * @desc  Set module ready
  * @param object $app - App instance
  * @param string $module_path - Module path
  * @param string $module_name - Module name
*/
exports.setModuleApp = function(app, module_path, module_name) {
    try {
        var resourcesMiddleware = rek('libs/load_resources');
        resourcesMiddleware(app, module_path + '/public', module_name);
    } catch(err) {
        console.log(err);
    }
    console.log('Module %s loaded', module_name);
};

/**
  * @desc  Loads module sections
  * @param object $app - App instance
  * @param object $module_settings - Module setting instance
*/
exports.setModuleSections = function(app, module_settings) {
    var module_sections = module_settings.sections;
    var section_obj = {
        name: module_settings.name,
        real_name: module_settings.route_prefix,
        route: '/' + module_settings.route_prefix,
        sections: (module_settings.sections ? module_settings.sections : null)
    };
    
    if (!app.locals.sections) {
        app.locals.sections = [];
        app.locals.sections.push(section_obj);
    } else {
        app.locals.sections.push(section_obj);
    }
};

/**
  * @desc  Set module route
  * @param string $path - Module path
  * @return string - Module routes path
*/
exports.setModuleRoutes = function(path, app) {
    return path + '/routes';
};

/**
  * @desc  Remove module references
  * @param string name - Module name
*/
exports.removeReferences = function(name) {
    var mainUrlri = new RegExp('/' + name + '/', 'i'),
        apiUrlri = new RegExp(mainSettings.apiPrefix + '/' + name, 'i');

    mainSettings.app_instance._router.stack = _.reject(mainSettings.app_instance._router.stack, function(route) {
        try {
            if (mainUrlri.test(route.route.path) || apiUrlri.test(route.route.path)) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            
        }
    });

    mainSettings.app_instance.locals.sections = _.reject(mainSettings.app_instance.locals.sections, function(section) {
        try {
            if (section.real_name == name) {
                return true;
            } else {
                return false;
            }
        } catch (err) {

        }
    });
};
