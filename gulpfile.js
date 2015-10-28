// incluimos los plugins y librerías que vamos a usar
var gulp    = require("gulp");
var plugins = require("gulp-load-plugins")({lazy: true});
var config  = require("./gulp.conf.js");

var paths   = config.paths;


gulp.task("default", ['help']);

gulp.task("help", plugins.taskListing);

gulp.task("qa", ['lint']);

// serve development environment
gulp.task("serve", ['lint', 'wiredep:dev', 'inject:dev','browser-sync']);



/**
 * ===================================================================================================================
 */
// linting for you code
gulp.task('lint', function(){
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});

// Serving
// browser sync
gulp.task('browser-sync',['nodemon'], function(){
    plugins.browserSync = require('browser-sync');
    plugins.browserSync.init(null, config.browserSync);
});

// nodemon
gulp.task('nodemon', function(cb){
    var started = false;
    return plugins.nodemon({
        script: './server.js'
    }).on('start', function(){
        if(!started) {
            cb();
            started = true;
        }
    })
});

// wiredep  - inject bower dependencies to the dev client
gulp.task('wiredep:dev', function(){

    console.log("Writing bower dependencies into index.html")
    plugins.wiredep    = require('wiredep').stream;

    return gulp
        .src("./src/index.html")
        .pipe(plugins.wiredep(config.wiredepConf))
        .pipe(gulp.dest('./src'))
});

// inject:dev - inject dependencies into the dev client
gulp.task('inject:dev', function(){
    console.log("Writing app dependencies into index.html")
    var target  = gulp.src("src/index.html");
    var source  =  gulp.src(config.injectConf.dev.files, {read:false});

    return target.pipe(plugins.inject(source, {relative: true}))
        .pipe(gulp.dest('src/'))
});








