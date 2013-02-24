var ZM = new Firebase('https://zenmove.firebaseIO.com/');
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


$(document).ready(function () {

    $("#login-form").submit(function () {
        var user = {};
        user.email = $("#email").val();
        user.password = $("#password").val();
        authClient.login('password', {
          email: user.email,
          password: user.password,
          rememberMe: true
        });
    });

    $("#signup-form").submit(function () {
        var user = {};
        user.email = $("#signup-email").val();
        user.password = $("#signup-password").val();
        user.name = $("#name").val();
        user.citystate = $("#citystate").val();
        authClient.createUser(user.email, user.password, function(error, user) {
          if (error) {
            console.log(error)
          } else {
            console.log('User Id: ' + user.id + ', Email: ' + user.email);
          }
        });
    });

});
