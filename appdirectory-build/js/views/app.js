define(["jquery","underscore","backbone","vm","events","text!templates/layout.html"],function(e,t,n,r,i,s){var o=n.View.extend({el:".container",initialize:function(){},render:function(){var t=this;e(this.el).html(s),n.history.start()}});return o})