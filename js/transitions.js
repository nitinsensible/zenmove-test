var global_zip;


// function to test if bootstrap is loaded, most cases will be loaded but must to be sure
function load_bootstrap() {
    if(typeof(bootstrap) != 'object') {
        $.ajax({
            url: 'js/bootstrap.js',
            async: false,
            dataType: "script",
        });
    }
}

// Ajax Loaders =====

$(document).ajaxStart(function() {
   $(".load-spinner").show();
});
$(document).ajaxStop(function() {
   function hideSpinner() {
      $(".load-spinner").fadeOut(150);
   }
   setTimeout(hideSpinner, 100);
   $(".body-wrap .page-body").fadeIn(150);

});

$(document).on('click', '.serialize', function() {
   $('span.tag span').each(function() {
      var currentTag = $(this).text();
      $(this).text(currentTag+',  ');
   });
   alert($("span.tag span").text());
});

// End Ajax Loaders ====

   $(document).ready(function() {
      $(".main-logo").hover(function() {
           $(this).toggleClass("active");
      });
   });

     function switchUserHeaders(html_element) {
        $.ajax({
            url: html_element,
            dataType: 'html',
            async: false,
            cache: true,
            success: function(data) {
                $(".header .top-right-nav ul").html(data);
            }
        });
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


   // ******************************************************************* Login & Signup *******************************************************************

   function userFormControls() {

         $(".popup-wrap").click(function (event) {
         $(".login-pop").fadeOut(150);
         $(".signup-pop").fadeOut(150);
         $(this).delay(250).fadeOut(150);
         });
         $(".login-pop").click(function(event) {
              event.stopPropagation();
          });
         $(".signup-pop").click(function(event) {
              event.stopPropagation();
          });
         $(".user-list li").click(function() {
              $(".user-list li").removeClass("active");
              $(this).addClass("active");
         });
         $(".user-list li:eq(0)").click(function() {
              $(".signup-pop form input[type=hidden]").val("1");
         });
         $(".user-list li:eq(1)").click(function() {
              $(".signup-pop form input[type=hidden]").val("0");
         });
         $(".signup-pop .extra-links li:eq(0) a").click(function () {
            $(".signup-pop").fadeOut(150, function() {
               $(".login-pop").fadeIn(150);
            });
         });
         $(".login-pop .extra-links li:eq(0) a").click(function () {
            $(".login-pop").fadeOut(150, function() {
               $(".signup-pop").fadeIn(150);
            });
         });
   }

   // ******************************************************************* Move Request Page *******************************************************************

   // step 1 to step 2 ===

   $(document).on('click', ".move-request-form .step-1 .form-nav .next", function(e) {
      if( move_request.verify == false ) {
        return;
      }
      //progress bar nav
      $(".moving-main .progress-bar-inner").animate({width: "75%"}, 400);
      $(".move-request-form .step-1").fadeOut(150, function () {
         $(".move-request-form .step-2").fadeIn(150);
      });
   });

   // step 2 to step 1 ===

    $(document).on('click', ".move-request-form .step-2 .form-nav .back", function() {
      //progress bar nav
      $(".moving-main .progress-bar-inner").animate({width: "35%"}, 400);
      $(".move-request-form .step-2").fadeOut(150, function () {
         $(".move-request-form .step-1").fadeIn(150);
      });
   });

    // move request job type controls =======
   function includepacking() {
        var packingicon = $(".job-list li:eq(0)");
        packingicon.toggleClass('active');
        if (packingicon.hasClass('active')) {
            $('#packing').attr('value', '1');
        }
        else {
            $('#packing').attr('value', '');
        }
   };
   function smallMoving() {
        var othericon = $(".job-list li:eq(2)");
        var movingicon = $(".job-list li:eq(1)");
        movingicon.toggleClass('active');
        if (movingicon.hasClass('active')) {
            $('#job-type').attr('value', '1');
            $(othericon).removeClass('active');
        }
        else {
            $('#job-type').attr('value', '');
        }
   };
   function bigMoving() {
        var othericon = $(".job-list li:eq(1)");
        var movingicon = $(".job-list li:eq(2)");
        movingicon.toggleClass('active');
        if (movingicon.hasClass('active')) {
            $('#job-type').attr('value', '2');
            $(othericon).removeClass('active');
        }
        else {
            $('#job-type').attr('value', '');
        }
   };

   function moveRequestControls() {
      //Navigate to the page
      $("a.p-link:eq(0)").trigger("click");
   }

   // ******************************************************************* Scout Request Page *******************************************************************
   // Checkbox controls
   function findClick() {
      var findMe = $(".scout-list > li:eq(0)");
      if($(findMe).hasClass("active")) {
         $("#find-place").attr("value", "0");
         $(findMe).removeClass("active");
      }
      else {
         $("#find-place").attr("value", "1")
         $(findMe).addClass("active");
      }
   }
   function aptClick() {
      var aptMe = $(".scout-list > li:eq(1)");
      if($(aptMe).hasClass("active")) {
         $("#set-apt").attr("value", "0");
         $(aptMe).removeClass("active");
      }
      else {
         $("#set-apt").attr("value", "1")
         $(aptMe).addClass("active");
      }
   }
   function driveClick() {
      var driveMe = $(".scout-list > li:eq(2)");
      if($(driveMe).hasClass("active")) {
         $("#drive-me").attr("value", "0");
         $(driveMe).removeClass("active");
      }
      else {
         $("#drive-me").attr("value", "1")
         $(driveMe).addClass("active");
      }
   }
    //step 1 to step 2
   $(document).on('click', ".scout-request-form .step-1 .form-nav .next", function(e) {
      if( scout_request.verify == false ) {
        return;
      }
      //progress bar nav
      $(".finding-main .progress-bar-inner").animate({width: "75%"}, 400);

      $(".scout-request-form .step-1").fadeOut(150, function () {
         $(".scout-request-form .step-2").fadeIn(150);
      });
      // Date Picker
      $("#move-in-date").Zebra_DatePicker({direction: true,});
   });
   // step 2 to step 1
   $(document).on('click', ".scout-request-form .step-2 .form-nav .back", function(e) {
      //progress bar nav
      $(".finding-main .progress-bar-inner").animate({width: "35%"}, 400);

      $(".scout-request-form .step-2").fadeOut(150, function () {
         $(".scout-request-form .step-1").fadeIn(150);
      });
   });

   function scoutRequestControls() {
      //Navigate to the page
      $("a.p-link:eq(1)").trigger("click");
   }

   // ******************************************************************* User Dashboards *******************************************************************

   //search for helpers button

    $(document).on('click', '.search-filter #search-submit', function() {
        var zip = global_zip = $('.search-filter #zip').val();
        var form = $(this).parent().parent();
        var type_obj = $('.active', form);
        var type;
        if( type_obj.length ) {
            type = type_obj.attr('id').split('-')[0];
        }
        if( !zip ) {
            alert('Please type in a zip code.');
        }
        if( !type ) {
            alert('Please select a helper type.');
        }
        $('.results-zip').text(type+'s in: '+ zip);
        if( type && zip ) {
           user.search_helpers(zip, type);
        }
    });

    // load more button
    $(document).on("click", '#user-search-load-more', function() {
        var zip = global_zip = $('.search-filter #zip').val();
        if( zip != global_zip ) {
            $('.one-list').remove();
            user.pagination = 0
        }

        var form = $(this).parent().parent();
        var type_obj = $('.active', form);
        var type;
        if( type_obj.length ) {
            type = type_obj.attr('id').split('-')[0];
        }

        var response;
        if( zip && type ) {
            response = user.search_helpers(zip, type);
        } else {
            response = user.helpers();
        }
        if( !response ) {
            $('#user-search-load-more').fadeOut(150, function() {
                $('#user-search-load-more').remove();
            });
        }
    });

    $(document).on('click', '.search-listings-filter #search-submit', function() {
        var zip = global_zip = $('.search-listings-filter #zip').val();
        var form = $(this).parent().parent();
        var type_obj = $('.active', form);
        var type;
        if( type_obj.length ) {
            type = type_obj.attr('id').split('-')[0];
        }
        if( !zip ) {
            alert('Please type in a zip code.');
        }
        if( !type ) {
            alert('Please select a helper type.');
        }
        $('.ztitle').text(type+ ' requests in: '+ zip);
        if( type && zip ) {
            $('.one-list.h').remove();
            user.pagination = 0;
            user.search_helper_requests(zip, type);
        }
    });

    $(document).on("click", '#helper-search-load-more', function() {
        var zip = $('.search-listings-filter #zip').val();
        if( zip != global_zip ) {
            $('.one-list.h').remove();
            user.pagination = 0
        }

        var form = $(this).parent().parent();
        var type_obj = $('.active', form);
        var type;
        if( type_obj.length ) {
            type = type_obj.attr('id').split('-')[0];
        }

        var response;
        if( zip && type ) {
            console.log('zip & type');
            console.log(zip);
            console.log(type);
            response = user.search_helper_requests(zip, type);
        } else {
            console.log('no zip & type');
            console.log(zip);
            console.log(type);
            response = user.search_helper_requests();
        }
        if( !response ) {
            $('#helper-search-load-more').fadeOut(150, function() {
                $('#helper-search-load-more').remove();
            });
        }
    });
   // Profile Controls ===================================
         //show profile edit box
         function showEditProfile(e) {
            $(".profile-box").fadeOut(150, function() {
               $(".profile-edit-box").fadeIn(150);
         });
         }
         $(document).on("click", ".edit-profile", function(e) {
            e.preventDefault();
            showEditProfile();
         });

          //cancel profile edit box
         $(document).on("click", ".cancel-profile", function(e) {
            e.preventDefault();
            user.profile();
         });

        // // Dashboard Active Controls ===
        // $(document).on("click", ".user-dashboard .control-panel ul li", function() {
        //    $(".user-dashboard .control-panel ul li").removeClass("active");
        //    $(this).addClass("active");
        // });
        //// Control panel nav controls ===
        //$(document).on('click', ".user-dashboard .control-panel > ul > li", function() {
        //    var index = $(".user-dashboard .control-panel > ul > li").index(this);
        //    $(".dash-master > li:visible").stop().fadeOut(150, function() {
        //       $(".dash-master > li:eq(" + index + ")").fadeIn(150);
        //    });
        //});

        //search filter choices
         $(document).on('click', ".search-filter .mover-choose", function() {
            $(".scout-choose").removeClass("active");
            $(this).addClass("active");
            $("#helper-type").attr("value", "1");
         });
         $(document).on('click', ".search-filter .scout-choose", function() {
            $(".mover-choose").removeClass("active");
            $(this).addClass("active");
            $("#helper-type").attr("value", "2");
         });

         //dash popup controls
         $(document).on('click', ".dash-pop .inner .invite-box form input[type=submit]", function() {
            $(".invite-box").fadeOut(150, function() {
               $(".success-msg").fadeIn(150);
            });
         });

         // Search results ===================

         //function to confirm deleting a listing
         function delconfirmation() {
                  var answer = confirm("Are you sure you want to delete this listing?")
                  if (answer){
                        $(this).parent().fadeOut(150);
                  }
                  else{
                     return false;
                  }
          }
          //click to delete listing
         $(document).on('click', ".requests-main .one-list > a.close-x", delconfirmation);

          //Invite to your listing
         $(document).on('click', ".search-result .candidate-options > li.invite-call", function() {
            $(".dash-pop").fadeIn(150);
            $(".dash-pop .inner .invite-box").fadeIn(150);
         });

         //Invite from profile
         $(document).on('click', ".helper-profile .invite-them", function() {
            $(".dash-pop").fadeIn(150);
            $(".dash-pop .inner .invite-box").fadeIn(150);
         });

         //View helper profile
         $(document).on('click', "li.look-profile", function() {
            $('.helper-profile-go').trigger('click');
            bootstrap.load_user_request_script();
            user.helper_id = $(this).parent().parent().attr('data-helper-id');
            if( user.helper_id == undefined ) {
                user.helper_id = $(this).parent().parent().parent().attr('data-helper-id');
            }
         });

         // Your List Options ====================================

          //Hire chosen applicant
         $(document).on('click', ".applicant-result .candidate-options > li.candidate-hire", function() {
               $(".dash-pop").fadeIn(150);
               $(".confirm-hire").fadeIn(150);
         });
         //Hire from view profile
         $(document).on('click', ".app-helper-profile .hire-call", function() {
            $(".dash-pop").fadeIn(150);
            $(".confirm-hire").fadeIn(150);
         });

         // Credit Card / Payments Tab ===========================
         function showCC() {
             $(".dash-pop").fadeIn(150);
            $(".credit-card-form").fadeIn(150);
         }
         $(document).on("click", ".payments-content .change-card", showCC);
         $(document).on("click", ".credit-card-form button.cont", function(e) {
            e.preventDefault();
            $(".cc-1").fadeOut(150, function() {
               $(".cc-2").fadeIn(150);
            });
         });
         $(document).on("click", ".credit-card-form .cc-back", function() {
            $(".cc-2").fadeOut(150, function() {
               $(".cc-1").fadeIn(150);
            });
         });

         // Hire tabs ==========================================
          //Hire from view profile
         $(document).on('click', ".one-hired > .hired-right > .hire-options > .archive-go", function() {
            $(".dash-pop").fadeIn(150);
            $(".archive-confirm").fadeIn(150);
         });
         $(document).on('click', '.one-hired > .hired-right > .hire-commands > li.p-invoice.active', function () {
            $(".dash-pop").fadeIn(150);
            $(".pop-pay").fadeIn(150);
         });
         $(document).on('click', '.one-hired > .hired-right > .hire-commands > li.r-rating.active', function () {
            $(".dash-pop").fadeIn(150);
            $(".pop-rating").fadeIn(150);
         });

   // This function is hard coded into user-dashboard.html so it loads every time the dashboard does.
   function userDashControls() {
      switchUserHeaders('elements/user-header-logged-in.html');
            // closing popups in dashboard iPad / iPhone fix
            $('.dash-pop').click(function() {
               $(this).fadeOut(150, function() {
                  $(".dash-pop .inner").children().hide();
               });
            });
            $('.dash-pop .inner').click(function(event) {
               event.stopPropagation();
            });
            $('.pop-rating .rating div').click(function() {
               $('.pop-rating .rating div').removeClass("active");
               $(this).addClass('active');
               $(this).prevAll().addClass("active");

               var Rindex = $(".pop-rating .rating div").index(this);

               $('#rating-record').val(Rindex + 1);
            });

      var dbdata = $('body').attr('data');

      if (!dbdata) {
         $('body').attr('data', '1');
      }
      if (dbdata == 1) {
         $(".grabber").addClass("firstclick");
         $('body').attr('data', '2');
      }
      // Mobile Dashboard grabber
      if (screen.width <= 767) {
         $(".grabber").appendTo('.header .container');
      }
   }
   // ******************************************************************* Helper Dashboards *******************************************************************

    // Helper Active Controls ===

   //$(document).on('click', ".helper-dashboard .control-panel ul li", function() {
   //   $(".helper-dashboard .control-panel ul li").removeClass("active");
   //   $(this).addClass("active");
   //});
  //  // Control panel nav controls ===
  //$(document).on('click', ".helper-dashboard .control-panel > ul > li", function() {
  //    var index = $(".helper-dashboard .control-panel > ul > li").index(this);
  //    $(".dash-master > li:visible").stop().fadeOut(150, function() {
  //       $(".dash-master > li:eq(" + index + ")").fadeIn(150);
  //    });
  //});
  $(document).on('click', '.coming-soon .body', function() {
      $('#t3 a').trigger('click');
  });
   $(document).on('click', '.invite-notif', function() {
      $('.job-invites-go').trigger('click');
   });
   $(document).on('click', '.invite-back', function() {
      $(".job-invites").fadeOut(150, function() {
         $(".hired-jobs").fadeIn(150);
      });
   });
  $(document).on('click', ".helper-dashboard .one-job > .hired-right .hire-options > .complete-go", function() {
      $(".dash-pop").fadeIn(150);
      $(".confirm-complete").fadeIn(150);
  });

  $(document).on('click', '.one-job > .hired-right > .hire-commands > li.p-invoice.active', function () {
      $(".dash-pop").fadeIn(150);
      $(".pop-invoice").fadeIn(150);
   });
   $(document).on('click', '.one-job > .hired-right > .hire-commands > li.r-rating.active', function () {
      $(".dash-pop").fadeIn(150);
      $(".pop-rating-2").fadeIn(150);
   });
   $(document).on('keyup', '#hours-worked', function() {
      var calcPrice = $("#hours-worked").val();
      var yourRate = parseInt($(".your-rate span").text());
      var worknum = $("#number-workers").val();
      var finalTotal = yourRate * calcPrice * worknum;
      $(".total-invoice span").text(finalTotal);
      $("#final-total").val(finalTotal);
   });
   $(document).on('keyup', '#number-workers', function() {
      var calcPrice = $("#hours-worked").val();
      var yourRate = parseInt($(".your-rate span").text());
      var worknum = $("#number-workers").val();
      var finalTotal = yourRate * calcPrice * worknum;
      $(".total-invoice span").text(finalTotal);
      $("#final-total").val(finalTotal);
   });
   $(document).on('click', '.apply-job', function() {
      $(".dash-pop").fadeIn(150);
      $(".apply-confirm").fadeIn(150);
   });
   $(document).on('click', '.paypal-set-button', function() {
      $(".dash-pop").fadeIn(150, function() {
        $(".paypal-set").fadeIn(150);
      });
   });
   $(document).on('click', '.close-pending', function() {
      $(".dash-pop").fadeIn(150);
      $('.cancel-invoice-confirm').fadeIn(150);
   });
   function removeBank() {
      var answer = confirm("Are you sure you want to remove your bank?")
      if (answer){
            $('.dash-pop').trigger('click');
      }
      else{
         $('.dash-pop').trigger('click');
         return false;
      }
   }

   //search filter choices
         $(document).on('click', ".search-listings-filter #mover-choose", function() {
            $("#scout-choose").removeClass("active");
            $(this).addClass("active");
            $("#listing-type").attr("value", "1");
         });
         $(document).on('click', ".search-listings-filter #scout-choose", function() {
            $("#mover-choose").removeClass("active");
            $(this).addClass("active");
            $("#listing-type").attr("value", "2");
         });


   //var helperChoice = function () {$(".helper-type-choice").fadeIn(150);}
   //setTimeout(helperChoice, 500);

   $(document).on('click', ".helper-type-choice .inner .help-list li", function() {
      load_bootstrap();
      bootstrap.set_user_type( $(this).attr('user_type_id') );

      $(this).addClass("active");
         $(".helper-type-choice .inner").fadeOut(150, function() {
            $(".helper-type-choice .inner-2").fadeIn(150, function() {
                $(".helper-type-choice .inner-2 #submit-rate").click(function() {
                    var rate = $(".helper-type-choice .inner-2 #hourly-rate").val();
                    if( rate ) {
                        bootstrap.set_user_rate( rate );
                        $(".helper-type-choice").remove();
                    } else {
                        alert('please type your hourly rate');
                    }
                });
            });
         });
   });
   $(document).on('click', "li.look-listing-2", function() {
      $(".search-listings .content-box").children(':visible').fadeOut(150, function() {
         $(".view-this-listing").fadeIn(150);
      });
   });

   // This function is hard coded into helper-dashboard.html so it loads every time the dashboard does.
   function helperDashControls() {
        switchUserHeaders('elements/helper-header-logged-in.html');

            // closing popups in dashboard iPad / iPhone fix
            $('.dash-pop').click(function() {
               $(this).fadeOut(150, function() {
                  $(".dash-pop .inner").children().hide();
               });
            });
            $('.dash-pop .inner').click(function(event) {
               event.stopPropagation();
            });
             $('.pop-rating-2 .rating div').click(function() {
               $('.pop-rating-2 .rating div').removeClass("active");
               $(this).addClass('active');
               $(this).prevAll().addClass("active");

               var Rindex = $(".pop-rating-2 .rating div").index(this);

               $('#rating-record').val(Rindex + 1);

            });
             //Bank account button
            $('.b-continue').click(function() {
               $("fieldset.s-1").fadeOut(150, function() {
                  $("fieldset.s-2").fadeIn(150);
               });
            });
            $(".bank-back").click(function () {
               $("fieldset.s-2").fadeOut(150, function () {
                  $('fieldset.s-1').fadeIn(150);
               });
            });
      // Mobile Dashboard grabber
      if (screen.width <= 767) {
         $(".grabber").appendTo('.header .container');
      }
   }
