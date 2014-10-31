
function load_images_with_author_votes(model){
    return function(req,res,next){
        model.getImages();
    };
};
module.exports = load_images_with_author_votes;
