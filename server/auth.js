//var url = require('url');
//var pathPrefix = url.protocol + '//' + url.host;

exports.init = function(app, config, passport, userService) {

  function afterLogin(req, res) {
    res.redirect('/#/passport');
  }

  // Cache users in local array
  var users = [];
  // User key in array us provider(google,facebook, etc) + id
  passport.serializeUser(function(user, done) {
    done(null, user.provider + "-" + user.id);
  });
  passport.deserializeUser(function(id, done) {
    var user = users[id];
    done(null, user);
  });
  // On successful authentication, lookup database:
  // if not there, create, else update
  function authenticatedUser(accessToken, refreshToken, profile, done) {
    var user = users[profile.provider + "-" + profile.id];
    if (!user) {
      userService.findOrCreateUser(profile, function(dbUser) {
        user = dbUser;
        users[profile.provider + "-" + profile.id] = user;
        return done(null, user);
      });
    } else {
      return done(null, user);
    }
  }

  // Unified config-scheme
  for (var name in config.passport) {
    var conf = config.passport[name];
    var strategy = require('passport-' + name)[conf.strategy || 'Strategy'];
    // Lame...
    name = name.replace("-oauth", "");
    conf.callbackURL = '/auth/' + name + '/callback';
    passport.use(new strategy(conf, authenticatedUser));
    app.get('/auth/' + name, passport.authenticate(
      name, {scope: conf.scope}));
    app.get(conf.callbackURL, passport.authenticate(name, {
        failureRedirect: '/error'
      }), afterLogin);
  }

  // For debug purposes: get your own account info as json
  app.get('/auth/account', function(req, res) {
    res.json(req.user);
  });

  app.get('/auth/logout', function(req, res) {
    req.logout();
    res.json({ loggedOut: true });
    //res.redirect('/');
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/#passport');
}

exports.ensureAuthenticated = ensureAuthenticated;
