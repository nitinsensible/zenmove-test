var bootstrap = {};

/****************** LOADERS ***********************/

bootstrap.load_script = function(script_location) {
    $.ajax({
        url: script_location,
        async: false,
        dataType: "script",
    });
};

bootstrap.load_user_request_script = function() {
    if(typeof(user) != 'object') {
        bootstrap.load_script('js/user_request.js');
    }
    user.pagination = 0;
    return user;
};

bootstrap.load_payment_script = function() {
    if(typeof(payment) != 'object') {
        console.log('then');
        bootstrap.load_script('js/payment_request.js');
    } else {
        console.log('else');
    }
    return payment;
};

bootstrap.load_scout_request_script = function() {
    if(typeof(scout_request) != 'object') {
        bootstrap.load_script('js/scout_request.js');
    }
    return scout_request;
};

bootstrap.load_move_request_script = function() {
    if(typeof(move_request) != 'object') {
        bootstrap.load_script('js/move_request.js');
    }
    return move_request;
};
/************* LOADERS END **********************/


// ****************************************************************************** Home Page Interactions ******************************************************************************

//append ajax data
bootstrap.successAppend = function(data) {
    $(".body-wrap .page-body").html(data);
    var children = $(".body-wrap .page-body").children();
    $.each(children, function(index, child) {
        if( $(child).hasClass('helper-type-choice') ) {
            if(typeof(user) == 'object' && user.current.user_type == null ) {
                $(child).fadeIn(150);
            } else {
                $(child).remove();
            }
        } else {
            $(child).fadeIn(150);
        }
   });
};

//Show Home Page ======
bootstrap.showHomePage = function() {
    $(".page-body").children().fadeOut(150, function() {
        $.ajax({
            url: '/elements/home-body.html',
            async: false,
            dataType: 'html',
            cache: true,
            success: bootstrap.successAppend,
        });
    });
};

bootstrap.showDefaultHeader = function() {
    switchUserHeaders('elements/header.html');
};

bootstrap.loadDashboardByUser = function(user_type) {
    if( parseInt(user_type) == 1 ) {
        return;
    } else {
        bootstrap.showHelperDashboard();
    }
};

bootstrap.loadHeaderByUser = function(user_type) {
    if( parseInt(user_type) == 1 ) {
        switchUserHeaders('elements/user-header-logged-in.html');
    } else {
        switchUserHeaders('elements/helper-header-logged-in.html');
    }
};

bootstrap.load_requests = function(html_element) {

    $.ajax({
        url: html_element,
        dataType: 'html',
        cache: true,
        success: bootstrap.successAppend,
    });
};

//Move Request Page ======
bootstrap.showMoveRequest = function() {
    $(".help-list li:eq(0)").addClass("active");
    // require move_request.js script
    $.getScript('js/move_request.js', function() {
        //insert jquery controls from transition.js
    moveRequestControls();
    });
};

bootstrap.showScoutRequest = function() {
    $(".help-list li:eq(1)").addClass("active");
    //insert jquery controls from transition.js
    $.getScript('js/scout_request.js', function() {
        scoutRequestControls();
    });
};

// ****************************************************************************** Pop Up Interactions ******************************************************************************

bootstrap.popAppend = function(data) {
    $(".popup-body").html(data);
    //on click commands
    userFormControls();
};

bootstrap.signupShow = function() {
    $(".popup-body").children().fadeIn(150, function() {
        $(".signup-pop").fadeIn(150);
    });
};

bootstrap.loginShow = function() {
    $(".popup-body").children().fadeIn(150, function() {
        $(".login-pop").fadeIn(150);
    });
};

bootstrap.popUpHide = function() {
    $(".popup-body").children().fadeOut(150);
}

bootstrap.load_user_form = function(completeHandler) {
    $.ajax({
        url: 'elements/user-forms.html',
        dataType: 'html',
        async: false,
        cache: true,
        success: bootstrap.popAppend,
        complete: completeHandler,
    });
}

//Show Signup ======
bootstrap.showSignUp = function() {
    bootstrap.load_user_form( bootstrap.signupShow );
};
bootstrap.servicesSignup = function() {
    bootstrap.load_user_form( bootstrap.signupShow );
    $(".user-list > li:eq(1)").trigger("click");
}

//Show Signup ======
bootstrap.showLogIn = function() {
    bootstrap.load_user_form( bootstrap.loginShow );
};

// ******************************************************************************Dashboard Interactions ******************************************************************************
//Show User Dashboard ======

bootstrap.load_dashboard = function(html_element) {
  $.ajax({
        url: html_element,
        async: false,
        dataType: 'html',
        cache: true,
        beforeSend: function() {
            bootstrap.popUpHide();
        },
        success: bootstrap.successAppend,
    });
};

// simulate live event
//$(document).on("click", "#t4", function(event) {
    $(document).unbind('loadingHtmlElementsComplete.profile').bind('loadingHtmlElementsComplete.profile', function() {
       user.profile();
    });
//});

