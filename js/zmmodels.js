
//Models for zenmove app, we have to sets of models, Item and ItemList

var Profile = Parse.Object.extend("Profile", {

    defaults: {},

    initialize: function() {},

});


var Post = Parse.Object.extend("Post", {

    defaults: {},

    initialize: function() {},

});

var PostList = Parse.Collection.extend({

    model: Post

});

var Payment = Parse.Object.extend("Payment", {

    defaults: {},

    initialize: function() {},

});

var PaymentList = Parse.Collection.extend({

    model: Payment

});

var Message = Parse.Object.extend("Message", {

    defaults: {},

    initialize: function() {},

});

var MessageList = Parse.Collection.extend({

    model: Message

});

var Invoice = Parse.Object.extend("Invoice", {

    defaults: {},

    initialize: function() {},

});

var InvoiceList = Parse.Collection.extend({

    model: Invoice

});