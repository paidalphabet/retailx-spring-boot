$(document).ready(function(){
    var customer  = $('#customer').magicSuggest({
        allowFreeEntries: false,
        data: '/customer/name/' + $("#customer input[type=text]").val(),
        method: 'get',
        name: 'customer',
        maxSuggestions: 3,
        maxSelection: 1
    });

    $(customer).on('selectionchange', function(e,m){
      var customerDetails = this.getSelection()[0];
      $("#customerName").val(customerDetails.name);
      $("#customerID").val(customerDetails.code);
      $("#customerCredit").val(customerDetails.currentCredit);
    });

       var product  = $('#product').magicSuggest({
            allowFreeEntries: false,
            data: '/product/name/undefined',
            method: 'get'
        });

})