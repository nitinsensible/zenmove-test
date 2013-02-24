var payment = {
    submit_data: {},
};


payment.step1 = function() {
    payment.submit_data.card_number = $('#card_number').val();
    payment.submit_data.card_name = $('#card_name').val();
    payment.submit_data.card_month = $('#card_month').val();
    payment.submit_data.card_year = $('#card_year').val();
    payment.submit_data.card_cvc = $('#card_cvc').val();
    
    payment.submit();
};

/*
payment.step2 = function() {
    payment.submit_data.billing_street = $('#billing_street').val();
    payment.submit_data.billing_city = $('#billing_city').val();
    payment.submit_data.billing_state = $('#billing_state').val();
    payment.submit_data.billing_zip = $('#billing_zip').val();
    payment.submit_data.billing_phone = $('#billing_phone').val();

    payment.submit();
};
*/

payment.submit = function() {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/payment/credit_card",
        dataType: "json",
        data: JSON.stringify(payment.submit_data),
        success: function(data) {
            alert(data.result);
        } 
    });
};
