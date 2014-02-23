// Nicked from:
// http://jsfiddle.net/zdam/7kLFU/
// Added som BS styling of search field
webapp.directive(
  'datatables', function() {
  return function(scope, element, attrs) {
    // apply DataTable options, use defaults if none specified by user
    var options = {
        "bStateSave": false,
        //"iCookieDuration": 2419200, /* 1 month */
        "bJQueryUI": false,
        "bPaginate": true,
        "bLengthChange": true,
        "bFilter": true,
        "bInfo": true,
        "bDestroy": true,
        "sPaginationType": "bs_normal"
    };
    if (attrs.datatables.length > 0) {
      options =  $.extend(options,scope.$eval(attrs.datatables));
    }

    // Tell the dataTables plugin what columns to use
    //We can either derive them from the dom, or use setup from the controller           
    var explicitColumns = [];
    element.find('th').each(function(index, elem) {
      explicitColumns.push($(elem).text());
    });
    if (explicitColumns.length > 0) {
      options.aoColumns = explicitColumns;
    } else if (attrs.aoColumns) {
      options.aoColumns = scope.$eval(attrs.aoColumns);
    }

    if (attrs.aoColumnDefs) {
      options.aoColumnDefs = scope.$eval(attrs.aoColumnDefs);
    }

    if (attrs.fnRowCallback) {
      options.fnRowCallback = scope.$eval(attrs.fnRowCallback);
    }

    //apply the plugin
    var dataTable = element.dataTable(options);

    var $dataTable = $(dataTable);
    // SEARCH - Add the placeholder for Search and Turn this into in-line form control
    var search_input = $dataTable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
    search_input.attr('placeholder', 'Search');
    search_input.addClass('form-control input-sm');
    // LENGTH - Inline-Form control
    var length_sel = $dataTable.closest('.dataTables_wrapper').find('div[id$=_length] select');
    length_sel.addClass('form-control input-sm');
    $dataTable.bind('page', function(e){
      if (window.console) console.log('pagination event:', e); //this event must be fired whenever you paginate
    });

    //watch for any changes to our data, rebuild the DataTable
    scope.$watch(attrs.aaData, function(value) {
      var val = value || null;
      if (val) {
        dataTable.fnClearTable();
        dataTable.fnAddData(scope.$eval(attrs.aaData));
      }
    });
  };
});

