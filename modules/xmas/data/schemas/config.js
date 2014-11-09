/*
*
*
*/

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    _ = require('underscore');

var configSchema = new mongoose.Schema({
    step: Number,
    categories: [String]
});

configSchema.statics.getConfig = function(){
    this.findOne(function(err, config){
        return config.step;
    })
};

configSchema.statics.addCategory = function(obj, req, next) {
    var schema = this;
    this.findOne()
        .exec(function(err, config) {
            if (err)
                return next(err);
            if (config) {
                config.categories.push(obj);
                config.save();
            } else {
                data = {step: 1, categories:[obj]};
                schema.create(data, function(err) {
                    if (err)
                        return next(err);
                    return next();
                });
            }
            return next();
    });
};

configSchema.statics.removeCategory = function(obj, req, next) {
    var schema = this;
    this.findOne()
        .exec(function(err, config) {
            if (err)
                return next(err);
            if (config) {
                config.categories.splice(obj, 1);
                config.save();
            }
            return next();
    });
};

configSchema.statics.updateCategory = function(obj, req, next) {
    var schema = this;
    this.findOne()
        .exec(function(err, config) {
            if (err)
                return next(err);
            if (config) {
                try {
                    config.categories[obj.index] = obj.name;
                    config.markModified('categories');
                    config.save();
                } catch(error) {
                    console.log(error);
                }
            }
            return next();
    });
};

module.exports = configSchema;
