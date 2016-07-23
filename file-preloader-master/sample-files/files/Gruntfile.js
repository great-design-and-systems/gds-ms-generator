// CSS files to be concatenated to vendor.css
var vendorCss = ['bower_components/normalize.css/normalize.css',
    'bower_components/bootstrap/dist/css/bootstrap.css'];

// JS files to be concatenated to vendor.js
var vendorJS = ['bower_components/jquery/dist/jquery.js', 'bower_components/angular/angular.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/ui-rouptter/release/angular-ui-router.js',
    'bower_component/angular-resource/angular-resource.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/lodash/lodash.js'];

// Font files to be copied to bin/fonts
var vendorFonts = ['bower_components/bootstrap/fonts/*'];

// CSS files to be concatenated to app.css
var appCss = ['src/**/*.css'];

// JS files to be concatenated to app.css
var appJS = ['src/**/*.js', 'tmp/*.js'];

// HTML to be cached to template.js
var appHtml = ['src/**/*.html'];

// Sass main source file
var sassMain = 'src/styles/main.scss';

// index.html source for HTML Builder
var indexBuildFile = 'html-build/index.html';

// HTML Build section config
var sections = {
    layout: {
        header: 'html-build/sections/header.html',
        content: 'html-build/sections/content.html',
        footer: 'html-build/sections/footer.html'
    }
};