// simulate live event
$(document).on('click', '.helper-dashboard #t2', function() {
    $(document).unbind('loadingHtmlElementsComplete.search-listings').bind('loadingHtmlElementsComplete.search-listings', function() {
        user.pagination = 0;
    });
});

$(document).unbind('loadingHtmlElementsComplete.dashboard-content').bind('loadingHtmlElementsComplete.dashboard-content', function() {
    user.details();
    if( user.current.user_type == 1 ) {
        user.hired_user();
    } else {
        user.hired_helper();
        user.count_invites();
        $('.invite-notif').click(function(event) {
            user.invites();
        });
    }
});

$(document).unbind('loadingHtmlElementsComplete.payments').bind('loadingHtmlElementsComplete.payments', function() {
    user.total_amount();
    $('#bank-submit').click(function(){
        user.save_bank_account();
    });

    $('.payments-main .withdraw-money').click(function(){
        user.withdraw();
    });

    $('#personal-info-form .s-2 input[type=submit]').click(function() {
        var merchant_data = {};
        merchant_data.p_name = $('#p-name').val();
        merchant_data.p_phone = $('#p-phone').val();
        merchant_data.dob = $('#dob').val();
        merchant_data.p_zip = $('#p-zip').val();
        merchant_data.street_address = $('#street-address').val();

        merchant_data.b_name = $('#b-name').val();
        merchant_data.biz_address = $('#biz-address').val();
        merchant_data.b_phone = $('#b-phone').val();
        merchant_data.b_zip = $('#b-zip').val();
        merchant_data.tax_id = $('#tax-id').val();

        console.log( JSON.stringify( merchant_data ) );

        user.promote_to_merchant( JSON.stringify( merchant_data ) );
    });
});

$(document).on('click', '.helper-info-go', function() {
    $(".payments-main").fadeOut(150, function() {
        $(".bank-and-business").fadeIn(150);
    });
});
$(document).on('click', '.banking-go-back', function() {
    $(".bank-and-business").fadeOut(150, function() {
        $(".payments-main").fadeIn(150);
    });
});


//$(document).on('click', '#your-listings', function() {
//    $('.one-list').remove();
//    user.own_requests();
//});
//
//$(document).on('click', '#search-helpers', function() {
//    user.pagination = 0;
//    $('.search-results-box').empty();
//    user.helpers();
//    // load user requests
//    user.request_list();
//});
//
//$(document).on('click', '#hired-helpers', function() {
//    $('.one-hired').remove();
//    user.hired_user();
//});

$(document).on('click', '#edit-profile #submit', function() {
    var name =  $('#edit-profile #name').val();
    var zip =  $('#edit-profile #zip').val();
    var description =  $('#edit-profile #description').val();
    var rate = $('#hourly-rate').val();
    var file = $('#profile-image').prop('files')[0];

    user.update_profile(name, description, zip, rate, file);
});


bootstrap.showUserDashboard = function() {
    $('a.userDashGo').trigger("click");

    //insert jquery controls from transition.js
    userDashControls();
};

bootstrap.aftermoverpost = function() {
    $(".moving-main .progress-bar-inner").animate({width: "100%"}, 100);
    setTimeout(function() {
        $(".moving-main .progress-bar img").fadeIn(150);
    }, 200);

    function afterMove() {
//        var url = "http://dev.padhelper.com/#/user-dashboard/main/your-listings"
// CHANGED FROM ABSOLUTE TO RELATIVE URL
	var url = "/#/user-dashboard/main/your-listings"
        window.location = url
    }
    setTimeout(afterMove, 500);
};

bootstrap.afterscoutpost = function() {
    $(".finding-main .progress-bar-inner").animate({width: "100%"}, 100);
    setTimeout(function() {
        $(".finding-main .progress-bar img").fadeIn(150);
    }, 200);
    function afterScout() {
//        var url = "http://dev.padhelper.com/#/user-dashboard/main/your-listings"
// CHANGED FROM ABSOLUTE TO RELATIVE URL
	var url = "/#/user-dashboard/main/your-listings"
        window.location = url
    }
    setTimeout(afterScout, 500);
};

bootstrap.set_user_type = function(user_type) {
    bootstrap.load_user_request_script();
    user.type(user_type);
};

bootstrap.set_user_rate = function(user_rate) {
    bootstrap.load_user_request_script();
    user.rate( user_rate );
};

//Show Helper Dashboard ======

bootstrap.showHelperDashboard = function() {
    $('a.helperDashGo').trigger("click");

    //insert jquery controls from transition.js
    helperDashControls();
};

// ****************************************************************************** Login, Signup ******************************************************************************


// Verify if we have a logged user
    function verify_user() {
        bootstrap.load_user_request_script();

        var response = user.verify_user();
        if( response == true ) {
            user_data = user.details();
            bootstrap.loadHeaderByUser( user_data.user_type );
        }
    }

