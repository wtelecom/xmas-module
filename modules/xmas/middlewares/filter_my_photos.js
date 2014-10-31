var _=require('underscore');

function filter_images(){
    return function(req,res,next){
        var myPhotos=[];
        req.objects.map(function(obj){
            if(obj.author == req.user._id){
                delete obj.votes;
                myPhotos.push(obj);
                }
        });
        req.objects=myPhotos;
        next();
    };
};
module.exports = filter_images;
