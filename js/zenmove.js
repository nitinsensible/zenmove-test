$(document).ready(function() {


    // Logo rollover
    $(".main-logo").mouseenter(function () {
        $(this).transition({ rotate: "3deg"}, 30).transition({ rotate: "-3deg"}, 30).transition({ rotate: "3deg"}, 30).transition({ rotate: "-3deg"}, 30).transition({ rotate: "0deg"}, 30)
    });

    $('#tags').tagsInput();

    // Mobile Dashboard grabber
    if (screen.width <= 767) {
         $(".grabber").appendTo('.header .container');
    }
    $(".control-panel li").click(panelFire);

    $(".control-panel li").click(function () {
        $(".control-panel li").removeClass("active");
    });
    $(".user-dashboard .sub-tabs li a").click(function () {
        $(".user-dashboard .sub-tabs li a").removeClass("active");
    });

    // Move Request Form =========

    $("#move-request-form .next").click(function () {
        // check to see if the user is logged in
        if (Parse.User.current()) {
            $("#move-request-form .step-1").fadeOut(150, function () {
                $("#move-request-form .step-2").fadeIn(150);
            });
            $("#pg2 .progress-bar-inner").transition({ width: '75%'});
        }
        // if user is not logged in, log them in
        else {
            // make a note that the user was trying to post a list so we can redirect them back to this form
            $("#scout-request-form").removeClass("posting");
            $("#move-request-form").addClass("posting");
            window.location = '#/login';
            popMessage('Please login or signup to continue posting.');
        }
    });

    // job type function
    $("#move-request-form .job-list li").click(function () {
        var index = $("#move-request-form .job-list li").index(this);
        var jobtype = $("#job-type");
        switch(index) {
            case 0:
                $(this).toggleClass("active");
                var pv = $("#packing").val();
                if (pv === "no") {
                    $("#packing").val("yes");
                }
                else {
                    $("#packing").val("no");
                }

                break;
            case 1:
                $("#move-request-form .job-list li:eq(2)").removeClass("active");
                $(this).addClass("active");
                var SMM = $("#move-request-form .job-list li:eq(1)");
                if (SMM.hasClass("active")) {
                    $("#job-type").attr("value", "smallmove");
                }
                else {
                    $("#job-type").attr("value", "");
                }
                break;
            case 2:
                $("#move-request-form .job-list li:eq(1)").removeClass("active");
                $(this).addClass("active");
                var BM = $("#move-request-form .job-list li:eq(2)");
                if (BM.hasClass("active")) {
                    $("#job-type").attr("value", "bigmove");
                }
                else {
                    $("#job-type").attr("value", "");
                }
                break;
        }
    });

    // Submit move request form
    /*
    $("#move-request-form").submit(function () {
        packing = $("#packing").val();
        job_type = $("#job-type").val();
        start_address = $("#mr-starting-address").val();
        end_address = $("#mr-ending-address").val();
        description = $("#move-request-descrip").val();
        move_date = $("#move-date option:selected").val();
        move_time = $("#move-time option:selected").val();
    });

    //go back
    $("#move-request-form .step-2 .back").click(function () {
        $("#move-request-form .step-2").fadeOut(150, function () {
            $("#move-request-form .step-1").fadeIn(150);
        });
        $("#pg2 .progress-bar-inner").transition({ width: '35%'});
    });
    */
    
    // Scout Request Form ========

    $("#scout-request-form .next").click(function () {
        // check to see if user is logged in
        if (Parse.User.current()) {
            $("#scout-request-form .step-1").fadeOut(150, function () {
                $("#scout-request-form .step-2").fadeIn(150);
            });
            $("#pg3 .progress-bar-inner").transition({ width: '75%'});
        }
        else {
            // make a note that the user was trying to post a list so we can redirect them back to this form
            $("#move-request-form").removeClass("posting");
            $("#scout-request-form").addClass("posting");
            window.location = '#/login';
            popMessage('Please login or signup to continue posting.');
        }
    });

    // Scout request form job choices
    $("#scout-request-form .scout-list li").click(function () {
        var index = $("#scout-request-form .scout-list li").index(this);
        switch(index) {
            case 0:
                $(this).toggleClass("active");
                if ($(this).hasClass("active")) {
                    $("#find-place").val("1");

                }
                else {
                    $("#find-place").val("0");
                }
            break;
            case 1:
                $(this).toggleClass("active");
                if ($(this).hasClass("active")) {
                    $("#set-apt").val("1");

                }
                else {
                    $("#set-apt").val("0");
                }
            break;
            case 2:
                $(this).toggleClass("active");
                if ($(this).hasClass("active")) {
                    $("#drive-me").val("1");

                }
                else {
                    $("#drive-me").val("0");
                }
            break;
        }
    });

    //go back

    $("#scout-request-form .step-2 .back").click(function () {
        $("#scout-request-form .step-2").fadeOut(150, function () {
            $("#scout-request-form .step-1").fadeIn(150);
        });
        $("#pg3 .progress-bar-inner").transition({ width: '35%'});
    });


    // Signup form choices ==================

    $(".signup-pop .user-list li").click(function () {
        var index = $(".signup-pop .user-list li").index(this);
        $(".signup-pop .user-list").fadeOut(150, function () {
            if (index === 0) {
                $("#hourly-rate").hide();
            }
            else {
                $("#hourly-rate").show();
            }
            $("#signup-form").fadeIn(150);
            $("#user-type").val(index);
        });
    });
    $(".signup-pop .form-back").click(function () {
        $(".signup-pop #signup-form").fadeOut(150, function () {
            $(".signup-pop .user-list").fadeIn(150);
        });
    });

    //signup
    $("#signup-form").submit(function () {
        email = $("#signup-email").val();
        password = $("#signup-password").val();
        name = $("#name").val();
        citystate = $("#citystate").val();
        type = $("#user-type").val();
        window.zenApp.signup(name,password,email,citystate,type);
    });

    //login
    $("#login-form").submit(function () {
        email = $("#email").val();
        password = $("#password").val();
        window.zenApp.login(email,password);
    });

}); // End document ready ===

                                                                                                // Global Functions =============================
    function helpList1() {
        $(".help-list:visible li:eq(0)").transition({ scale: 1.3, opacity: 0}, 250, function() {
            window.location = "#/move-request";
        });
        $(".help-list:visible li:eq(0)").transition({ scale: 1, opacity: 1, delay: 500},1);
    }
    function helpList2() {
        $(".help-list:visible li:eq(1)").transition({ scale: 1.3, opacity: 0}, 250, function() {
            window.location = "#/scout-request";
        });
        $(".help-list:visible li:eq(1)").transition({ scale: 1, opacity: 1, delay: 500},1);
    }

    function provideService() {
        window.location = "#/signup";
        $("ul.user-list li:eq(1)").trigger("click");
    }
    function slideOver() {
        $(this).slideDown();
    }

    var popMessage = function (message) {
        $('<div class="global-pop"><div class="inner"><h4 class="center-title">' + message + '</h4></div></div>').insertAfter(".dash-pop");
        $(".global-pop").click(function () {
            $(this).fadeOut(150, function () {
               $(this).remove();
            });
        });
    }