// Signing in functionality ======
    function signMeUp(){
        var email = $('.signup-pop form #signup-email').val();
        var password = $('.signup-pop form #signup-password').val();
        var zip = $('.signup-pop form #zip').val();
        var user_type = $('.signup-pop #user-type').val();

        // load user_request library before calling sign_up
        bootstrap.load_user_request_script();

        var result = user.sign_up(email, password, zip, user_type);
        if( result == true ) {
            // if they signup as a user, take them to user dashboard
            // else go to helper dashboard
            bootstrap.loadDashboardByUser( user_type );
            bootstrap.loadHeaderByUser( user_type );
            $(".services-link").remove();
        }
    }

// Logging in functionality ======
    function logMeIn(){
        var email = $('.login-pop form #email').val();
        var password = $('.login-pop form #password').val();

        bootstrap.load_user_request_script();
        var user_data = user.sign_in(email, password);

        var url;
        if( user_data ) {
            if( user_data.user_type == 1 ) {
              bootstrap.loadHeaderByUser( user_data.user_type );
            } else {
                url = "/#/helper-dashboard/main";
                window.location = url;
            }
        }

        $(".login-pop").fadeOut(150);
        $('.popup-wrap').trigger('click');
        $(".services-link").remove();
    }

// Logout function
    function logout() {
        bootstrap.load_user_request_script();
        user.logout();
        bootstrap.showDefaultHeader();
        bootstrap.showHomePage();
        if (screen.width <= 767) {
        $('.h-cog').attr("class", "h-cog off");
        $(".top-right-nav ul").fadeOut(150);
        $('body').attr('class', '');
        }
    }

// Page Navigation =============================================================================================

$(document).ready(function(){

    // Event handlers
    var segment;
    $.address.init(function(event) {
        console.log("init: " + $('[rel="address:' + event.value + '"]').attr('href'));
        segment = $('[rel="address:' + event.value + '"]').attr('href');
    }).change(function(event) {
        if (event.value.indexOf('/user-dashboard/') === 0 || event.value.indexOf('/helper-dashboard/' === 0)) {
            if (
                    event.value == '/user-dashboard/messages'                           ||
                    event.value == '/user-dashboard/main/hired-helpers'                 ||
                    event.value == '/user-dashboard/main/your-listings'                 ||
                    event.value == '/user-dashboard/main/search-helpers'                ||
                    event.value == '/user-dashboard/my-profile'                         ||
                    event.value == '/user-dashboard/payments'                           ||
                    event.value == '/user-dashboard/post'                               ||
                    event.value == '/user-dashboard/helper-profile'                     ||
                    event.value == '/user-dashboard/list-view'                          ||
                    event.value == '/user-dashboard/archived-helpers'                   ||
                    event.value == '/user-dashboard/applicants'                         ||
                    event.value == '/user-dashboard/message-body'                       ||
                    event.value == '/helper-dashboard/search'                           ||
                    event.value == '/helper-dashboard/messages'                         ||
                    event.value == '/helper-dashboard/main'                             ||
                    event.value == '/helper-dashboard/job-invites'                      ||
                    event.value == '/helper-dashboard/my-profile'                       ||
                    event.value == '/helper-dashboard/list-view'                        ||
                    event.value == '/helper-dashboard/client-profile'                   ||
                    event.value == '/helper-dashboard/pending'                          ||
                    event.value == '/helper-dashboard/payments'
             ) {


                if (event.value.indexOf('/user-dashboard') === 0){
                    var outerUrl = '/elements/user-dashboard.html';
                } else if (event.value.indexOf('/helper-dashboard') === 0) {
                    var outerUrl = '/elements/helper-dashboard.html';
                }

                $('.body-wrap .page-body').load(outerUrl, function(){

                    $('.body-wrap .page-body .dash-master').load(
                            $('[rel="address:' + event.value + '"]').attr('href'), function() {
                                // loading is complete. Now we can send custom complete event ( loadingHtmlElementsComplete )
                                var custom = $('[rel="address:' + event.value + '"]').attr('href').split('/');
                                console.log('loading complete ... loadingHtmlElementsComplete.' + custom[custom.length - 1].replace('.html',''));
                                $(document).trigger('loadingHtmlElementsComplete.' + custom[custom.length - 1].replace('.html','')),
                                $(".body-wrap .page-body .dash-master").children().fadeIn(150);
                            });
                    });

                $(document).ajaxComplete(function() {
                    $(".control-panel ul li").removeClass("active");
                    var showData = $(".dash-master li").attr('data');
                    $("li#" + showData).addClass("active");
                });
            }
            else {
                $(".body-wrap .page-body").load($('[rel="address:' + event.value + '"]').attr('href'), function() {
                    $(".body-wrap .page-body").children().fadeIn(150);

                    bootstrap.load_user_request_script();
                    if( user.is_logged() == "true" ) {
                        user.details();
                        if( user.current.user_type == 1 ) {
                            $('.services-link').remove();
                        } else {
                            window.location.href = '#/helper-dashboard/main';
                        }
                    }
                });

                    // If a mobile device, hide dashboard grabber from header, when not in header
                    if (screen.width <= 767) {
                      $(".grabber").appendTo('.bottom-div');
                   }
            }
        } else {
            console.log(' *********************************************');
        }
    });

});
