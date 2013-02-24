var scout_request = {
    submit_data: {},
    verify: true,
};

scout_request.step1 = function() {
   bootstrap.load_user_request_script();

   if( !user.verify_user() ) {
      bootstrap.showLogIn();
      scout_request.verify = false;
      return;
   }

   scout_request.submit_data.types = new Array();
   $('.scout-request-form input[type=hidden]').each(function(index, value) {
        if( $(this).attr('value') == 1  ) {
            scout_request.submit_data.types.push( $(this).attr('id') );
        }
   });

   scout_request.submit_data.tags = new Array();
   $('span.tag span').each(function(index,value) {
        scout_request.submit_data.tags.push( $.trim($(this).text()) );
   });
};

scout_request.step2 = function() {
    scout_request.submit_data.monthly_budget = $('#monthly-budget').val();
    scout_request.submit_data.bedrooms_number = $('#bedrooms-number').val();
    scout_request.submit_data.bathrooms_number = $('#bathrooms-number').val();
    scout_request.submit_data.move_in_date = $('#move-in-date').val();
    scout_request.submit_data.location_description = $('#location-description').val();

    scout_request.submit();
};

scout_request.submit = function() {
    console.log( scout_request.submit_data );
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/request/scout",
        dataType: "json",
        data: JSON.stringify(scout_request.submit_data),
        success: function(data) {
            alert('user::sign_up - ' + data );
        },
        complete: bootstrap.afterscoutpost,
    });
};
