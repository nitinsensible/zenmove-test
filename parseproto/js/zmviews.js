/*
   Toplevel App Class for Knockout.
*/
var ZenApp = function() {
    var self = this;
    Parse.$ = jQuery;
	Parse.initialize("fMLJJUor4ucCMbAVJVv3uDouSq4oh1TKdUP28AeX", "sVUg1cdf8g2m8knobEPRTrrz0KOxF4PT9tcR7AJn");
    
    self.curuser = ko.observable();
    
    self.login = function(username, password) {
        Parse.User.logIn(username, password, {});        
        var currentUser = Parse.User.current();
        if (currentUser) {
            self.curuser(currentUser);
        }
    }

	self.makeMovePost = function() {
		var movepost = new ZenPost();
		movepost.by = self.curuser();
		return movepost;
	}
	
    return self;
}

var MovePostViewModel = function(post) {
	var self = this;
    self.post = ko.observable(post);
	self.step = ko.observable('start');
	
	self.movePostStart = function() {
		self.step('step1');
	}
	
	return self;
};
