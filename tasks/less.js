module.exports = {
  dev: {
    options: {
      paths: ["client/css"],
      cleancss: true
    },
    files: {
      "client/css/bootstrap.css": "client/css/bootstrap.less",
      "client/css/custom.css": "client/css/custom.less",
      "client/css/font-awesome.css": "client/css/font-awesome.less"
    }
  }
};
