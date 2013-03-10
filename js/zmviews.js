
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
		events: {"click button" : "submitPost"},

		el: "#content",

		initialize: function() {
		  this.posts = new ZenPostList;
		   _.bindAll(this, "submitPost");
	      this.render();
	    },

	    submitPost: function(e){
	      var self = this;
	      var from = $("#mr-starting-address").val()
	      var to = $("#mr-ending-address").val()
	      this.posts.create({
	        by:  Parse.User.current(),
	        type:    "mover",
	        from:  from,
	        to : to,
	        ACL: new Parse.ACL(Parse.User.current())
	      });
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

	var AppRouter = Parse.Router.extend({
	    routes: {
            "*actions": "defaultRoute" // matches http://example.com/#anything-here
        }

	});

	var app_router = new AppRouter;

    app_router.on('route:defaultRoute', function(actions) {
    })


  	new AppView;
  	Parse.history.start();

});
 