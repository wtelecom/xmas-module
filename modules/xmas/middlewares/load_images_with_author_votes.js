
function load_images_with_author_votes(model){
    return function(req,res,next){
        model.getImages(req, next);
    };
};
module.exports = load_images_with_author_votes;
