define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/imgurpicture',
  'text!templates/reddit/album.html'
], function($, _, Backbone, Vm, ImgurPicture, AlbumTemplate){
  var PictureView = Backbone.View.extend({
    tagName: 'div',
    className: "box photo col3",
    initialize: function () {
      //console.log(this.options.parent.testVAR);
      this.imgurPicture = new ImgurPicture();
    },
    render: function () {

      var that = this;

      this.imgurPicture.imgurID = this.getImgurID(this.model.get('url'));

      this.imgurPicture.fetch({
        success: function (images) {

          var data = {
            post: that.model,
            images: images.models,
            _:_
          };

          that.el.innerHTML = _.template(AlbumTemplate, data);

          $(that.el).imagesLoaded(function(){
            $(that.options.parent.el).append(that.el).masonry( 'appended', $(that.el), true );
            that.options.parent.numberLoaded++;
            if( that.options.parent.numberLoaded >= (that.options.parent.loadCount - 5)){
               that.options.parent.isLoading = false;
            }
            $('#ajax-loader').hide();
          });

        }

      });
    },
    getImgurID: function (rawLink) {
      var match = rawLink.match(/[^\/]+$/);
      return match[0].substring(0,5);
    }
  });
  return PictureView;
});