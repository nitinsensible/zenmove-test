var user = {
    pagination: 0,
    invoice: {},
    current: undefined,
    helper_id: undefined,
};

user.load_cookie_script = function() {
    if(typeof(cookie) != 'object') {
        $.ajax({
            url: 'js/cookie.js',
            async: false,
            dataType: "script",
        });
    } else {
        return cookie;
    }
};

user.sign_up = function(e, p, z, t) {
    var result;
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/sign-up",
        dataType: "json",
        data: JSON.stringify({ email: e, password: p, zip: z, type: t }),
        success: function(response) {
            if( response == 1 ) {
                result = true;
                $('.popup-wrap').remove();

                user.load_cookie_script();
                _user = user.details();
                cookie.create('email',  _user.email);
                cookie.create('cookie', _user.cookie);
            } else {
                alert(response.result);
                result = false;
            }
        },
    });
    return result;
};

user.sign_in = function(e, p){
    var user_data;
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/user/sign-in",
        async: false,
        dataType: "json",
        data: JSON.stringify({ email: e, password: p }),
        success: function(_user) {
            $('.popup-wrap').remove();
            if( _user ) {
                user.load_cookie_script();

                cookie.create('email',  _user.email);
                cookie.create('cookie', _user.cookie);

                user_data = _user;

                move_request.verify = true;
                scout_request.verify = true;
            } else {
                // set error messages
                alert('Sorry, that username / password combination does not exist.');
            }
        },
    });
    return user_data;
};

user.is_logged = function() {
    var response;
    $.ajax({
        type: "GET",
        url: "/api/user/is_logged",
        dataType: "text",
        async: false,
        success: function(data) {
            response = data;
        },
    });
    return response;
};

user.update_password = function(u, p) {
    var response;
    $.ajax({
        contentType: "application/json",
        type: "PUT",
        url: "/api/user/" + u,
        dataType: "json",
        data: JSON.stringify({ password: p }),
        success: function(data) {
            response = data;
        },
    });
    return response;
};

user.delete = function(u) {
    var response;
    $.ajax({
        contentType: "application/json",
        type: "DELETE",
        url: "/api/user/" + u,
        dataType: "json",
        success: function(data) {
            response = data;
        },
    });
    return response;
};

user.logout = function() {
    user.load_cookie_script();

    $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/logout",
        success: function(data) {
            cookie.delete('email');
            cookie.delete('cookie');
            user.current = undefined;
        },
    });
};

user.verify_user = function() {
    var response;
    user.load_cookie_script();

    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/verify_user",
        dataType: "json",
        data: JSON.stringify({ email: cookie.read('email'), cookie: cookie.read('cookie') }),
        success: function(data) {
            response = data;
        },
    });
    return response;
};

user.details = function(){
   var response;
   $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/details",
        dataType: "json",
        success: function(data) {
            response = user.current = data;
        },
    });
    if( user.current.user_type == null ) {
        $('.helper-type-choice').fadeIn();
    }

    return response;
};



user.helpers = function() {
   var response = false;
   $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/helpers/" + user.pagination,
        dataType: "json",
        complete: function(data) {
            var users = $.parseJSON(data.responseText);
            if ( users ) {
                $.each(users, function(index, _user) {
                    $('.search-results-box').append(
                        user.generate_html_helper( _user )
                    );
                    response = true;
                });
            }
        },
    });

    $('.invite-call').click(function() {
        var helper_id = $(this).parent().parent().attr('data-helper-id');
        $('.invite-box').attr('data-helper-id', helper_id);
    });

    $('#invite-submit').click(function() {
        var helper_id = $('.invite-box').attr('data-helper-id');
        var helper_request_id = $('#select-lists').val();
        var result = user.invite(helper_id, helper_request_id);
        if( result == 1 ) {
            $('.invite-box').hide();
            $('.success-msg').show();
        }
    });

    user.pagination = user.pagination + 5;
    return response;
};

user.generate_html_helper = function(_user) {
    return '<div class="search-result" data-helper-id="' + _user.helper_id + '">' +
        '<img src="/upload/'+ _user.picture +'" class="thumb">' +
        '<p class="name">' + _user.name + '</p>' +
        '<p class="type">' + _user.type + '</p>' +
        '<div class="rating">' +
            '<div class="star-1"></div>' +
            '<div class="star-2"></div>' +
            '<div class="star-3"></div>' +
            '<div class="star-4"></div>' +
            '<div class="star-5"></div>' +
        '</div>' +
        '<p class="hourly-rate">' + _user.rate + '<span>/ hr</span></p>' +
        '<ul class="candidate-options">' +
            '<li class="look-profile gray-grad">View Profile</li>' +
            '<li class="invite-call gray-grad">Invite To Listing</li>' +
        '</ul>' +
    '</div>' +
    '<div class="clear"></div>';
};


user.generate_profile = function() {
   $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/" + user.helper_id + "/profile",
        dataType: "json",
        success: function(data) {
            console.log('generate profile');
           console.log(data);
           $('.helper-profile').append(
                '<p class="go-back" onclick="history.go(-1);">&lt; &nbsp; Go Back</p>' +
                '<div class="content-box">' +
                    '<div class="profile-image">' +
                        '<img src="img/headshot-2.png">' +
                        '<div class="work">' +
                        '<div class="rating">' +
                            '<div class="star-1"></div>' +
                            '<div class="star-2"></div>' +
                            '<div class="star-3"></div>' +
                            '<div class="star-4"></div>' +
                            '<div class="star-5"></div>' +
                        '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="profile-description">' +
                        '<ul class="p-specs">' +
                        '<li><span>Travis Skweres</span></li>' +
                        '<li>Zip: <span>90064</span></li>' +
                        '</ul>' +
                        '<ul class="p-specs-2">' +
                        '<li>Jobs Completed: <span>10</span></li>' +
                        '<li>Hourly Rate<span>$35</span></li>' +
                        '</ul>' +
                        "<blockquote>I have been moving things for 20 years. I have amazing mover experience. If you hire me, you are sure to get a great job done. I have very low rates and do really good work, I can't wait to work for you!</blockquote>" +
                    '</div>' +
                    '<button class="blue-grad invite-them">Invite To Listing</button>' +
                    '<!--<button class="blue-grad msg-call">Send Message</button>-->' +
                    '<!--<button class="blue-grad hire-call">Hire This Helper</button>-->' +
                    '<div class="clear"></div>' +
                '</div>'
            );
        },
    });
};

