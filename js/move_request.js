var move_request = {
    submit_data: {},
    verify: true,
};

move_request.step1 = function() {
   bootstrap.load_user_request_script();

   if( !user.verify_user() ) {
      bootstrap.showLogIn();
      move_request.verify = false;
      return;
   }
   move_request.submit_data.starting_address = $('#move-request-form .step-1 #mr-starting-address').val();
   move_request.submit_data.ending_address = $('#move-request-form .step-1 #mr-ending-address').val();
   move_request.submit_data.job_type = $('#job-type').val();

   //validate params
};

move_request.step2 = function() {
    move_request.submit_data.title = $('#move-request-form .step-2 #move-request-title').val();
    move_request.submit_data.description = $('#move-request-form .step-2 #move-request-descrip').val();
    move_request.submit_data.start_date = $('#move-request-form .step-2 #move-date').val();
    move_request.submit_data.start_time = $('#move-request-form .step-2 #move-time').val();

    // validate params
    move_request.submit();
};

move_request.submit = function() {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/request/move",
        dataType: "json",
        data: JSON.stringify(move_request.submit_data),
        success: function(data) {
            alert('user::sign_up - ' + data );
        },
        complete: bootstrap.aftermoverpost,
    });
};
