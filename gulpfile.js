var gulp = require("gulp");
var $ = require("gulp-load-plugins")({lazy: true});
var config = require("./gulp.conf.js");


gulp.task("help", $.taskListing);
gulp.task("default", ['help']);


/**
 * build
 * create a distribution-able client build
 */

gulp.task("build", ['clean', 'min-app', ], function(){
    console.log("done");
});

/**
 * serve-dev
 * run continuous watch tasks on file changes
 */

gulp.task("serve:dev", ['wiredep:dev', 'inject:dev'], function(){
    return gulp
        .src("./client/")
        .pipe(gulp.dest('./dist/'));
});

/**
 * serve-build
 * run build single time and serve the production build
 */

gulp.task("serve:dist", function(){
    return gulp
        .src("./client/")
        .pipe(gulp.dest('./dist/'));
});



/**
 * ===================================================================================================================
 */

// minify angular scripts
gulp.task("min:app", ['jshint'], function(){
    return gulp
        .src('./client/app/**/*.js')
        .pipe($.concat("app.min.js"))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist'))
});

// minify dependencies
gulp.task("min:bower", function(){
    return gulp
        .src('./client/assets/bower/**/*.js')
        .pipe($.concat("lib.js"))
        .pipe(gulp.dest("./dist/app"))
        .pipe($.rename('lib.min.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist'))
});

gulp.task("jshint", function(){
    return gulp
        .src('./client/app/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
});

// inject
gulp.task("build:templateCache", function(){
    return gulp
        .src('./client/app/**/*.html')
        .pipe($.angularTemplatecache(
            "templates.js",
            config.templatesConf
        ))
        .pipe(gulp.dest('./dist/app'))
});

// delete dist content
gulp.task("clean:dist", function(){
    var del = require("del");
    del(['dist/**/*', '!dist/']);
})



// wiredep  - inject bower dependencies to the dev client
gulp.task('wiredep:dev', function(){
    console.log("Writing bower dependencies into index.html")
    $.wiredep    = require('wiredep').stream;
    return gulp
        .src("./client/index.html")
        .pipe($.debug({title: 'Wiredep', minimal: true}))
        .pipe($.wiredep(config.wiredepConf))
        .pipe(gulp.dest('./client'))
});

// inject:dev - inject dependencies into the dev client
gulp.task('inject:dev', function(){
    console.log("Writing app dependencies into index.html")
    var target  = gulp.src("client/index.html");
    var source  =  gulp.src(config.injectConf.dev.files, {read:false});
    return target.pipe($.inject(source, {relative: true}))
        .pipe(gulp.dest('client/'))
});

// inject:dist - inject dependencies into dist client
gulp.task('inject:dist', function(){
    console.log("Writing dependencies into index.html")
    var target  = gulp.src("client/index.html");
    var source  =  gulp.src(config.injectConf.dev.files, {read:false});

    return target.pipe($.inject(source, {relative: true}))
        .pipe(gulp.dest('dist/'))
});

gulp.task("html", function(){
    var assets = $.useref.assets({searchPath: ['client', '.']});

    console.log("Running the html task...")
});