user.profile = function() {
    var _user =  user.details();

    var difference = new Array();
    if( _user.user_type == 1 ) {
        difference.push('<h4>Helpers Hired: <span>2</span></h4>');
        difference.push('');
        difference.push('');
    } else {
        difference.push('<h4>Jobs Complete: <span>10</span></h4>');
        difference.push('<h4>Hourly Rate: <span>$' + _user.rate +'</span></h4>');
        difference.push('<div class="float-left"><label>Hourly Rate:</label><input id="hourly-rate" type="number" placeholder="ie: 30$" name="hourly-rate"></div>');
    }

    $('.profile-content').html(
		'<div class="content-box">'+
		    '<div class="profile-box"> <!-- Start User Profile -->' +
			'<div class="left-box">' +
			    '<h3>' + _user.name + '</h3>' +
			    '<img class="profile-main" src="/upload/'+ _user.picture +'" />' +
			'</div>' +
			'<div class="right-box">' +
                difference.shift() +
			    '<h4>Rating:</h4>' +
			    '<div class="rating">' +
			    '<div class="star-1"></div>' +
				'<div class="star-2"></div>' +
				'<div class="star-3"></div>' +
				'<div class="star-4"></div>' +
				'<div class="star-5"></div>' +
			    '</div>' +
                difference.shift() +
			    '<h4>Location: <span>' + _user.zip + '</span></h4>' +
			    '<h5>Description: <span>' + _user.description + '</span></h5>'+
			'</div>' +
			'<div class="clear"></div>' +
			'<a href="#" class="edit-profile">edit profile</a>' +
		    '</div>' +
		    '<div class="profile-edit-box" style="display: none;">' +
			'<h5>Change whatever fields you would like and save!</h5>' +
			'<form method="post" onsubmit="return false;" id="edit-profile" name="edit-profile">' +
			    '<div class="float-left">' +
				'<label>Name:</label>' +
				'<input type="text" name="name" id="name" value="' + _user.name  + '" />' +
			    '</div>' +
			    '<div class="float-left">' +
				'<label>Zip:</label>' +
				'<input type="number" name="zip" id="zip" value="' + _user.zip  +'" />' +
			    '</div>' +
			    '<div class="float-left">' +
				'<label>Image:</label>' +
				'<input type="file" name="profile-image" id="profile-image" value="'+ _user.picture +'">' +
			    '</div>' +
			    '<div class="float-left">' +
				'<label>Description:</label>' +
				'<textarea name="description" id="description">' + _user.description + '</textarea>' +
			    '</div>' +
                    difference.shift() +
			    '<div class="clear"></div>' +
			    '<input type="submit" id="submit" name="submit" value="Save" class="blue-grad" />' +
			    '<a href="#" class="cancel-profile">Cancel</a>' +
			    '<div class="clear"></div>' +
			'</form>' +
		    '</div> <!-- End User Profile -->'+
		'</div>');

};

user.search_helpers = function(_zip, _type) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/helpers/" + user.pagination,
        dataType: "json",
        data: JSON.stringify({ zip: _zip, type: _type }),
        success: function(_helpers) {
           $('#search-helpers-content').empty();
           $.each(_helpers, function(index, _user) {
                $('.search-results-box').append(
                    user.generate_html_helper( _user)
                );
           });
        }
    });
};

user.update_profile = function(_name, _description, _zip, _rate, _file) {
    $(".load-spinner").show();
    if( window.FileReader && window.FormData ) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            $.ajax({
                contentType: "application/json",
                type: "POST",
                async: false,
                url: "/api/user/profile",
                dataType: "json",
                data: JSON.stringify({
                    name: _name,
                    description: _description,
                    zip: _zip,
                    rate: _rate,
                    image: {
                        name: _file.name,
                        content: e.target.result.match(/,(.*)$/)[1],
                    },
                }),
                success: function() {
                    user.profile();
                    hideEditProfile();
                }
            }).done(function() {
                $('.load-spinner').hide();
            });
        };

        reader.readAsDataURL(_file);
    }
};

user.rate = function(r) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/rate",
        dataType: "json",
        data: JSON.stringify({ rate: r }),
    });
};

user.type = function(t) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/user/type",
        dataType: "json",
        data: JSON.stringify({ type: t }),
    });
};

user.request_list = function() {
    $.ajax({
        url: '/api/user/request_list',
        dataType: 'html',
        async: false,
        success: function(data) {
           $('#select-lists').append(data);
        },
    });
};


