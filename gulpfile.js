var gulp = require("gulp");
var path = require("path");
var plug = require("gulp-load-plugins")();

gulp.task('less', function(){
    return gulp.src('./client/assets/styles/**/*.less')
        .pipe(plug.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(plug.autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(plug.minifyCss())
        .pipe(gulp.dest('./dist/css/style.css'))
    ;
});


gulp.task("scripts", function(){
    return gulp.src('./client/assets/bower')
});
