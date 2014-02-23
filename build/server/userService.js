module.exports = function(connection) {
  var me = {};
  // get MERS connection and reuse it...
  var User = connection.model('User');

  function getFirstValue(valueArray) {
    if (valueArray && valueArray.length) {
      return valueArray[0].value;
    } else {
      return '';
    }
  }

  me.findOrCreateUser = function(profile, next) {
    User
    .findOne({id: profile.id, provider: profile.provider},
          function(err, usr) {
            // First add calculated email and photo attributes
            // (instead of those pesky arrays of objects...)
            profile.email = getFirstValue(profile.emails);
            profile.photo = getFirstValue(profile.photos) || profile._json.picture;
            if (usr) {
              User.findByIdAndUpdate(usr._doc._id, { $set: profile }, function(err, updatedUsr) {
                next(updatedUsr);
              });
            } else {
              // Create
              var newUsr = new User(profile);
              newUsr.save(function(err, createdUsr) {
                next(createdUsr);
              });
            }
          });
  };
  return me;
};
