/**
 * Accounts routes.
 */

var passport = require("passport");
var LdapStrategy = require("passport-ldapauth").Strategy;
var rek = require('rekuire');
var settings = rek('/settings');
var Account = rek('data/models/user/account');
var signupPassport = rek('middlewares/users/signup_user');


passport.use(new LdapStrategy(settings.ldapSettings));


module.exports = {
    '/accounts/signup': [
        {
            methods: ['get'],
            fn: function(req, res, next) {
                res.render('accounts/signup');
            }
        },
        {
            methods: ['post'],
            fn: function(req, res, next) {
                signupPassport(req, res);
            }
        }
    ],

    '/accounts/login': [
        {
            methods: ['get'],
            fn: function(req, res, next) {
                res.render('accounts/login');
            }
        },
        {
            methods: ['post'],
            fn: function(req, res, next) {
                passport.authenticate('ldapauth', function(err, user, info) {
                    if (err) { return next(err); }
                    if (!user) { return res.send({success: false}); }
                    
                    var uid = { 'username': user.sAMAccountName};
                    
                    var local_user = null;
                    
                    
                    Account.findOne( uid, uid, function(error, nRows, result){
                        console.log(result);
                        
                        if (error) { // Create
                            Account.insert(uid, uid, function(error, nRows, result){
                                
                                
                                console.log(error);
                                console.log(nRows);
                                console.log(result);
                                
                                
                                if (!error) { local_user = result; }
                                else { return next(err); }
                                
                            });
                        }
                        
                        console.log(result);
                        local_user = result;
                        console.log(local_user);
                        
                        
                        req.logIn(local_user, function(err) {
                                if (err) { return next(err); }
                                return res.send({success: true});
                        });
                    });
                    
     
                })(req, res, next);
            }
        }
    ],

    '/accounts/logout': [
        {
            methods: ['get'],
            fn: function(req, res, next) {
                req.logout();
                res.send({success: true});
            }
        }
    ]
};