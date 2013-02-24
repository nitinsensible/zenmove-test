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


}); // End document ready ===

                                                                                                // Global Functions =============================
    function helpList1() {
        $(".help-list li:eq(0)").transition({ scale: 1.3, opacity: 0}, 250, function() {
            window.location = "#/move-request";
        });
        $(".help-list li:eq(0)").transition({ scale: 1, opacity: 1, delay: 500},1);
    }
    function helpList2() {
        $(".help-list li:eq(1)").transition({ scale: 1.3, opacity: 0}, 250, function() {
            window.location = "#/scout-request";
        });
        $(".help-list li:eq(1)").transition({ scale: 1, opacity: 1, delay: 500},1);
    }

    // Main Page Help List Clicks
    function aClick(X) {
        var go = $('.help-list li:eq(' + X + ')').find("a").attr("href");
        setTimeout(function() {
            window.location = go;
            return false;
        }, 250);
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
