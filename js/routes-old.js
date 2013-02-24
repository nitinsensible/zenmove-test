$(document).ready(function() {

    // Setting Page Routes

    //root
    Path.root("#/home");

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
        // dashboard hiding fix
        var LevelD = $(Loc).data("level");
        if (LevelD === 1) {
            Leave('[data-level="2"]');
        }

        // Mobile screen handling
        if (screen.width <= 767) {
            $(Loc).transition({ opacity: 0, scale: .9, delay: 100 }, 1, function () {
                $(Loc).show();
                $(Loc).transition({ opacity: 1, scale: 1 }, 150);
            });
            if (LevelD > 1) {
            $(".grabber").show();
            }
            else {
                $(".grabber").hide();
            }
            $('html, body').animate({
            scrollTop: $("body").offset().top}, 250);
        }
        else {
            $(Loc).fadeIn(250);
        }
    }

    //home link
    Path.map("#/home").to(function(){
        Go("#pg1");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg1");
    });

    //move request link
    Path.map("#/move-request").to(function(){
        Go("#pg2");
    }).enter(function() {
        
    }).exit(function () {
        Leave("#pg2");
    });

    //scout request link
    Path.map("#/scout-request").to(function(){
        Go("#pg3");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg3");
    });

    //Login Link
    Path.map("#/login").to(function(){
        Go("#pg13");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg13");
    });

    //Signup Link
    Path.map("#/signup").to(function(){
        Go("#pg14");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg14");
    });

    //User Dashboard Links ===============================================================
    // sub tab 1
    Path.map("#/user-dashboard/hired").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        if (!$("#t1").is(":visible")) {
            Go("#t1");
        }
       Go("#st1");

    }).enter(function() {
        $(".user-dashboard .control-panel ul li:eq(0)").addClass("active");
        $(".user-dashboard .sub-tabs li:eq(0) a").addClass("active");
    }).exit(function () {
        Leave("#st1");
        $(".user-dashboard .sub-tabs li:eq(0) a").removeClass("active");
    });
    // Sub tab 2
    Path.map("#/user-dashboard/listings").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        if (!$("#t1").is(":visible")) {
            Go("#t1");
        }
        Go("#st2");
    }).enter(function() {
        $(".user-dashboard .control-panel ul li:eq(0)").addClass("active");
        $(".user-dashboard .sub-tabs li:eq(1) a").addClass("active");
    }).exit(function () {
        Leave("#st2");
        $(".user-dashboard .sub-tabs li:eq(1) a").removeClass("active");
    });
    // Sub tab 3
    Path.map("#/user-dashboard/search").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        if (!$("#t1").is(":visible")) {
            Go("#t1");
        }
        Go("#st3");
    }).enter(function() {
        $(".user-dashboard .control-panel ul li:eq(0)").addClass("active");
        $(".user-dashboard .sub-tabs li:eq(2) a").addClass("active");
    }).exit(function () {
        Leave("#st3");
        $(".user-dashboard .sub-tabs li:eq(2) a").removeClass("active");
    });


    var Dash1 = function () {
        if ($("#t1").is(":visible")) {
            Leave("#t1");
        }
    }

    // Control panel links
    Path.map("#/user-dashboard/post").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        Go("#t2");
        $(".user-dashboard .control-panel ul li:eq(1)").addClass("active");
    }).enter(function() {
        Dash1();
    }).exit(function () {
        Leave("#t2");
        $(".user-dashboard .control-panel ul li:eq(1)").removeClass("active");
    });

    Path.map("#/user-dashboard/messages").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        Go("#t3");
        $(".user-dashboard .control-panel ul li:eq(2)").addClass("active");
    }).enter(function() {
        Dash1();
    }).exit(function () {
        Leave("#t3");
        $(".user-dashboard .control-panel ul li:eq(2)").removeClass("active");
    });

    Path.map("#/user-dashboard/my-profile").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        Go("#t4");
        $(".user-dashboard .control-panel ul li:eq(3)").addClass("active");
    }).enter(function() {
        Dash1();
    }).exit(function () {
        Leave("#t4");
        $(".user-dashboard .control-panel ul li:eq(3)").removeClass("active");
    });

    Path.map("#/user-dashboard/payments").to(function(){
        if (!$("#pg5").is(":visible")) {
            Go("#pg5");
        }
        Go("#t5");
        $(".user-dashboard .control-panel ul li:eq(4)").addClass("active");
    }).enter(function() {
        Dash1();
    }).exit(function () {
        Leave("#t5");
        $(".user-dashboard .control-panel ul li:eq(4)").removeClass("active");
    });

    // Third pages (ie) invoices, archived lists, view full list page etc ====



    //Helper Dashboard Link =======================================================================
    Path.map("#/helper-dashboard").to(function(){
        Go("#pg6");
        Go("#ht1");
        $(".helper-dashboard .control-panel ul li:eq(0)").addClass("active");
    }).enter(function() {

    }).exit(function () {
        Leave("#ht1");
    });

    Path.map("#/helper-dashboard/search").to(function(){
        Go("#pg6");
        Go("#ht2");
        $(".helper-dashboard .control-panel ul li:eq(1)").addClass("active");
    }).enter(function() {

    }).exit(function () {
        Leave("#ht2");
    });
    Path.map("#/helper-dashboard/messages").to(function(){
        Go("#pg6");
        Go("#ht3");
        $(".helper-dashboard .control-panel ul li:eq(2)").addClass("active");
    }).enter(function() {

    }).exit(function () {
        Leave("#ht3");
    });
    Path.map("#/helper-dashboard/my-profile").to(function(){
        Go("#pg6");
        Go("#ht4");
    }).enter(function() {

    }).exit(function () {
        Leave("#ht4");
    });
    Path.map("#/helper-dashboard/payments").to(function(){
        Go("#pg6");
        Go("#ht5");
        $(".helper-dashboard .control-panel ul li:eq(4)").addClass("active");
    }).enter(function() {

    }).exit(function () {
        Leave("#ht5");
    });



    //Content Links ===============================================================================
    Path.map("#/about-us").to(function(){
        Go("#pg7");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg7");
    });

    Path.map("#/how-it-works").to(function(){
        Go("#pg8");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg8");
    });
    Path.map("#/faq").to(function(){
        Go("#pg9");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg9");
    });
    Path.map("#/privacy").to(function(){
        Go("#pg10");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg10");
    });
    Path.map("#/terms").to(function(){
        Go("#pg11");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg11");
    });
    Path.map("#/contact-us").to(function(){
        Go("#pg12");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg12");
    });

    // 404 Page
    function notFound() {
        window.location = "#/not-found";
    }
    Path.rescue(notFound);
    Path.map("#/not-found").to(function(){
        Go("#pg4");
    }).enter(function() {

    }).exit(function () {
        Leave("#pg4");
    });

    // Listing for routes
    Path.listen();
});
