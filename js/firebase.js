var ZM = new Firebase('https://zenmove.firebaseIO.com/');
var user = ZM.child('users');


$(document).ready(function () {

    $("#login-form").submit(function () {
        user.email = $("#email").val();
        user.password = $("#password").val();
        var authClient = new FirebaseAuthClient(ZM);
        authClient.login('password', {
            email: '<email@domain.com>',
            password: '<password>;'
        });
    });

    $("#signup-form").submit(function () {
        user.email = $("#signup-email").val();
        user.password = $("#signup-password").val();
        user.name = $("#name").val();
        user.citystate = $("#citystate").val();

        var authClient = new FirebaseAuthClient(ZM, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
          } else {
            // user is logged out
          }
        });
    });

});
