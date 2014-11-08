var _=require('underscore');

function filter_images(){
    return function(req,res,next){
        myPhotos = _.filter(req.objects, function(photo) {
            return String(photo.author) == String(req.user._id);
        });
        req.objects=myPhotos;
        next();
    };
};
module.exports = filter_images;