function _generate_helper_requests(requests) {
    $.each(requests, function(index, request) {
        if( request.request_type == 'mover' ) {
            var job_type_html;
            if( request.job_type == 1 ) {
                job_type_html = '<img src="img/pack.png"><h6>Just Packing</h6>';
            } else if( request.job_type == 2)  {
                job_type_html = '<img src="img/car.png"><h6>Small Move</h6>';
            } else if( request.job_type == 3 ) {
                job_type_html = '<img src="img/truck.png"><h6>Big Move</h6>';
            }

           $('<div class="one-list h" data-helper-id="' + request.helper_id  + '"> <!-- One listing for a Mover Request -->'+
                '<div class="img-and-type">'+
                    '<img src="img/box-icon.png" />'+
                    '<p>Mover Request</p>'+
                '</div>'+
                '<div class="dates">'+
                    '<p>Posted on: <span>' + request.posted + '</span></p>'+
                    '<p>Moving date: <span>' + request.start_date + '<span></p>'+
                '</div>'+
                '<div class="third">'+
                    job_type_html +
                '</div>'+
                '<div class="third">'+
                    '<div class="number-applicants">'+
                    '<h2>' + request.applicants + '<span>applicants</span></h2>'+
                    '</div>'+
                '</div>'+
                '<div class="third-last">'+
                    '<ul class="applicant-buttons">'+
                    '<li class="apply-job gray-grad">Apply to Job</li>'+
                    '<li class="look-listing-2 gray-grad">See Listing</li>'+
                    '</ul>'+
                '</div>'+
                '<div class="clear"></div>'+
            '</div>').insertAfter('.ztitle');
        } else {
            var types = JSON.parse( request.types );
            var types_html = "";
            $.each(types, function(index, value) {
                if( value == 'find-place') {
                   types_html = types_html + '<h5 class="scout-service">- Find me a place</h5>';
                } else if( value == 'set-apt' ) {
                    types_html = types_html + '<h5 class="scout-service">- Set appointments</h5>';
                } else if( value == 'drive-me' ) {
                    types_html = types_html + '<h5 class="scout-service">- Drive me</h5>';
                }
            });

            $('<div class="one-list h" data-helper-id="' + request.helper_id  + '"> <!-- One listing for a Scout Request -->' +
                '<div class="img-and-type">' +
                    '<img src="img/magnifying.png" />' +
                    '<p>Scout Request</p>' +
                '</div>' +
                '<div class="dates">' +
                    '<p>Posted on: <span>' + request.posted  + '</span></p>'+
                    '<p>Move in date: <span>' + request.start_date + '</span></p>'+
                '</div>'+
                '<div class="third">'+
                    types_html +
                '</div>'+
                '<div class="third">'+
                    '<div class="number-applicants">'+
                    '<h2>' + request.applicants  + '<span>applicants</span></h2>'+
                    '</div>'+
                '</div>'+
                '<div class="third-last">'+
                    '<ul class="applicant-buttons">'+
                    '<li class="apply-job gray-grad">Apply to Job</li>'+
                    '<li class="look-listing-2 gray-grad">See Listing</li>'+
                    '</ul>'+
                '</div>'+
                '<div class="clear"></div>'+
            '</div>').insertAfter('.ztitle');
        }
    });

    $('.look-listing-2').click(function(event) {
        $('.h-list-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
    });

    $('.apply-job').click(function(event) {
        var helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
        $('.apply-confirm button').attr('value', helper_request_id);
    });

    $('.apply-confirm button').click(function() {
        user.apply( $(this).attr('value') );
        return true;
    });
};

user.search_helper_requests = function(_zip, _type) {
    var _data;
    if( _zip && _type ) {
        _data = JSON.stringify({ zip: _zip, type: _type });
    }

    $.ajax({
        contentType: "application/json",
        url: '/api/user/search_helper_requests/' + user.pagination,
        type: 'POST',
        dataType: 'json',
        async: false,
        data: _data,
        success: function(requests) {
            _generate_helper_requests( requests );
            user.pagination = user.pagination + 1;
        },
    });
};

user.apply = function(id) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/apply",
        dataType: "text",
        data: JSON.stringify({ helper_request_id: id }),
    });
    $('.dash-pop').trigger('click');
};

user.hire = function(_helper_id, _helper_request_id) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/hire",
        dataType: "text",
        data: JSON.stringify({ helper_id: _helper_id, helper_request_id: _helper_request_id }),
    });
    $('.dash-pop').trigger('click');
};

