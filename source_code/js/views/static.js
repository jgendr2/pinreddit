define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'text!templates/welcome.html',
  'text!templates/gonewildwarning.html'
], function($, _, Backbone, Vm, Events, WelcomePage, GoneWildWarning){
  var StaticView = Backbone.View.extend({
    el: $('#reddit-widget'),
    initialize: function () {
      //$('.content').append('<div id="reddit-widget"></div>');
    },
    render: function () {
      var that = this;
      var data = {
        _:_
      };

      $(that.el).html(eval(that.options.template));
    },
    close: function () {
      $(this.el).remove();
    }
  });
  return StaticView;
});
