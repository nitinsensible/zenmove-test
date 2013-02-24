var elements = {
        requests: ['elements/move-request.html', 'elements/scout-request.html', 'elements/user-dashboard.html', 'elements/helper-dashboard.html'],
        popups: ['elements/user-forms.html'],
    };

    // LOADING HTML ELEMENTS

    for (var i = 0; i < elements.requests.length; i++) {
        $.get(elements.requests[i], function(html){
            $(html).appendTo('.page-body');
        });
    }
    for (var i = 0; i < elements.popups.length; i++) {
        $.get(elements.popups[i], function(html){
            $(html).appendTo('.popup-body');
        });
    }
