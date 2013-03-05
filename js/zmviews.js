
$(function() {
	
	Parse.$ = jQuery;
	Parse.initialize("fMLJJUor4ucCMbAVJVv3uDouSq4oh1TKdUP28AeX", "sVUg1cdf8g2m8knobEPRTrrz0KOxF4PT9tcR7AJn");

	var LogInView = Parse.View.extend({
	    events: {
	      "submit #login-form": "logIn",
	      "click #signup": "signUp"
	    },

	    el: "#content",
	    
	    initialize: function() {
	      _.bindAll(this, "logIn", "signUp");
	      this.render();
	    },

	    logIn: function(e) {
	      var self = this;
	      var username = this.$("#email").val();
	      var password = this.$("#password").val();
	      
	      Parse.User.logIn(username, password, {
	        success: function(user) {
	        	new DashboardView();
	        },

	        error: function(user, error) {
	          self.$("#pg13 .error").html("Invalid username or password. Please try again.").show();
	        }
	    	});


	      return false;
	    },

	    signUp: function(e) {
	      var self = this;
	      new SignupView();
	      return false;
	    },

	    render: function() {
	      this.$el.html(_.template($("#pg13").html()));
	      this.delegateEvents();
	    }
  	});

	var PostSelectionView = Parse.View.extend({
	    
	    events: {
	    	"click span": "newPost"
	    },

	    el: "ul.dash-master",

	    initialize: function() {
	      _.bindAll(this, "newPost");
	      this.render();
	    },

	    render: function() {
	      this.$el.html(_.template($("#t2").html()));
	      this.delegateEvents();
	    },

	    newPost: function(e){
	      if (Parse.User.current()) {
	        new AddMoverPost();
	      } else {
	        new LogInView();
	      }
	    }
	});

	var AddMoverPost = Parse.View.extend({
		events: {},
		el: "#content",

		initialize: function() {
	      this.render();
	    },

		render: function() {
	      this.$el.html(_.template($("#pg2").html()));
	      this.delegateEvents();
	    },

	});
	var DashboardView = Parse.View.extend({
		events: {
	      "click #newpost": "postSelection"
	    },

	    el: "#content",

	   	initialize: function() {
	      _.bindAll(this, "postSelection");
	      this.render();
	    },

	   	render: function() {
	      this.$el.html(_.template($("#pg5").html()));
	      this.delegateEvents();
	    },

	    postSelection: function(e){
	      if (Parse.User.current()) {
	        new PostSelectionView();
	      } else {
	        new LogInView();
	      }
	    }

	});

	var AppView = Parse.View.extend({
	    el: $("#main"),

	    initialize: function() {
	      this.render();
	    },

	    render: function() {
	      if (Parse.User.current()) {
	        new DashboardView();
	      } else {
	        new LogInView();
	      }
	    }
	});

	new AppView;

});

	  // The main view for the app
 