user.hired_user = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "/api/user/hired/users",
        async: false,
        dataType: "json",
        success: function(responses) {
            $.each(responses, function(index, response) {
                var invoice_active = "";
                if( response.paid != 1 ) {
                    invoice_active = " active"
                }
                $('<div class="one-hired" data-helper-id="'+ response.helper_id + '" data-helper-request-id="' + response.helper_request_id  + '"> <!-- One hired helper -->'+
                    '<div class="hired-left">'+
                        '<img class="hired-img" src="/upload/'+ response.helper.picture +'">'+
                        '<h5>'+ response.helper.name  +'</h5>'+
                    '</div>'+
                    '<div class="hired-right">'+
                        '<ul class="hire-info">'+
                            '<li>Hired on: <span>'+ response.date +'</span></li>'+
                            '<li>Hired for: <span>' + response.request.title  + '</span></li>'+
                        '</ul>'+
                        '<!--<p class="no-action">This helper has not requested payment yet.</p> <!-- This only shows when there is no invoice, and goes away when there is -->'+
                        '<ul class="hire-commands">'+
                            '<li class="p-invoice ' + invoice_active +'"><span class="hh-bg"></span><span class="hh-title">Pay Invoice</span></li> <!-- Add Active Class if these are actionable -->'+
                            '<li class="r-rating active"><span class="hh-bg"></span><span class="hh-title">Rate Helper</span></li> <!-- Add Active Class if these are actionable -->'+
                        '</ul>'+
                        '<ul class="hire-options">'+
                            '<li class="archive-go gray-grad">Archive Helper</li>'+
                            '<li class="look-listing gray-grad">See Listing</li>'+
                            '<li class="look-profile gray-grad">View Profile</li>'+
                            '<li><a href="mailto:'+ response.helper.email  +'" class="gray-grad">Send Email</a></li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="clear"></div>'+
                '</div>').appendTo('.hires-main');
            });
            if (responses==0) {
                $('.actionable').remove();
                $('.hires-main').append('<h4 class="center-text" style="margin-top: 20px;">You have not hired any help yet, feel free to <a rel="address:/user-dashboard/post" href="elements/user-elements/post.html" address="true">post a listing</a> <br>or view your <a rel="address:/user-dashboard/main/your-listings" href="elements/user-elements/your-listings.html" address="true">current listings!</a></h4>')
            }
            else {
                var ratingAmount = $('.r-rating.active').length;
                $('.actionable span').text(ratingAmount + ' client(s)');
                $('.actionable').fadeIn(150);
            }
        },
    });

    $('.p-invoice').each(function(index,data) {
        if( !$(data).hasClass('active') ) {
            $(data).unbind('click');
        }
    });


    $('.look-listing').click(function(event) {
        $('.list-view-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');
    });

    $('.archive-go').click(function(event) {
        var helper_id = $(this).parent().parent().parent().attr('data-helper-id');
        var helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');
        $('.archive-confirm').attr('data-helper-id', helper_id);
        $('.archive-confirm').attr('data-helper-request-id', helper_request_id);
    });

    $('.archive-confirm button').click(function(event) {
        var helper_id = $(this).parent().attr('data-helper-id');
        var helper_request_id = $(this).parent().attr('data-helper-request-id');
        user.archive( helper_id, helper_request_id );
    });

    $('.archive-link').click(function(event) {
        $('.archived-helpers-go').trigger('click');
    });

    $('.p-invoice.active').click(function() {
        user.invoice.helper_id = $(this).parent().parent().parent().attr('data-helper-id');
        user.invoice.helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');
        user.generate_invoice( JSON.stringify( user.invoice ) );
    });
};

user.generate_invoice = function(json) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/user/get/invoice",
        async: false,
        dataType: "json",
        data: json,
        success: function(data) {
            $('.pop-pay').html(
                '<h3>Your Invoice:</h3>'+
                '<hr class="small">'+
                '<form method="post" onsubmit="return false;">'+
                    '<label>Job: <span>'+ data.request_type +' Request</span></label>'+
                    '<label>Helper: <span>'+ data.name  +'</span></label>'+
                    '<label>Hours Worked: <span>'+ data.amount / data.rate +'</span></label>'+
                    '<label># of Workers: <span>'+ 1 +'</span></label>'+
                    '<label>Hourly Rate: <span>$' + data.rate +'</span></label>'+
                    '<hr>'+
                    '<label>Invoice Total: <span>$'+ data.amount +'</span></label>'+
                    '<input id="pay-invoice" type="submit" class="blue-grad" value="Pay Invoice" />'+
                '</form>'
            );

            $('#pay-invoice').click(function() {
                $.ajax({
                    contentType: "application/json",
                    type: "GET",
                    url: "/api/payment/checkout",
                    async: false,
                    dataType: "json",
                    success: function(response) {
                        if( response ) {
                            alert(response.result);
                        }
                    },
                });
            });
        },
    });
};


user.hired_helper = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "/api/user/hired/helpers",
        async: false,
        dataType: "json",
        success: function(responses) {
            $.each(responses, function(index, response) {
                $('<div class="one-job" data-helper-id="'+ response.user_id + '" data-helper-request-id="' + response.helper_request_id  + '"> <!-- One hired helper -->'+
                    '<div class="hired-left">'+
                        '<p class="client-tag">Your Client:</p>'+
                        '<img class="hired-img" src="/upload/'+ response.user.picture +'">'+
                        '<h5>'+ response.user.name  +'</h5>'+
                    '</div>'+
                    '<div class="hired-right">'+
                        '<ul class="hire-info">'+
                            '<li>Hired on: <span>'+ response.date +'</span></li>'+
                            '<li>Hired for: <span>' + response.request.title  + '</span></li>'+
                        '</ul>'+
                        '<!--<p class="no-action">This helper has not requested payment yet.</p> <!-- This only shows when there is no invoice, and goes away when there is -->'+
                       '<ul class="hire-commands">'+
                            '<li class="p-invoice active"><span class="hh-bg"></span><span class="hh-title">Send Invoice</span></li> <!-- Add Active Class if these are actionable -->'+
                            '<li class="r-rating active"><span class="hh-bg"></span><span class="hh-title">Rate Customer</span></li> <!-- Add Active Class if these are actionable -->'+
                        '</ul>'+
                        '<ul class="hire-options">'+
                            '<li class="complete-go gray-grad">Mark Complete</li>'+
                            '<li class="look-listing-2 gray-grad">See Listing</li>'+
                            '<li class="look-profile-2 gray-grad">View Profile</li>'+
                            '<li><a href="mailto:'+ response.user.email  +'" class="gray-grad">Send Email</a></li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="clear"></div>'+
                '</div>').appendTo('.hired-jobs');
            });
            // notifications & if no responses text
            if (responses==0) {
                $('.actionable').remove();
                $('.hired-jobs').append('<h4 class="center-text" style="margin-top: 20px;">You have not been hired yet, please <a rel="address:/helper-dashboard/search" href="elements/helper-elements/search-listings.html" address="true">search some listings!</a></h4>')
            }
            else {
                var ratingAmount = $('.r-rating.active').length;
                $('.actionable span').text(ratingAmount + ' client(s)');
                $('.actionable').fadeIn(150);
            }
        },
    });

    $('.look-listing').click(function(event) {
        $('.list-view-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');
    });

    $('.archive-go').click(function(event) {
        var helper_id = $(this).parent().parent().parent().attr('data-helper-id');
        var helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');
        $('.archive-confirm').attr('data-helper-id', helper_id);
        $('.archive-confirm').attr('data-helper-request-id', helper_request_id);
    });

    $('.archive-confirm button').click(function(event) {
        var helper_id = $(this).parent().attr('data-helper-id');
        var helper_request_id = $(this).parent().attr('data-helper-request-id');
        user.archive( helper_id, helper_request_id );
    });
    $('.look-listing-2').click(function(event) {
        $('.h-list-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');
    });
    $(".look-profile-2").click(function(event) {
        $(".client-profile-go").trigger('click');
    });

    $('.p-invoice').click(function() {
        user.invoice.helper_id = $(this).parent().parent().parent().attr('data-helper-id');
        user.invoice.helper_request_id = $(this).parent().parent().parent().attr('data-helper-request-id');

        $.ajax({
            contentType: "application/json",
            type: "POST",
            url: "/api/get_details_for_ids",
            async: false,
            data: JSON.stringify( user.invoice ),
            dataType: "json",
            success: function(data) {
                $('.pop-invoice').html(
                    '<h3 class="center-text">Fill out your invoice:</h3>'+
                    '<hr class="small">'+
                    '<form method="post" onsubmit="return false;">'+
                        '<div class="left">'+
                        '<label>Job:</label>'+
                        '<p>'+ data.request_type +'Request</p>'+
                        '<label>Client:</label>'+
                        '<p>' + data.name + '</p>'+
                        '<label>Hourly Rate:</label>'+
                        '<p class="your-rate">$<span>' + user.current.rate + '</span></p>'+
                        '</div>'+
                        '<div class="right">'+
                        '<label>Hours Worked:</label>'+
                        '<input type="text" id="hours-worked" name="hours-worked" placeholder="ie: 5" />'+
                        '<label># of Workers:</label>'+
                        '<input type="text" id="number-workers" name="number-workers" value="1" />'+
                        '</div>'+
                        '<hr class="small">'+
                        '<label class="total-label">Total Invoice:</label>'+
                        '<p class="total-invoice">$<span></span></p>'+
                        '<input type="hidden" id="final-total" name="final-total" />'+
                        '<div class="clear"></div>'+
                        '<hr class="small">'+
                        '<input id="submit-invoice" type="submit" value="Send Invoice" class="blue-grad" />'+
                    '</form>'
                );
                $('#submit-invoice').click(function() {
                    user.invoice.amount = $('#final-total').val();
                    user.send_invoice( JSON.stringify( user.invoice ) );
                    $('.dash-pop').trigger('click');
                });
            },
        });
    });
};

