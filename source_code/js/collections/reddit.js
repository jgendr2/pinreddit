define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Posts = Backbone.Collection.extend({
    url: function () {
      return 'http://www.reddit.com/r/' + this.subreddit + '.json?jsonp=?&after=' + this.after ;
      //&' + this.query + '&page=' + this.page;
    },
    // Because reddit doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {

      var result = [];

      if(this.after != resp.data.after){
        this.after = resp.data.after;
        _.each(resp.data.children, function (post) {
          result.push(post.data);
        });
      }

      return result;
    },
    after: null,
    subreddit: null
  });

  return Posts;
});
