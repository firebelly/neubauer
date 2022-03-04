const mix = require('laravel-mix');
require('dotenv').config();
require('laravel-mix-criticalcss');

const proxy_url = process.env.PRIMARY_SITE_URL || 'http://neubauer.localhost';

// Public path helper
const publicPath = path => `${mix.publicPath}/${path}`;

// Source path helper
const src = path => `src/${path}`;

// Public Path
mix.setPublicPath('web');

// Browsersync
mix.browserSync({
  proxy: proxy_url,
  open: false,
  notify: false,
  files: ["src/styles/{*,**/*}", "src/js/{*,**/*}", "templates/{*,**/*}.html"]
});

// Styles
mix.sass(src`styles/main.scss`, 'web/build/styles');
// Critical CSS
// Config homepage and index page templates
const pageTemplates = ['about','research','people','events','exhibitions'];
const pageUrls = [];
pageUrls.push( { url: '/', template: 'index' });
pageTemplates.forEach(page => pageUrls.push({url:`/${page}`, template: '_index' }) );

mix.criticalCss({
  enabled: mix.inProduction(),
  paths: {
    base: proxy_url,
    templates: 'web/build/styles/critical/',
    suffix: '_critical.min'
  },
  urls: pageUrls
});

// JavaScript
mix.js(src`scripts/main.js`, 'web/build/scripts')
   .extract();

// Assets
mix.copy(src`images`,'web/build/images')
mix.copy(src`fonts`,'web/build/fonts')
mix.copy(src`svgs`,'web/build/svgs')

let SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
let svgSpriteDestination = publicPath`svgs-defs.svg`;
mix.webpackConfig({
  plugins: [
    new SVGSpritemapPlugin('src/svgs/*.svg', {
      output: {
        filename: 'build/spritemap.svg',
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
  postCss: [
    require('postcss-logical')({
      dir: 'ltr'
    })
  ],
  ignore: ['.DS_Store']
});

// Only bark on errors
mix.disableSuccessNotifications();

// Source maps when not in production.
mix.sourceMaps(false, 'source-map');

// Hash and version files in production.
mix.version();