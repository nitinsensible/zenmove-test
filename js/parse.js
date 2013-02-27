
ZenApp = function() {
	var self = this;
	self.curuser = ko.observable();
	Parse.initialize("fMLJJUor4ucCMbAVJVv3uDouSq4oh1TKdUP28AeX", "sVUg1cdf8g2m8knobEPRTrrz0KOxF4PT9tcR7AJn");
	var currentUser = Parse.User.current();
	if (currentUser) {
	    self.curuser(currentUser);
	}
}


ZenApp.prototype.signup = function(name,password,email,citystate,type){

	var user = new Parse.User();
	user.set("name",name);
	user.set("username", email);
	user.set("password", password);
	user.set("email", email);
	user.set("citystate", citystate);
	user.set("type", type);

	user.signUp(null, {
 		success: function(user) {
 			//redirect to dashboard
    		alert("user registered successfully")
    		window.zenApp.curuser(user);
    		location.hash = "/user-dashboard/hired";
  		},
  		error: function(user, error) {
    		//Show the error message somewhere and let the user try again.
    		alert("Error: " + error.code + " " + error.message);
 	 	}
	});
};

ZenApp.prototype.login = function(username,password){

	Parse.User.logIn(username, password,{
	  success: function(user) {
	    // Do stuff after successful login.
	    window.zenApp.curuser(user);

	    location.hash = "/user-dashboard/hired";
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Error: " + error.code + " " + error.message);
	  }

	});
};

ZenApp.prototype.logout = function(){
	Parse.User.logOut()
	self.zenApp.curuser(null);
	location.hash = "#/home";
};

// Scout & Move Post ===

ZenApp.prototype.scoutPost = function() {

};

ZenApp.prototype.movePost = function() {

};