user.send_invoice = function(json) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        url: "/api/user/send/invoice",
        async: false,
        data: json,
        dataType: "json",
        success: function() {
            // nothing to do right now
        },
    });
};

user.archived = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "/api/user/archived",
        async: false,
        dataType: "json",
        success: function(_helpers) {
        if (_helpers==0) {
            $('.archived-helpers-list .content-box').append('<h4 class="center-text" style="margin-top: 30px;">You have not hired any helpers in the past.</h4>');
        }
        else {
           user.request_list();
           $.each(_helpers, function(index, _user) {
                $('.archived-helpers-list .content-box').append(
                    user.generate_html_helper( _user)
                );
           });
        }
        }
    });
};


user.archive = function(_helper_id, _helper_request_id) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/archive",
        dataType: "json",
        data: JSON.stringify({ helper_id: _helper_id, helper_request_id: _helper_request_id }),
        success: function(response) {
            $('.dash-pop').trigger('click');
            $('.one-hired').remove();
            user.hired_user();
        }
    });
};

user.own_requests = function() {
    $.ajax({
        url: '/api/user/own_requests',
        dataType: 'json',
        async: false,
        success: function(requests) {
            $.each(requests, function(index, request) {
                if( request.request_type == 'mover' ) {
                    var job_type_html;
                    if( request.job_type == 1 ) {
                        job_type_html = '<img src="img/pack.png"><h6>Just Packing</h6>';
                    } else if( request.job_type == 2)  {
                        job_type_html = '<img src="img/car.png"><h6>Small Move</h6>';
                    } else if( request.job_type == 3 ) {
                        job_type_html = '<img src="img/truck.png"><h6>Big Move</h6>';
                    }

                    $('.lists-box').append(
                       ' <div class="one-list" data-helper-id="' + request.helper_id  + '"> <!-- One listing for a Mover Request -->'+
                            '<div class="img-and-type">'+
                                '<img src="img/box-icon.png" />'+
                                '<p>Mover Request</p>'+
                            '</div>'+
                            '<div class="dates">'+
                                '<p>Posted on: <span>' + request.posted + '</span></p>'+
                                '<p>Moving date: <span>' + request.start_date + '<span></p>'+
                            '</div>'+
                            '<div class="third">'+
                                job_type_html +
                            '</div>'+
                            '<div class="third">'+
                                '<div class="number-applicants">'+
                                    '<h2>' + request.applicants + '<span>applicants</span></h2>'+
                                '</div>'+
                            '</div>'+
                            '<div class="third-last">'+
                                '<ul class="applicant-buttons">'+
                                '<li class="look-apps gray-grad">View Applicants</li>'+
                                '<li class="look-listing gray-grad">See Listing</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="clear"></div>'+
                            '<a class="close-x">&times;</a>'+
                        '</div>'
                    );
                } else {
                    var types = JSON.parse( request.types );
                    var types_html = "";
                    $.each(types, function(index, value) {
                        if( value == 'find-place') {
                           types_html = types_html + '<h5 class="scout-service">- Find me a place</h5>';
                        } else if( value == 'set-apt' ) {
                            types_html = types_html + '<h5 class="scout-service">- Set appointments</h5>';
                        } else if( value == 'drive-me' ) {
                            types_html = types_html + '<h5 class="scout-service">- Drive me</h5>';
                        }
                    });
                    $('.lists-box').append(
                        '<div class="one-list" data-helper-id="' + request.helper_id  + '"> <!-- One listing for a Scout Request -->' +
                            '<div class="img-and-type">' +
                                '<img src="img/magnifying.png" />' +
                                '<p>Scout Request</p>' +
                            '</div>' +
                            '<div class="dates">' +
                                '<p>Posted on: <span>' + request.posted  + '</span></p>'+
                                '<p>Move in date: <span>' + request.move_in_date +'</span></p>'+
                            '</div>'+
                            '<div class="third">'+
                                types_html +
                            '</div>'+
                            '<div class="third">'+
                                '<div class="number-applicants">'+
                                    '<h2>' + request.applicants + '<span>applicants</span></h2>'+
                                '</div>'+
                            '</div>'+
                            '<div class="third-last">'+
                                '<ul class="applicant-buttons">'+
                                '<li class="look-apps gray-grad">View Applicants</li>'+
                                '<li class="look-listing gray-grad">See Listing</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="clear"></div>'+
                            '<a class="close-x">&times;</a>'+
                        '</div>'
                    );
                }
            });
            if (requests==0) {
                $('.lists-box').append('<h4 class="center-text" style="margin-top: 30px;">You have no current lists, please <a rel="address:/user-dashboard/post" href="elements/user-elements/post.html" address="true">post a listing!</a></h4>')
            }
        },
    });

    // append evends for append html
    $('.close-x').click(function(event) {
        var helper_request_id = $(this).parent().attr('data-helper-id');
        user.delete_requests( helper_request_id );
    });

    $('.look-apps').click(function(event) {
        $('.applicants-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
    });

    $('.look-listing').click(function(event) {
        $('.list-view-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
    });
};

user.applicants = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "/api/request/applicants/" + user.helper_request_id,
        dataType: "json",
        success: function(helpers) {
            $.each(helpers, function(index, _user) {
                user.generate_html_helper_applicant(user.helper_request_id, _user.helper_id );
            });
        },
    });

    $('.confirm-hire button').click(function(event) {
        var helper_id = $(this).parent().attr('data-helper-id');
        var helper_request_id = $(this).parent().attr('data-helper-request-id');
        user.hire(helper_id, helper_request_id);
    });
};

