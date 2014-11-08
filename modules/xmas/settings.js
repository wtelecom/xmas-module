
/**
 * @file settings.js
 * Xmasspace Xmas settings
 * @desc Platform Xmas settings
 */


// Module name
exports.name = 'Xmas';

// Module description
exports.description = 'Xmas module';

// Routes
exports.route_prefix = 'xmas';

// Root path
var modulePath = process.cwd() + '/modules/xmas';
exports.modulePath = modulePath;

// Paths
// Middlewares path
exports.middlewaresPath = modulePath + '/middlewares/';
// Models path
exports.modelsPath = modulePath + '/data/models/';
// Schemas path
exports.schemasPath = modulePath + '/data/schemas/';
// Views path
exports.viewsPath = modulePath + '/views/';
// Public path
exports.publicPath = modulePath + '/public/';
// Routes path
exports.routesPath = modulePath + '/routes/';

// Site settings
exports.highlights = true;

// Module actions
exports.actions = [];

exports.onTheFlyMiddlewares = {
   xmas: {
       get: null,
       getAll: exports.middlewaresPath + 'filter_my_photos',
       create: exports.middlewaresPath + 'save_imageb64',
       update: null,
       delete: null,
   }
};
