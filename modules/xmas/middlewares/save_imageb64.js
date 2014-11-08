/**
* @file save_image_imageb64.js
* @desc Update a measure with a Base64 image in "on the fly" route
*/


var _ = require('underscore'),
   fs = require('fs'),
   uuid = require('node-uuid'),
   rek = require('rekuire'),
   mainSettings = rek('/settings'),
   createOperation = rek('libs/crud_operations/create');

/**
* @desc Update a measure with a Base64 image in "on the fly" route
* @return function - Next function
*/
function updateObject() {
   return function updateObject(req, res, next) {
       if (req.body.xmas) {
           var dirPath = mainSettings.filesPath + 'xmas',
               newPath = mainSettings.filesPath + 'xmas/' + uuid.v4(),
               pathTreat = newPath.replace(process.cwd() + '/public', '');

           fs.exists(dirPath, function (exists) {
               if (exists) {
                  fs.writeFile(newPath, req.body.xmas, 'base64', function(err) {
                       if (err) {
                           res.json({error: res.__('File not saved')});
                       } else {
                           req.objects.url = pathTreat;
                           req.objects.save();
                       }
                       next();
                   });
               } else {
                   fs.mkdir(dirPath, 0755, function(err) {
                       if (err) console.log(err);
                       fs.writeFile(newPath, req.body.xmas, 'base64', function(err) {
                           if (err) {
                               res.json({error: res.__('File not saved')});
                           } else {
                               req.objects.url = pathTreat;
                               req.objects.save();
                           }
                           next();
                       });
                   });
               }
           });
       } else {
           next();
       }
   };
}

module.exports = updateObject;
