
//Models for zenmove app, we have to sets of models, Item and ItemList

/* Models for User Profiles.
  
  User model will have a function called 'getProfile'. Which return
  the user profile. Profile will decide the type of user and will
  have lot of utility functions to query various things.
*/
var Profile = Parse.Object.extend("Profile", {
    defaults: { type:'unknown',
        user:null, // user object
        address : '',        
        zip: null,
        city : null,
        state : null        
    },

    initialize: function() {}    
});

var UserProfile = function(profile) {
    var self = this;
    self._profile = profile;
        
    /* create New Post from this user */
    self.createNewPost = function() {        
        var post = new ZenPost();
        post.by = self._profile.user;
    
        return post
    }
    
    /* create a message from this user to another user */
    self.sendMessage = function(to, msgText) {        
        var msg= new ZenMessage();
        msg.by = self._profile.user;
        msg.to = to;
        msg.msgText = msgText;
        
        return msg;
    },

    self.replyToMessage=function(orgMsg, msgText) {        
        var msg= new ZenMessage();
        msg.to = orgMsg.from;
        msg.msgText = msgText;
    
        return msg;
    },

    self.getUnreadMessages = function() {        
        // TODO. Create a query filter here for message.    
    },
    
    self.posted_listings = function() {
        // TODO
    },
    
    self.hired_helpers = function() {
        // TODO . Return a appropriate Parse.Query
    }
};


var MoverProfile = function(profile) {
    var self = this;
    self._profile = profile;
        
}


var ScoutProfile = function(profile) {
    var self = this;
    self._profile = profile;
        
}

/* Move Related Posting */

var ZenPost = Parse.Object.extend("ZenPost", {
    defaults: {
        by:null, // Posted by whom
        job_type:'', // request for small move or large move
        packing:false, //packing required or not. 
        start_address:'',
        end_address:'',
        description:'',
        move_date : ''
    },

    initialize: function() {}
});

var ZenPostList = Parse.Collection.extend({
    model: ZenPost
});

/* Move Related Posting */

var ZenMessage = Parse.Object.extend("ZenMessage", {
    defaults: {
        from:null,
        to:null,
        msgText:'',
        isRead:false, // is this message 'read'.
        parent:null, // Non null if this message is in response (reply to) another message
        timestamp:new Date()
    },
    initialize: function() {}
});

var MessageList = Parse.Collection.extend({
    model: ZenMessage
});

/* Extend Parse.User to add some utility functions*/

Parse.User.prototype.getProfile = function() {
    var self =this;
    var profile = null;
    if('_profile' in self) {
        profile= self._profile;
    }else {
        // query the profile from the server
        var query = new Parse.Query(Profile);
        query.equalTo('user', self);
        query.first({
            success:function(obj) {
                self._profile = obj
            },
            error : function(obj) {
                // For now do nothing.
            }
            
        });
    }
    return profile;
}
