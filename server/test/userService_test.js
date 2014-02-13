function UserMock(usr) {
  var me = {};
  me.usr = usr;
  me.save = function(next) {
    next(null, me.usr);
  };
  return me;
}

UserMock.findOne = function(searchCriteria, next) {
  next(null, null);
};

var connectionMock = {
  model: function() {
    return UserMock;
  }
};

var userService = require('../userService')(connectionMock);

var googleProfile = {
  emails: [
    {value: 'tompi@mail.com'}, 
    {value: 'jalla@julla.ha'}, 
    {value: 'halleluja@heaven.org'}
  ],
  photos: [],
  _json: {
    picture: 'http://me/me.jpg'
  }
};

exports.findGoogleProfileResolvesMailAndPhoto = function(test) {
  userService.findOrCreateUser(googleProfile, function(savedUsr) {
    test.equal(savedUsr.email, 'tompi@mail.com');
    test.equal(savedUsr.photo, 'http://me/me.jpg');
    test.done();
  });
};
