define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'events',
  'masonry',
  'modernizr',
  'slides',
  'collections/reddit',
  'views/reddit/postview',
  'views/reddit/albumview',
  'views/reddit/pictureview',
  'text!templates/loader.html'
], function($, _, Backbone, Vm, Events, masonry, modernizr, slides, RedditCollection, PostView, AlbumView, PictureView, LoaderTemplate){
  var RedditWidget = Backbone.View.extend({
    el: $('#reddit-widget'),
    initialize: function () {
      // isLoading is a useful flag to make sure we don't send off more than
      // one request at a time
      this.isLoading = false;
      this.numberLoaded = 0;
      this.loadCount = 0;
      this.redditCollection = new RedditCollection();
      this.redditCollection.subreddit = this.options.subreddit;
      ///_.bindAll(this, "render");
      _.bindAll(this, 'checkScroll');

      // bind to window
      $(window).scroll(this.checkScroll);

    },
    render: function () {

        $(this.el).masonry({
          itemSelector: '.box',
          columnWidth: 10,
          isFitWidth: true,
          isAnimated: false,
          animationOptions: {
            duration: 400
          }
        });

        this.loadResults();

    },
    loadResults: function () {
      var that = this;
      // we are starting a new load of results so set isLoading to true
      this.numberLoaded = 0;
      this.isLoading = true;
      $('#ajax-loader').show();
      // fetch is Backbone.js native function for calling and parsing the collection url
      this.redditCollection.fetch({
        success: function (posts) {
          that.loadCount = posts.length;
          _.each(posts.models, function (post) {
            if (that.isImgur(post.get('url')) === true){
              if (that.isImgurAlbum(post.get('url')) === false){
                if (that.isImage(post.get('url')) === true){
                  var postView = new PostView({ model: post , parent: that });
                  var newPost = postView.render();
                  that.appendPost(newPost);
                }else{
                  var pictureView = new PictureView({ model: post , parent: that });
                  var newPicture = pictureView.render();
                }
              }else{
                var albumView = new AlbumView({ model: post , parent: that });
                var newAlbum = albumView.render();
              }
            }
          });

        }
      });

      //this.isLoading = false;
    },
    appendPost: function (newPost) {
      $(newPost.el).imagesLoaded(function(){
        $(newPost.options.parent.el).append(newPost.el).masonry( 'appended', $(newPost.el), true );
        newPost.options.parent.isLoading = false;
        $('#ajax-loader').hide();
      });
    },
    checkScroll: function () {
      console.log(this.isLoading);
      var triggerPoint = 100; // 100px from the bottom
        if( !this.isLoading && $(window).scrollTop() + $(window).height() + triggerPoint > $(document).height() ) {
          //this.redditCollection.page += 1; // Load next page
          this.loadResults();
        }
    },
    isImgurAlbum: function(rawLink) {
      if(/[\/][a][\/]/.test(rawLink)){
        return true;
      }else{
        return false;
      }
    },
    isImage: function(rawLink) {
      if(/(jpg|gif|png)/.test(rawLink)){
        return true;
      }else{
        return false;
      }
    },
    isImgur: function(rawLink) {
      if(/imgur/.test(rawLink)){
        return true;
      }else{
        return false;
      }
    }
  });
  return RedditWidget;
});

var viewHelper = {
    linkMod: function(input) {
      return input;
    }
};