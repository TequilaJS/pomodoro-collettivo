module.exports = {
    client      : './client/',
    dist        : "./dist/",
    root        : "./",
    nodeModules : './node_modules',

    wiredepConf :   {
        json : require("./bower.json"),
        directory   : './client/assets/bower/',
        dependencies: true,
        devDependencies: true,
        include     : [
            './client/assets/bower/ng-materialize/dist/ng-materialize.css',
            './client/assets/bower/waves/dist/waves.css',
            './client/assets/bower/animate.css/animate.css'
        ],
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
                'client/app/**/*.js',
                'client/assets/styles/*.css',
                'client/assets/bower/ng-materialize/dist/ng-materialize.css',
                'client/assets/bower/waves/dist/waves.css',
                'client/assets/bower/animate.css/animate.css'
            ]
        }
    }


};