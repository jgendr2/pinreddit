define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Albums = Backbone.Collection.extend({
    url: function () {
      return 'http://api.imgur.com/2/album/' + this.imgurID + '.json';
    },
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
      return resp.album.images;
    },
    imgurID: null
  });

  return Albums;
});
