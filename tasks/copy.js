module.exports = {
  dev: {
    files: [
      {expand: true, cwd: 'bower_components/bootstrap/dist', src: ['fonts/*'], dest: 'client/assets/'},
      {expand: true, cwd: 'bower_components/angular-bootstrap', src: ['ui-bootstrap-tpls.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/font-awesome', src: ['fonts/*'], dest: 'client/assets/'},
      {expand: true, cwd: 'bower_components/bootstrap/dist/js', src: ['bootstrap.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/angular/', src: ['angular.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/moment/', src: ['moment.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/jquery/dist/', src: ['jquery.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/lodash/', src: ['lodash.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/toastr/', src: ['toastr.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/toastr/', src: ['toastr.css'], dest: 'client/css/'},
      {expand: true, cwd: 'bower_components/datatables/media/js/', src: ['jquery.dataTables.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/datatables-bootstrap3/BS3/assets/js/', src: ['datatables.js'], dest: 'client/js/lib/'},
      {expand: true, cwd: 'bower_components/datatables-bootstrap3/BS3/assets/images/', src: ['*'], dest: 'client/assets/img/'},
      {expand: true, cwd: 'bower_components/datatables-bootstrap3/BS3/assets/css/', src: ['datatables.css'], dest: 'client/css/'},
      {expand: true, cwd: 'bower_components/restangular/dist/', src: ['restangular.js'], dest: 'client/js/lib/'},
      {expand: true, src: ['*.json'], dest: 'client/home/'}
    ]
  },
  build: {
    files: [
      {expand: true, cwd: 'server/', src: ['**'], dest: 'build/server/'},
      {expand: true, cwd: 'client', src: ['**/*', '!css/**/*', '!js/**/*'], dest: 'build/client', filter: 'isFile'}
    ]
  }
};
