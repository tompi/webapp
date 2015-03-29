angular
  .module('webapp', ['ngRoute', 'restangular', 'ui.bootstrap'])
  .config(
  ['$routeProvider', 'RestangularProvider',
    function($routeProvider, RestangularProvider) {
      $routeProvider.
        when('/',
             {
               templateUrl: 'home/home.html',
               controller: 'HomeCtrl'
             }).
        when('/forms',
             {
                templateUrl: 'forms/forms.html',
                controller: 'FormsCtrl'
             }).
        when('/dialogs',
             {
                templateUrl: 'dialogs/dialogs.html',
                controller: 'DialogsCtrl'
             }).
        when('/tables',
             {
                templateUrl: 'tables/tables.html',
                controller: 'TablesCtrl'
             }).
        when('/mongodb',
             {
                templateUrl: 'mongodb/mongodb.html',
                controller: 'MongodbCtrl'
             }).
        when('/passport',
             {
                templateUrl: 'passport/passport.html',
                controller: 'PassportCtrl'
             }).
        when('/about',
             {
                templateUrl: 'about/about.html',
                //controller: 'AboutCtrl'
             }).
        otherwise(
             {
                redirectTo: '/'
             });
      RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        return response.payload;
      });
      RestangularProvider.setRestangularFields({
        id: "_id",
      });
    }
]);
