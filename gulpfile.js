var gulp = require("gulp");
var plug = require("gulp-load-plugins")({lazy: true});
var config = require("./gulp.conf.js");


/**
 * build
 * create a distribution-able client build
 */

gulp.task("build", function(){
    return gulp
        .src("./client/")
        .pipe(gulp.dest('./dist/'));
});

/**
 * serve-dev
 * run continuous watch tasks on file changes
 */

gulp.task("serve-dev", ['wiredep'], function(){
    return gulp
        .src("./client/")
        .pipe(gulp.dest('./dist/'));
});

/**
 * serve-build
 * run build single time and serve the production build
 */

gulp.task("serve-build", function(){
    return gulp
        .src("./client/")
        .pipe(gulp.dest('./dist/'));
});

/**
 * ===================================================================================================================
 */

gulp.task("build-dist", ['jshint'], function(){
    return gulp
        .src('./client/app/**/*.js')
        .pipe(plug.concat("app.js"))
        .pipe(gulp.dest("./dist/app"))
        .pipe(plug.rename('app.min.js'))
        .pipe(plug.uglify())
        .pipe(gulp.dest('./dist/app'))
});

gulp.task("jshint", function(){
    return gulp
        .src('./client/app/**/*.js')
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('default'))
});

gulp.task("templates", function(){
    return gulp
        .src('./client/app/**/*.html')
        .pipe(plug.angularTemplatecache(
            "templates.js",
            {
                module: 'pomodoro',
                root: 'app/',
                standalone: false
            }
        ))
        .pipe(gulp.dest('./dist/app'))
})

// wiredep  - inject bower ependencies to the dev client
gulp.task('wiredep', function(){
    console.log("Writing bower dependencies into index.html")
    plug.wiredep = require('wiredep').stream;
    return gulp
        .src("./client/index.html")
        .pipe(plug.debug({title: 'Wiredep', minimal: false}))
        .pipe(plug.wiredep(config.wiredepConf))
        .pipe(gulp.dest('./client'))
});

// inject - inject non-bower dependencies into the dev client

gulp.task('inject', function(){
    console.log("Writing app dependencies into index.html")
    var target = gulp.src("client/index.html");
    var source =  gulp.src([
        'client/app/**/*.js',
        'client/assets/styles/*.css',
        'client/assets/bower/ng-materialize/dist/ng-materialize.css',
        'client/assets/bower/waves/dist/waves.css',
        'client/assets/bower/animate.css/animate.css'
    ], {read:false});
    return target.pipe(plug.inject(source, {relative: true}))
        .pipe(gulp.dest('client/'))
});


gulp.task("help", plug.taskListing);

gulp.task("default", ['help'])