define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'collections/imguralbum',
  'text!templates/reddit/album.html'
], function($, _, Backbone, Vm, ImgurAlbum, AlbumTemplate){
  var AlbumView = Backbone.View.extend({
    tagName: 'div',
    className: "box photo col3",
    initialize: function () {
      //console.log(this.options.parent.testVAR);
      this.imgurAlbum = new ImgurAlbum();
    },
    render: function () {

      var that = this;

      this.imgurAlbum.imgurID = this.getImgurID(this.model.get('url'));

      this.imgurAlbum.fetch({
        success: function (images) {

          var data = {
            post: that.model,
            images: images.models,
            _:_
          };

          that.el.innerHTML = _.template(AlbumTemplate, data);

          $(that.el).imagesLoaded(function(){
            $(that.options.parent.el).append(that.el);
            $(that.el).slides({
              preload: true,
              generateNextPrev: false,
              play: 4000,
              pause: 2000,
              hoverPause: true,
              preloadImage: 'images/loading.gif'
            });
            $(that.options.parent.el).masonry( 'appended', $(that.el), true );
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
      var match = rawLink.match(/[a]\/...../);
      return match[0].substring(2);
    }
  });
  return AlbumView;
});