user.generate_html_helper_applicant = function(_helper_request_id, _user_id ) {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/" + _user_id + "/profile",
        dataType: "json",
        success: function(_user) {
            $('.view-applicants-box .content-box').append(
                '<div class="applicant-result" data-helper-id="' + _user_id  + '" data-helper-request-id="'+ _helper_request_id  +'"> <!-- One Applicant result -->' +
                    '<img src="img/headshot-2.png" class="thumb">'+
                    '<p class="name">'+ _user.name +'</p>'+
                    '<p class="type">Mover</p>'+
                    '<div class="rating">'+
                        '<div class="star-1"></div>'+
                        '<div class="star-2"></div>'+
                        '<div class="star-3"></div>'+
                        '<div class="star-4"></div>'+
                        '<div class="star-5"></div>'+
                    '</div>'+
                    '<p class="hourly-rate"> $' + _user.rate  + '<span>/ hr</span></p>'+
                    '<ul class="candidate-options">'+
                        '<li class="candidate-hire gray-grad">Hire This Helper</li>'+
                        '<li class="look-profile gray-grad">View Profile</li>'+
                    '</ul>'+
                '</div>' +
                '<div class="clear"></div>'
            );
        },
    });

    $('.candidate-hire').click(function(event) {
        var helper_id = $(this).parent().parent().attr('data-helper-id');
        var helper_request_id = $(this).parent().parent().attr('data-helper-request-id');
        $('.confirm-hire').attr('data-helper-id', helper_id);
        $('.confirm-hire').attr('data-helper-request-id', helper_request_id);
    });
};

user.delete_requests = function(helper_request_id) {
    $.ajax({
        contentType: "application/json",
        type: "DELETE",
        url: "/api/user/request/" + helper_request_id,
        dataType: "json",
    });
};

