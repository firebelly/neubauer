const mix = require('laravel-mix');

// Public path helper
const publicPath = path => `${mix.publicPath}/${path}`;

// Source path helper
const src = path => `assets/${path}`;

// Public Path
mix.setPublicPath('web/assets/dist');

// Browsersync
mix.browserSync('http://neubauer.localhost');

// Styles
mix.sass(src`styles/main.scss`, 'styles');

// JavaScript
mix.js(src`scripts/main.js`, 'scripts')
   .extract();

// Assets
mix.copy(src`images`,'web/assets/dist/images')
mix.copy(src`videos`,'web/assets/dist/videos')
mix.copy(src`fonts`,'web/assets/dist/fonts')
mix.copy(src`svgs`,'web/assets/dist/svgs')

// Autoload
// mix.autoload({
//   jquery: ['$', 'window.jQuery']
// });

let SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
let svgSpriteDestination = publicPath`svgs-defs.svg`;
mix.webpackConfig({
  plugins: [
    new SVGSpritemapPlugin('assets/svgs/*.svg', {
      output: {
        filename: 'spritemap.svg',
        chunk: {
          keep: true
        },
        svgo: true
      },
      sprite: {
        prefix: false
      }
    })
  ]
});

// Options
mix.options({
  processCssUrls: false,
  ignore: ['.DS_Store']
});

// Only bark on errors
mix.disableSuccessNotifications();

// Source maps when not in production.
mix.sourceMaps(false, 'source-map');

// Hash and version files in production.
mix.version([publicPath`images`]);
