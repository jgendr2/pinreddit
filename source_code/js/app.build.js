({
    appDir: "../",
    baseUrl: "js",
    dir: "../../appdirectory-build",
    paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    //plugins: 'libs/plugins',

    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    //sinon: 'libs/sinon/sinon.js',
    masonry: 'libs/masonry/jquery.masonry.min',
    slides: 'libs/slides/slides.min.jquery',
    modernizr: 'libs/modernizr/modernizr-transitions',
    // Require.js plugins
    text: 'libs/require/text',
    order: 'libs/require/order',

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates'
  },
  shim: {
    'masonry': {
            deps: ['jquery'],
            exports: 'jQuery.fn.masonry'
    },
    'slides': {
            deps: ['jquery'],
            exports: 'jQuery.fn.slides'
    },
    'modernizr': {
            deps: ['jquery'],
            exports: 'jQuery.fn.modernizr'
    }
  },
  urlArgs: "v=3",
    modules: [
        {
            name: "main"
        }
    ]
})