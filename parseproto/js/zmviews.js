/*
   Toplevel App Class for Knockout.
*/
var ZenApp = function() {
    var self = this;
    Parse.$ = jQuery;
	Parse.initialize("fMLJJUor4ucCMbAVJVv3uDouSq4oh1TKdUP28AeX", "sVUg1cdf8g2m8knobEPRTrrz0KOxF4PT9tcR7AJn");
    
    self.curuser = ko.observable(Parse.User.current());
    
    self.loginvm = new LoginViewModel();
    self.signup = new SignupViewModel();

	self.makeMovePost = function() {
		var movepost = new ZenPost();
		movepost.by = self.curuser();
		return movepost;
	}

	self.logout = function(){
		Parse.User.logOut()
		self.curuser(null);
	};
	
    return self;
}


var MovePostViewModel = function(post) {
	var self = this;
    self.step = ko.observable('start');
    self.posts = new ZenPostList;

	self.post = ko.observable(post);	
	self.postvm= kb.viewModel(post);
	self.move_date = ko.observable('today');
	self.move_time = ko.observable('Noon')
	
	self.isBigMove = ko.computed(function() {
		return (self.postvm.job_type() == 'bigmove' ? true: false)
	});
	self.isSmallMove = ko.computed(function() {
		return (self.postvm.job_type() == 'smallmove' ? true: false)
	});
	
	function _update_movedate() {
		var mv_date = self.move_date();
		var mv_time = self.move_time();
		self.postvm.move_date(mv_date + ' ' + mv_time);
	}
	
	self.started = ko.computed(function() {
		var step = self.step();
		return (step == 'step1' || step == 'step2');
	});
	
	self.movePostStart = function() {
		self.step('step1');
		//console.log('start address ', self.postvm.start_address());
		//console.log('end address ', self.postvm.end_address());
	}
	
	self.movePostStep2 = function() {
		self.step('step2');
		//console.log('start address ', self.postvm.start_address());
		//console.log('end address ', self.postvm.end_address());
	}
		
	self.togglePacking = function() {
		var packing = self.postvm.packing();
		self.postvm.packing(packing ? false : true);
	}
	
	self.setSmallMove = function() {
		self.postvm.job_type('smallmove');
	}
	self.setBigMove = function() {
		self.postvm.job_type('bigmove');		
	}
	
	self.createMovePost = function() {
		_update_movedate();
		self.posts.create({by:Parse.User.current(), start_address:self.postvm.start_address(),end_address:
			self.postvm.end_address(),job_type:self.postvm.job_type(),description:self.postvm.description(),
		move_date:self.postvm.move_date(),packing:self.postvm.packing()
	})
		return false; // dont use normal form submit
	}
	return self;
};


var LoginViewModel = function(){
	var self = this;
	self.username = ko.observable();
	self.password = ko.observable();

	self.login = function() {
    	username = self.username();
    	password = self.password();
        Parse.User.logIn(username, password, {
        	success:function(user){
		            window.zenApp.curuser(user);
		        }
        });          
        return false;
    }
}


var SignupViewModel = function(){
	var self = this;
	self.name = ko.observable();
	self.email = ko.observable();
	self.password = ko.observable();
	self.city = ko.observable();
	self.type = ko.observable();

    self.signup = function(){
		var user = new Parse.User();
		user.set("name",self.name());
		user.set("username", self.email());
		user.set("password", self.password());
		user.set("email", self.email());
		user.set("citystate", self.city());
		user.set("type", self.type());

		user.signUp(null, {
	 		success: function(user) {
				window.zenApp.curuser(user);
		});
	}
}
