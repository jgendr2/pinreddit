define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Pictures = Backbone.Collection.extend({
    url: function () {
      return 'http://api.imgur.com/2/image/' + this.imgurID + '.json';
    },
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
      return resp.image;
    },
    imgurID: null
  });

  return Pictures;
});
