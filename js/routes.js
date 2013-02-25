$(document).ready(function() {

     // page Transitions
    var Leave = function (Loc) {
        if (screen.width <= 767) {
            $(Loc).transition({ opacity: 0, scale: .9 }, 150, function () {
                $(Loc).hide();
                $(Loc).transition({ opacity: 1, scale: 1 }, 1);
            });
        }
        else {
            $(Loc).hide();
        }
    };

    // Main route functions when attribute is clicked ====
    var Go = function (Loc) {

        // Mobile screen handling
        if (screen.width <= 767) {
            $(Loc).transition({ opacity: 0, scale: .9, delay: 150 }, 1, function () {
                $(Loc).show();
                $(Loc).transition({ opacity: 1, scale: 1 }, 150);
            });
        }
        else {
            $(Loc).fadeIn(250);
        }
         // Mobile dashboard grabber
        if (screen.width <= 959) {
            var dataLL = $(Loc).data("level");
            if (dataLL > 1) {
                $(".grabber").show();
            }
            else {
                $(".grabber").hide();
            }
            $('html, body').animate({
            scrollTop: $("body").offset().top}, 150);
        }
    }

    // Find page level and parents
    var runRoute = function (Loc) {
        var dataL = $(Loc).data("level");
        var dataP = $(Loc).data("parent");
        var dataPP = $(Loc).data("parent2");

        // Hide all other visible states
        if (dataL === 1) {
            Leave('[data-level="2"]:visible');
            Leave('[data-level="3"]:visible');
            Leave('[data-level="4"]:visible');
        }
        if (dataL === 2) {
            Leave('[data-level="1"]:visible');

        }
        if (dataL === 3) {
            $('[data-level="3"]').hide();
            Leave('[data-level="4"]:visible');
        }

        // Make any parents of current state visible
        if (!$("#" + dataP).is(":visible")) {
            Go("#" + dataP);
        }
        if (!$("#" + dataPP).is(":visible")) {
            Go("#" + dataPP);
        }
    }

    // Start routes =======================
    //root
    Path.root("#/home");

    //home link
    Path.map("#/home").to(function(){
        Go("#pg1");
    }).enter(function() {
        runRoute("#pg1");
    }).exit(function () {
        Leave("#pg1");
    });

    //move request link
    Path.map("#/move-request").to(function(){
        Go("#pg2");
    }).enter(function() {
        runRoute("#pg2");
    }).exit(function () {
        Leave("#pg2");
    });

    //scout request link
    Path.map("#/scout-request").to(function(){
        Go("#pg3");
    }).enter(function() {
        runRoute("#pg3");
    }).exit(function () {
        Leave("#pg3");
    });

    // Main user Dashboard path
    Path.map("#/user-dashboard").to(function(){
        Go("#pg5");
    }).enter(function() {
        runRoute("#pg5");
    }).exit(function () {
        Leave("#pg5");
    });

    // Sub paths of Dashboard button
    Path.map("#/user-dashboard/hired").to(function(){
        Go("#st1");
        $(".user-dashboard .control-panel ul li:eq(0)").addClass("active");
        $(".user-dashboard .sub-tabs li:eq(0) a").addClass("active");
    }).enter(function() {
        runRoute("#st1");
    }).exit(function () {
        Leave("#st1");
        $(".user-dashboard .sub-tabs li a").removeClass("active");
    });

    Path.map("#/user-dashboard/listings").to(function(){
        Go("#st2");
        $(".user-dashboard .control-panel ul li:eq(0)").addClass("active");
        $(".user-dashboard .sub-tabs li:eq(1) a").addClass("active");
    }).enter(function() {
        runRoute("#st2");
    }).exit(function () {
        Leave("#st2");
        $(".user-dashboard .sub-tabs li a").removeClass("active");
    });

    Path.map("#/user-dashboard/search").to(function(){
        Go("#st3");
        $(".user-dashboard .control-panel ul li:eq(0)").addClass("active");
        $(".user-dashboard .sub-tabs li:eq(2) a").addClass("active");
    }).enter(function() {
        runRoute("#st3");
    }).exit(function () {
        Leave("#st3");
        $(".user-dashboard .control-panel ul li").removeClass("active");
        $(".user-dashboard .sub-tabs li a").removeClass("active");
    });

    // Left control panel tabs
    Path.map("#/user-dashboard/post").to(function(){
        Go("#t2");
        $(".user-dashboard .control-panel ul li:eq(1)").addClass("active");
    }).enter(function() {
        runRoute("#t2");
    }).exit(function () {
        Leave("#t2");
        $(".user-dashboard .control-panel ul li").removeClass("active");
    });
    Path.map("#/user-dashboard/messages").to(function(){
        Go("#t3");
        $(".user-dashboard .control-panel ul li:eq(2)").addClass("active");
    }).enter(function() {
        runRoute("#t3");
    }).exit(function () {
        Leave("#t3");
        $(".user-dashboard .control-panel ul li").removeClass("active");
    });
    Path.map("#/user-dashboard/my-profile").to(function(){
        Go("#t4");
        $(".user-dashboard .control-panel ul li:eq(3)").addClass("active");
    }).enter(function() {
        runRoute("#t4");
    }).exit(function () {
        Leave("#t4");
        $(".user-dashboard .control-panel ul li").removeClass("active");
    });
    Path.map("#/user-dashboard/payments").to(function(){
        Go("#t5");
        $(".user-dashboard .control-panel ul li:eq(4)").addClass("active");
    }).enter(function() {
        runRoute("#t5");
    }).exit(function () {
        Leave("#t5");
        $(".user-dashboard .control-panel ul li").removeClass("active");
    });


    //Content Links ===============================================================================
    Path.map("#/about-us").to(function(){
        Go("#pg7");
    }).enter(function() {
        runRoute("#pg7");
    }).exit(function () {
        Leave("#pg7");
    });

    Path.map("#/how-it-works").to(function(){
        Go("#pg8");
    }).enter(function() {
        runRoute("#pg8");
    }).exit(function () {
        Leave("#pg8");
    });
    Path.map("#/faq").to(function(){
        Go("#pg9");
    }).enter(function() {
        runRoute("#pg9");
    }).exit(function () {
        Leave("#pg9");
    });
    Path.map("#/privacy").to(function(){
        Go("#pg10");
    }).enter(function() {
        runRoute("#pg10");
    }).exit(function () {
        Leave("#pg10");
    });
    Path.map("#/terms").to(function(){
        Go("#pg11");
    }).enter(function() {
        runRoute("#pg11");
    }).exit(function () {
        Leave("#pg11");
    });
    Path.map("#/contact-us").to(function(){
        Go("#pg12");
    }).enter(function() {
        runRoute("#pg12");
    }).exit(function () {
        Leave("#pg12");
    });

     //Login Link
    Path.map("#/login").to(function(){
        Go("#pg13");
    }).enter(function() {
        runRoute("#pg13");
    }).exit(function () {
        Leave("#pg13");
    });

    //Signup Link
    Path.map("#/signup").to(function(){
        Go("#pg14");
    }).enter(function() {
        runRoute("#pg14");
    }).exit(function () {
        Leave("#pg14");
    });

    // 404 Page
    function notFound() {
        window.location = "#/not-found";
    }
    Path.rescue(notFound);
    Path.map("#/not-found").to(function(){
        Go("#pg4");
    }).enter(function() {
        runRoute("#pg4");
    }).exit(function () {
        Leave("#pg4");
    });


    // Listing for routes
    Path.listen();
});
