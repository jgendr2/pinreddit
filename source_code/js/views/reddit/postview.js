define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/reddit/post.html'
], function($, _, Backbone, Vm, PostTemplate){
  var PostView = Backbone.View.extend({
    tagName: 'div',
    className: "box photo col3",
    initialize: function () {
      //console.log(this.options.parent.testVAR);
    },
    render: function () {

      console.log(this.options.parent.numberLoaded);

      var data = {
        post: this.model,
        _:_
      };
      this.options.parent.numberLoaded++;
      if(this.options.parent.numberLoaded >= (this.options.parent.loadCount - 5)){
        this.options.parent.isLoading = false;
      }
      this.el.innerHTML = _.template(PostTemplate, data);
      return this;
    }
  });
  return PostView;
});