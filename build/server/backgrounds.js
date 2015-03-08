var fs = require('fs');

exports.init = function(app) {
  // Set up endpoint
  app.get('/api/backgrounds', function(req, res) {
    // Enumerate all files
    //fs.readdir('../client/assets/img/backgrounds/', function(err, files) {
    fs.readdir('./client/assets/img/backgrounds/', function(err, files) {
      res.json(files);
    });
  });
};
