
//Models for zenmove app, we have to sets of models, Item and ItemList

/* Models for User Profiles.
  Instance of User will have a attribute called 'type' to define the
  user type and 'profile' which defines the profile for the user.
  For example, if type is 'move' then 'profile' attribute will contain
  an instance of MoverProfile
*/
var ProfileBase = Parse.Object.extend("Profile", {
    defaults: { type:'unknown'},

    initialize: function() {}
});

var UserProfile = ProfileBase.extend('UserProfile', {
    defaults: { type:'user'},
    initialize: function() {}
});


var MoverProfile = ProfileBase.extend('MoverProfile', {
    defaults: { type:'mover'},
    initialize: function() {}
});

var ScoutProfile = ProfileBase.extend('MoverProfile', {
    defaults: { type:'mover'},
    initialize: function() {}
});

/* Move Related Posting */

var Post = Parse.Object.extend("Post", {
    defaults: {},

    initialize: function() {}
});

var PostList = Parse.Collection.extend({
    model: Post
});

/* Move Related Posting */

var Message = Parse.Object.extend("Message", {
    defaults: { from:null, to:null, msgText:''},
    initialize: function() {}
});

var MessageList = Parse.Collection.extend({
    model: Message
});
