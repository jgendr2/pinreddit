// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
	'vm'
], function ($, _, Backbone, Vm) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'pics',
    }
  });

  var initialize = function(options){
		var appView = options.appView;
    var router = new AppRouter(options);

    router.on('route:pics', function (actions) {
      require(['views/reddit/widget'], function (RedditWidget) {
        var redditWidget = Vm.create(appView, 'RedditWidget', RedditWidget, { subreddit: 'pics' });
        redditWidget.render();
      });
    });

  };
  return {
    initialize: initialize
  };
});
