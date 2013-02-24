
// control panel show / hide ======

function panelFire() {
    if (screen.width >= 768) {
        if ($('.grabber').hasClass("off")) {
            $(".control-panel").animate({left: "10px"}, 150);
            $('.grabber').attr("class", "grabber on");
            $(".grabber .arrow-right").attr("class", "arrow-left");
        }
        else if ($('.grabber').hasClass("on")) {
            $(".control-panel").animate({left: "-210px"}, 150);
            $('.grabber').attr("class", "grabber off");
            $(".grabber .arrow-left").attr("class", "arrow-right");
        }
    }
    if (screen.width <= 767) {
        if ($('.grabber').hasClass("off")) {
            $(".control-panel").animate({left: "0px"}, 150);
            $('.grabber').attr("class", "grabber on");
            $(".grabber .arrow-right").attr("class", "arrow-left");
        }
        else if ($('.grabber').hasClass("on")) {
            $(".control-panel").animate({left: "-380px"}, 150);
            $('.grabber').attr("class", "grabber off");
            $(".grabber .arrow-left").attr("class", "arrow-right");
        }
    }
}

$(document).ready(function() {
    if (screen.width <= 767) {
        jQuery(window).bind('orientationchange', function() {
            $('html, body').animate({
            scrollTop: $("body").offset().top}, 250);
        });

        // Rotating Phones

        if(orientation == 90) {
            $(document).find(".rotate-message").show();
            $('html, body').delay(600).animate({
	    scrollTop: $("body").offset().top}, 600);

            jQuery(window).bind('orientationchange', function() {
            switch ( window.orientation ) {
            case 0:
                $(".rotate-message").fadeOut(1000);
                location.reload();
            break;

            case 90:
                $(".rotate-message").fadeIn(100);
            break;

            case 180:
                $(".rotate-message").fadeOut(1000);
                location.reload();
            break;

            case -90:
                $(".rotate-message").fadeIn(100);
            break;

            }
            });
            }

            if(orientation == -90) {
            $(document).find(".rotate-message").show();
            $('html, body').delay(600).animate({
	    scrollTop: $("body").offset().top}, 600);

            jQuery(window).bind('orientationchange', function() {
            switch ( window.orientation ) {
            case 0:
                $(".rotate-message").fadeOut(1000);
                location.reload();
            break;

            case 90:
                $(".rotate-message").fadeIn(100);
            break;

            case 180:
                $(".rotate-message").fadeOut(1000);
                location.reload();
            break;

            case -90:
                $(".rotate-message").fadeIn(100);
            break;

            }
            });
            }

            if(orientation == 0) {

            jQuery(window).bind('orientationchange', function() {
            switch ( window.orientation ) {
            case 0:
                $(".rotate-message").fadeOut(1000);
            break;

            case 90:
                $(".rotate-message").fadeIn(100);
            break;

            case 180:
                $(".rotate-message").fadeOut(1000);
            break;

            case -90:
                $(".rotate-message").fadeIn(100);
            break;

            }
            });
            }

            if(orientation == 180) {

            jQuery(window).bind('orientationchange', function() {
            switch ( window.orientation ) {
            case 0:
                $(".rotate-message").fadeOut(1000);
            break;

            case 90:
                $(".rotate-message").fadeIn(100);
            break;

            case 180:
                $(".rotate-message").fadeOut(1000);
            break;

            case -90:
                $(".rotate-message").fadeIn(100);
            break;

            }
            });
            }
    }

    // Mobile Header
    $(document).on('click', '.h-cog.off', function() {
      $(this).attr('class', 'h-cog on');
      $(".top-right-nav ul").fadeIn(150);
      $('body').addClass("h-active");
    });
    $(document).on('click', '.h-cog.on', function() {
      $(this).attr("class", "h-cog off");
      $(".top-right-nav ul").fadeOut(150);
    });
    $(document).on('click', 'body.h-active', function() {
      $(this).attr('class', '');
      $('.h-cog').attr('class', 'h-cog off');
      $(".top-right-nav ul").fadeOut(150);
    });
});
