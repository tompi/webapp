angular.module('webapp').factory(
  'alertService', 
  [
    function() {
      var me = {};
      me.success = toastr.success;
      me.info = toastr.info;
      me.warning = toastr.warning;
      me.error = toastr.error;
      return me;
    }
  ]
);