user.request_details = function() {
    console.log(user.current);
    $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/request/" + user.helper_request_id,
        dataType: "json",
        success: function(request) {

            var profile_link;
            if( user.current.user_type == 1 ) {
                profile_link = "/#/user-dashboard/my-profile";
            } else {
                profile_link = "/#/helper-dashboard/client-profile";
            }

            if( request.request_type == "mover" ) {
                var job_type_html = "";
                if( request.job_type == 1 ) {
                    job_type_html = '<span class="j-small"></span><span class="mt">Just Packing</span>';
                } else if( request.job_type == 2)  {
                    job_type_html = '<span class="j-med"></span><span class="mt">Small Move</span>';
                } else if( request.job_type == 3 ) {
                    job_type_html = '<span class="j-big">&nbsp;</span><span class="mt">Big Move</span>';
                }

                var request_date = request.start_date.split('-');
                var request_time = request.start_time.split('-');

                $('.view-this-listing').html(
                    '<div class="mover-request-listing">'+
                        '<p class="go-back" onclick="history.go(-1);">&lt; &nbsp; Go Back</p>'+
                        '<div class="content-box">'+
                            '<div class="listing-body">'+
                                '<img class="icon-type" src="img/box-icon.png" />'+
                                '<h6 class="posted-on">List posted on: <span>'+ request.posted +'</span></h6>'+
                                '<h2 class="listing-title">'+ request.title +'</h2>'+
                                '<div class="clear"></div>'+
                                '<hr>'+
                                '<div class="box first-box">'+
                                    '<span class="row-label">Job Type:</span>'+
                                    '<div class="box-in">'+
                                        job_type_html +
                                    '</div>'+
                                '</div>'+
                                '<div class="box calendar">'+
                                    '<span class="row-label">Moving Date:</span>'+
                                    '<div class="box-in">'+
                                        '<span class="calendar-month">'+ request_date[1] +'</span>'+
                                        '<span class="calendar-day">'+ request_date[0] +'</span>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="box clock">'+
                                    '<span class="row-label">Moving Time:</span>'+
                                    '<div class="box-in">'+
                                        '<div class="clock-left"></div>'+
                                        '<div class="clock-right"></div>'+
                                        '<div class="hour-wrap">'+
                                            '<span class="hour">'+ request_time[0] +'</span>'+
                                            '<span class="am-pm">'+ request_time[1] +'</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="clear"></div>'+
                                '<hr>'+
                                '<ul class="map-holder">'+
                                    '<li class="map">'+
                                        '<h4 style="text-align: center;line-height: 160px;">map goes here</h4>'+
                                    '</li>'+
                                    '<li class="l-description">'+ request.description +'</li>'+
                                '</ul>'+
                                '<div class="clear"></div>'+
                                '<a class="show-post" href="' + profile_link  + '">View User"s Profile</a>'+
                                '<div class="clear"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );
            } else {
                var request_date = request.move_in_date.split('-');

                var types = JSON.parse( request.types );
                var types_html = "";
                $.each(types, function(index, value) {
                    if( value == 'find-place') {
                       types_html = types_html + '<span class="scout-duties s1">Find Me A Place</span>';
                    } else if( value == 'set-apt' ) {
                        types_html = types_html + '<span class="scout-duties s2">Set Appointments</span>';
                    } else if( value == 'drive-me' ) {
                        types_html = types_html + '<span class="scout-duties s3">Drive Me</span>';
                    }
                });


                $('.view-this-listing').html(
                    '<div class="scout-request-listing">'+
                        '<p class="go-back" onclick="history.go(-1);">&lt; &nbsp; Go Back</p>'+
                            '<div class="content-box">'+
                                '<div class="listing-body">'+
                                    '<img class="icon-type" src="img/magnifying.png" />'+
                                    '<h6 class="posted-on">List posted on: <span>' + request.posted +'</span></h6>'+
                                    '<h2 class="listing-title">Scout an apartment in: <span>'+ request.location_description  +'</span></h2>'+
                                    '<div class="clear"></div>'+
                                    '<hr>'+
                                    '<div class="box first-box">'+
                                        '<span class="row-label">Duties:</span>'+
                                        '<div class="box-in">'+
                                            types_html +
                                        '</div>'+
                                    '</div>'+
                                    '<div class="box calendar">'+
                                        '<span class="row-label">Move-In Date:</span>'+
                                        '<div class="box-in">'+
                                            '<span class="calendar-month">'+ request_date[1] +'</span>'+
                                            '<span class="calendar-day">'+ request_date[0] +'</span>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="box">'+
                                        '<span class="row-label">Rental Specs:</span>'+
                                        '<div class="box-in specs">'+
                                            '<p>bed:<span>'+  request.bedrooms_number +'</span></p>'+
                                            '<p>bath:<span>'+ request.bathrooms_number +'</span></p>'+
                                            '<p>rent:<span>$'+ request.monthly_budget +'</span></p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="clear"></div>'+
                                    '<hr>'+
                                    '<ul class="map-holder">'+
                                        '<li class="map">'+
                                            '<h4 style="text-align: center;line-height: 160px;">map goes here</h4>'+
                                        '</li>'+
                                        '<li class="l-description">'+ request.location_description +'</li>'+
                                    '</ul>'+
                                    '<div class="clear"></div>'+
                                    '<a class="show-post" href="'+ profile_link  +'">View User"s Profile</a>'+
                                    '<div class="clear"></div>'+
                                '</div>'+
                            '</div>'+
                    '</div>'
                );
            }
        },
    });
};

user.invite = function(h_id, h_request_id) {
    var response;
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/invite",
        dataType: "json",
        data: JSON.stringify({ helper_id: h_id, helper_request_id: h_request_id }),
        success: function(r) {
            response = r;
        },
    });
    return response;
};

user.delete_invite = function(_helper_request_id) {
    $.ajax({
        contentType: "application/json",
        type: "DELETE",
        async: false,
        url: "/api/user/invites",
        dataType: "json",
        data: JSON.stringify({ helper_request_id: _helper_request_id }),
        success: function(data) {
            user.count_invites();
            user.invites();
        }
    });
};

