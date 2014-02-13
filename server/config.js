module.exports = {
  mongodb: {
    host: 'linus.mongohq.com:10010',
    db: 'webapp',
    user: 'webapuser',
    password: 'topsecret'
  },
  sessionSecret: 'verytopsecret',
  passport: {
    'google-oauth': {
      strategy: 'OAuth2Strategy',
      scope: [
         'https://www.googleapis.com/auth/userinfo.profile',
         'https://www.googleapis.com/auth/userinfo.email'
      ],
      clientID: '1098607882040.apps.googleusercontent.com',
      clientSecret: 'CISVtnCf9N5L7IZPBVddeK48'
    },
    facebook: {
      scope: ['email'],
      clientID: '396026930541318',
      clientSecret: 'c8c711ef1c55b53b5ac926893c954d85',
      profileFields: ['id', 'name', 'emails', 'displayName', 'photos']
    }
  }
};
