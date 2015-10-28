module.exports = {
    source      : './src/',
    dist        : "./dist/",
    root        : "./",
    nodeModules : './node_modules',

    wiredepConf :   {
        json : require("./bower.json"),
        directory   : './src/assets/bower/',
        dependencies: true,
        devDependencies: true,
        exclude     : [
            /jquery/,
            /bootstrap.js/
        ]
    },

    templatesConf: {
        module: 'pomodoro',
        root: 'app/',
        standalone: false
    },
    injectConf: {
        dev: {
            files: [
                'src/app/**/*.js',
                'src/assets/styles/*.css',
                'src/assets/bower/ng-materialize/dist/ng-materialize.css',
                'src/assets/bower/waves/dist/waves.css',
                'src/assets/bower/animate.css/animate.css'
            ]
        }
    },
    paths: {
        source  : './src',
        dist    : './dist',
        scripts : './src/app/**/*.js',
        index   : './src/index.html'
    },
    browserSync: {
        proxy: 'http://localhost:3000',
        files: ['src/**/*.*'],
        browser: 'google chrome',
        port: 3000
    }


};