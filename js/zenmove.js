$(document).ready(function() {

    var app = new ZenApp();
    window.zenApp = app;
    ko.applyBindings(app)

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

    // Move Request Form

    $("#move-request-form .next").click(function () {
        $("#move-request-form .step-1").fadeOut(150, function () {
            $("#move-request-form .step-2").fadeIn(150);
        });
        $("#pg2 .progress-bar-inner").transition({ width: '75%'});
    });

    //go back

    $("#move-request-form .step-2 .back").click(function () {
        $("#move-request-form .step-2").fadeOut(150, function () {
            $("#move-request-form .step-1").fadeIn(150);
        });
        $("#pg2 .progress-bar-inner").transition({ width: '35%'});
    });

    // Scout Request Form

    $("#scout-request-form .next").click(function () {
        $("#scout-request-form .step-1").fadeOut(150, function () {
            $("#scout-request-form .step-2").fadeIn(150);
        });
        $("#pg3 .progress-bar-inner").transition({ width: '75%'});
    });

    //go back

    $("#scout-request-form .step-2 .back").click(function () {
        $("#scout-request-form .step-2").fadeOut(150, function () {
            $("#scout-request-form .step-1").fadeIn(150);
        });
        $("#pg3 .progress-bar-inner").transition({ width: '35%'});
    });


    //signup
    $("#signup-form").submit(function () {
        email = $("#signup-email").val();
        password = $("#signup-password").val();
        name = $("#name").val();
        citystate = $("#citystate").val();
        type = "user";
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

    //// Back button support for popup pages
    //function popFix() {
    //    $(window).bind("hashchange.popCall", function () {
    //        $(".popup-wrap").fadeOut(function() {
    //            $(".popup-wrap").children().children().hide(function() {
    //                $(".popCall").unbind();
    //            });
    //        });
    //    });
    //};

    function provideService() {
        window.location = "#/signup";
        $("ul.user-list li:eq(1)").trigger("click");
    }
    function slideOver() {
        $(this).slideDown();
    }