user.invites = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: '/api/user/invites',
        dataType: 'json',
        async: false,
        success: function(requests) {
            $('.one-list').remove();
            $.each(requests, function(index, request) {
                if( request.request_type == 'mover' ) {
                    var job_type_html;
                    if( request.job_type == 1 ) {
                        job_type_html = '<img src="img/pack.png"><h6>Just Packing</h6>';
                    } else if( request.job_type == 2)  {
                        job_type_html = '<img src="img/car.png"><h6>Small Move</h6>';
                    } else if( request.job_type == 3 ) {
                        job_type_html = '<img src="img/truck.png"><h6>Big Move</h6>';
                    }

                    $('.job-invites .content-box').append(
                       ' <div class="one-list" data-helper-id="' + request.helper_id  + '"> <!-- One listing for a Mover Request -->'+
                            '<div class="img-and-type">'+
                                '<img src="img/box-icon.png" />'+
                                '<p>Mover Request</p>'+
                            '</div>'+
                            '<div class="dates">'+
                                '<p>Posted on: <span>' + request.posted + '</span></p>'+
                                '<p>Moving date: <span>' + request.start_date + '<span></p>'+
                            '</div>'+
                            '<div class="third">'+
                                job_type_html +
                            '</div>'+
                            '<div class="third">'+
                                '<div class="number-applicants">'+
                                    '<h2>' + request.applicants + '<span>applicants</span></h2>'+
                                '</div>'+
                            '</div>'+
                            '<div class="third-last">'+
                                '<ul class="applicant-buttons">'+
                                    '<li class="apply-job">Apply For Job</li>'+
                                    '<li class="look-listing">See Listing</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="clear"></div>'+
                            '<a class="close-x">&times;</a>'+
                        '</div>' +
                        '<div class="clear"></div>'
                    );
                } else {
                    var types = JSON.parse( request.types );
                    var types_html = "";
                    $.each(types, function(index, value) {
                        if( value == 'find-place') {
                           types_html = types_html + '<h5 class="scout-service">- Find me a place</h5>';
                        } else if( value == 'set-apt' ) {
                            types_html = types_html + '<h5 class="scout-service">- Set appointments</h5>';
                        } else if( value == 'drive-me' ) {
                            types_html = types_html + '<h5 class="scout-service">- Drive me</h5>';
                        }
                    });
                    $('.job-invites .content-box').append(
                        '<div class="one-list" data-helper-id="' + request.helper_id  + '"> <!-- One listing for a Scout Request -->' +
                            '<div class="img-and-type">' +
                                '<img src="img/magnifying.png" />' +
                                '<p>Scout Request</p>' +
                            '</div>' +
                            '<div class="dates">' +
                                '<p>Posted on: <span>' + request.posted  + '</span></p>'+
                                '<p>Move in date: <span>' + request.move_in_date +'</span></p>'+
                            '</div>'+
                            '<div class="third">'+
                                types_html +
                            '</div>'+
                            '<div class="third">'+
                                '<div class="number-applicants">'+
                                    '<h2>' + request.applicants + '<span>applicants</span></h2>'+
                                '</div>'+
                            '</div>'+
                            '<div class="third-last">'+
                                '<ul class="applicant-buttons">'+
                                    '<li class="apply-job">Apply For Job</li>'+
                                    '<li class="look-listing">See Listing</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="clear"></div>'+
                            '<a class="close-x">&times;</a>'+
                        '</div>' +
                        '<div class="clear"></div>'
                    );
                }
            });
        },
    });

    $('.close-x').click(function(event) {
        var helper_request_id = $(this).parent().attr('data-helper-id');
        user.delete_invite( helper_request_id );
    });

    $('.apply-job').click(function(event) {
        var helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
        $('.apply-confirm button').attr('value', helper_request_id);
    });

    $('.apply-confirm button').click(function() {
        user.apply( $(this).attr('value') );
        return true;
    });

    $('.look-apps').click(function(event) {
        $('.applicants-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
    });

    $('.look-listing').click(function(event) {
        $('.list-view-go').trigger('click');
        user.helper_request_id = $(this).parent().parent().parent().attr('data-helper-id');
    });
};

user.get_profile_by_request_helper_id = function() {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/user/profile/request",
        dataType: "json",
        data: JSON.stringify({ helper_request_id: user.helper_request_id }),
        success: function(data) {
            if( data ) {
                $('.client-profile').html(
                    '<div class="content-box">'+
                        '<div class="profile-image">'+
                            '<img src="/upload/'+ data.picture +'">'+
                            '<div class="work">'+
                            '<div class="rating">'+
                                '<div class="star-1"></div>'+
                                '<div class="star-2"></div>'+
                                '<div class="star-3"></div>'+
                                '<div class="star-4"></div>'+
                                '<div class="star-5"></div>'+
                            '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="profile-description">'+
                            '<ul class="p-specs">'+
                                '<li><span>' + data.name  +'</span></li>'+
                                '<li>Zip: <span>' + data.zip + '</span></li>'+
                            '</ul>'+
                            '<ul class="p-specs-2">'+
                                '<li>Helpers Hired: <span>2</span></li>'+
                            '</ul>'+
                            '<blockquote>'+  data.description +'</blockquote>'+
                        '</div>'+
                        '<button class="blue-grad msg-call">Send Message</button>'+
                        '<div class="clear"></div>'+
                    '</div>'
                );
            }
        },
    });
};

user.count_invites = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/user/invites/count",
        success: function(no) {

        if (no==0) {
            $('.invite-notif').remove();
        }
        else {
            $('.invite-notif span').text(no + ' job invite(s) ');
        }

        },
    });
};

user.total_amount = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        async: false,
        url: "/api/invoice/amount",
        dataType: "json",
        success: function(response) {
            response.amount
            var amount;
            if( response.amount == null ) {
                amount = 0;
            } else {
                amount = response.amount;
            }
            $('.your-balance span').html('$' + amount);
        },
    });
};


user.save_bank_account = function() {
    var bank = {};

    bank.name = $('#bank-name').val();
    bank.routing_number = $('#bank-routing-number').val();
    bank.account_number = $('#bank-account-number').val();
    bank.account_type = $('#bank-account-type').val();

    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/payment/bank_account",
        dataType: "json",
        data: JSON.stringify( bank ),
        success: function(response) {
            alert(response.result);
        },
    });

};

user.withdraw = function() {
    $.ajax({
        contentType: "application/json",
        type: "GET",
        url: "/api/payment/withdraw",
        async: false,
        dataType: "json",
        success: function(response) {
            alert(response.result);
        },
    });
};

user.promote_to_merchant = function(json_data) {
    $.ajax({
        contentType: "application/json",
        type: "POST",
        async: false,
        url: "/api/payment/merchant",
        dataType: "json",
        data: json_data,
        success: function(response) {
            alert(response.result);
        },
    });
};
