/// <binding Clean='clean' ProjectOpened='watch,build' />

'use strict';

(function(require) {

    var roots =
        {
            www: 'wwwroot/',
            sass: 'sass/',
            app: 'ClientApp/'
        };

    var paths = {
        js: roots.www + 'js/',
        jsDist: roots.www + 'js/dist/',
        css: roots.www + 'css/',
        cssDist: roots.www + 'css/dist/'
    }

    var globs = {
        js: paths.js + '**/*.js',
        jsLib: paths.js + 'lib/**/*.+(js|jsx)',
        jsLibMin: paths.js + 'lib/**/*.min.+(js|jsx)', 
        jsx: roots.app + '/**/*.jsx',                   //all jsx files found in ClientApp folder
        css: paths.css + '**/*.css',                    //all css files found in wwwroot/css - used for minifcation
        cssMain: paths.css + 'site.css',                //sass transpile target - site.css file in wwwroot/css
        cssMainMin: paths.css + 'site.min.css',         //minify target - site.min.css file in wwwroot/css
        sass: roots.sass + '**/*.s+(a|c)ss'             //all scss/saas files found in each folders in Sass
    }

    var gulp = require('gulp'),
        gulpSync = require('gulp-sync')(gulp),
        rimraf = require('rimraf'),
        path = require('path'),
        browserify = require('browserify'),
        babelify = require('babelify'),
        fs = require('fs'),
        map = require('map-stream'),
        glob = require('glob-all'),
        gutil = require('gulp-util'),
        source = require('vinyl-source-stream'),
        sourcemaps = require('gulp-sourcemaps'),
        $ = require('gulp-load-plugins')({ lazy: true }),
        buffer = require('vinyl-buffer'),
        requireDir = require('require-dir'),
        del = require('del');

    var f = {
        // Returning the names of the subfolders for the given folder path.
        getFolders: function (folderPath, exclude) {
            return fs.readdirSync(folderPath).filter(function (file) {
                var isValidDirectory = fs.statSync(path.join(folderPath, file)).isDirectory();
                if (exclude && Array.isArray(exclude))
                    isValidDirectory = isValidDirectory && exclude.indexOf(file) === -1;
                return isValidDirectory;
            });
        },
        // Returning array of concat tasks for the subfolders of the given folder.
        generateSubFolderTasks: function (folderPath, exclude) {
            var folders = f.getFolders(folderPath, exclude);
            var destinationPath = path.join(paths.jsDist);
            return folders.map(function (folder) {
                return gulp.src(path.join(folderPath, folder, '/**/*.js'))
                    .pipe($.concat('areas.' + folder + '.min.js'))
                    .pipe($.uglify())
                    .pipe(gulp.dest(destinationPath));
            });
        },
        generateGroupsConcatanate: function (bundleNames, minify) {

            return bundleNames.map(function (bundle) {
                var filesGlob = minify ? [paths.js + bundle + '/**/*.js', '!' + paths.js + bundle + '/**/*.min.js']
                    : [paths.js + bundle + '/**/*.min.js'];

                var files = glob.sync(filesGlob.concat(bundles[bundle].excluded));

                var task = gulp.src(bundles[bundle].included)
                    .pipe(map(function (file, cb) {
                        var matchedFile = $.slash(file.path).substring($.slash(file.path).lastIndexOf(roots.www));
                        var matchedFileIndex = files.indexOf(matchedFile);
                        if (matchedFile !== -1)
                            files.splice(matchedFileIndex, 1);
                        cb(null, file);
                    }))
                    .pipe($.concat(bundle + '.js'));

                if (minify)
                    task = task.pipe($.uglify())
                        .pipe($.rename({ suffix: '.min' }));

                return task.pipe(gulp.dest(paths.jsDist)).on('end', function () {
                    if (files.length > 0)
                        throw new Error('Inalid [' + bundle + '] bundle configuration! Following scripts are missing in the configuration:\n\t' + files.join('\n\t'));
                });
            });
        }
    }

    gulp.task('concat:js-lib', function () {
        return f.generateGroupsConcatanate(['lib']);
    });

    gulp.task('concat:js-infra', function () {
        return f.generateGroupsConcatanate(['core', 'services', 'components'], true);
    });

    gulp.task('concat:js-areas', function () {
        return f.generateSubFolderTasks(path.join(paths.js, '/areas'), []);
    });

    gulp.task('concat', ['concat:js-lib', 'concat:js-infra', 'concat:js-areas']);

        gulp.task('lint:js', function () {
            return gulp.src([globs.js,
                             globs.jsx,
                             '!' + globs.jsLib,
                             '!' + globs.jsLibMin,
                             '!' + paths.jsDist + '**/*'])
                        .pipe($.cached('eslint'))
                        .pipe($.print())
                        .pipe($.eslint())
                        .pipe($.eslint.format())
                        .pipe($.eslint.result(function (result) {
                            if (result.warningCount > 0 || result.errorCount > 0)
                                delete $.cached.caches.eslint[path.resolve(result.filePath)];
                        }))
                        .pipe($.eslint.failAfterError());
        });

    gulp.task('lint', ['lint:js']);

    gulp.task('minify:css', function () {
        return gulp.src([globs.cssMain])
            .pipe($.print())
            .pipe($.rename({ suffix: '.min' }))
            .pipe($.cleanCss())
            .pipe(gulp.dest(paths.css));
    });

    gulp.task('minify', ['minify:css']);

    //gulp.task('transpile:jsx', function () {
    //    return gulp.src(globs.jsx)
    //        .pipe($.changed(paths.js, { extension: '.js' }))
    //        .pipe($.print())
    //        .pipe($.babel({
    //            presets: ['react', 'es2015' ]
    //        }))
    //        .on('error', function (error) {
    //            console.log(error.message);
    //            this.emit('end');
    //        })
    //        .pipe(gulp.dest(paths.js));
    //});



    //gulp.task('scripts', function () {
    //    bundleApp(false);
    //});

    //gulp.task('deploy', function () {
    //    bundleApp(true);
    //});

    //gulp.task('watch', function () {
    //    gulp.watch(['./app/*.js'], ['scripts']);
    //});

    //// When running 'gulp' on the terminal this task will fire.
    //// It will start watching for changes in every .js file.
    //// If there's a change, the task 'scripts' defined above will fire.
    //gulp.task('default', ['scripts', 'watch']);

    //// Private Functions
    //// ----------------------------------------------------------------------------
    //function bundleApp(isProduction) {
    //    scriptsCount++;
    //    // Browserify will bundle all our js files together in to one and will let
    //    // us use modules in the front end.
    //    var appBundler = browserify(roots.app + 'App.jsx', {
    //        extensions: ['.js', '.jsx'],
    //        paths: ['./node_modules', roots.app],
    //        //entries: './app/app.js',
    //        debug: true
    //    })

    //    var dependencies = [
    //        'react',
    //        'react-dom'
    //    ];
    //    var scriptsCount = 0;
    //    // If it's not for production, a separate vendors.js file will be created
    //    // the first time gulp is run so that we don't have to rebundle things like
    //    // react everytime there's a change in the js file
    //    if (!isProduction && scriptsCount === 1) {
    //        // create vendors.js for dev environment.
    //        browserify({
    //            require: dependencies,
    //            debug: true
    //        })
    //            .bundle()
    //            .on('error', gutil.log)
    //            .pipe(source('vendor.js'))
    //            .pipe(gulp.dest(paths.js));
    //    }
    //    if (!isProduction) {
    //        // make the dependencies external so they dont get bundled by the 
    //        // app bundler. Dependencies are already bundled in vendor.js for
    //        // development environments.
    //        dependencies.forEach(function (dep) {
    //            appBundler.external(dep);
    //        })
    //    }

    //    appBundler
    //        // transform ES6 and JSX to ES5 with babelify
    //        .transform("babelify", { presets: ["es2015", "react"] })
    //        .bundle()
    //        .on('error', gutil.log)
    //        .pipe(source('app.js'))
    //        .pipe(gulp.dest(paths.js));
    //}

    //gulp.task('transpile:es', function () {
    //        let bundler = browserify(`${roots.app}App.jsx`,
    //            {
    //                debug: true,
    //                extensions: ['.js', '.jsx'],
    //                paths: ['./node_modules', roots.app],
    //                cache: {},
    //                packageCache: {},
    //            });

    //        bundler
    //            .transform(babelify, { plugins: ['lodash'], presets: ['react', 'es2015', 'stage-2'] }).bundle();

    //        function rebundle(file) {
    //            return bundler
    //                .bundle()
    //                .on('error', (err) => {
    //                    console.log('Browserify error:', err);
    //                })
    //                .pipe(source('app.js'))
    //                .pipe(sourcemaps.init({ loadMaps: true }))
    //                .pipe(sourcemaps.write('./'))
    //                .pipe(gulp.dest(paths.js));
    //        }

    //        bundler.on('update', rebundle);
    //        return rebundle();
    //});


    function buildApp(watch) {
        var bundler = browserify(roots.app + 'App.jsx',
            {
                debug: true,
                extensions: ['.js', '.jsx'],
                paths: ['./node_modules', roots.app],
                fullPaths: watch
            });

        bundler
            .transform(babelify, { 'presets': ['react', 'es2015', 'stage-2'] })
            //.transform(browserifyCss, { global: true })
            .bundle();

        var rebundle = function (file) {
            if (file) {
                file.map(function (fileName) {
                    gutil.log('File updated', gutil.colors.yellow(fileName));
                });
            }

            return bundler
                .bundle()
                .on('error', function (err) {
                    gutil.log('Browserify error:', err);
                })
                .pipe(source('app.js'))
                .pipe(buffer())
                //.pipe(gulpif(config.production, uglify()))
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(paths.js));
        };

        bundler.on('update', rebundle);
        bundler.on('log', gutil.log);
        return rebundle();
    }


    gulp.task('transpile:jsx', function () {
        return buildApp(false);
    });

    //gulp.task('transpile:jsx', function () {
    //    return gulp.src(globs.jsx)
    //        .pipe($.changed(paths.js, { extension: '.js' }))
    //        .pipe($.print())
    //        .pipe($.babel({
    //            presets: ['react']
    //        }))
    //        .on('error', function (error) {
    //            console.log(error.message);
    //            this.emit('end');
    //        })
    //        .pipe(gulp.dest(paths.js));
    //});

    gulp.task('transpile:sass', function () {
        return gulp.src(globs.sass)
            .pipe($.print())
            .pipe($.sass().on('error', $.sass.logError))
            .pipe(gulp.dest(paths.css));
    });

    gulp.task('transpile', ['transpile:jsx', 'transpile:sass']);

    gulp.task('clean:js', function (cb) {
        rimraf(paths.jsDist, cb);
    });

    gulp.task('clean:css', function (cb) {
        rimraf(globs.cssMainMin, cb);
    });

    gulp.task('clean', ['clean:js', 'clean:css']);

   // Watch Tasks
    gulp.task('watch', function () {

        gulp.watch(globs.jsx, ['transpile:jsx']);
        buildApp(true);

        gulp.watch(globs.sass, ['transpile:sass']);

        gulp.watch([
            globs.js,
            globs.jsx,
            '!' + globs.jsLib
        ], ['lint']);
    });

    var requirejs = require('gulp-requirejs');

    gulp.task('clean-temp', function () {
        return del(['dest']);
    });

    gulp.task('es6-amd', ['clean-temp'], function () {
        return gulp.src(['app/*.js', 'app/**/*.js'])
            .pipe(babel({ modules: "amd" }))
            .pipe(gulp.dest('dest/temp'));
    });

    gulp.task('bundle-amd-clean', function () {
        return del(['es5/amd']);
    });

    gulp.task('amd-bundle', ['bundle-amd-clean', 'es6-amd'], function () {
        return requirejs({
            name: 'modules',
            baseUrl: 'dest/temp',
            out: 'main.js'
        })
            .pipe(uglify())
            .pipe(gulp.dest("es5/amd"));
    });

    gulp.task('amd', ['amd-bundle']);

    gulp.task('build', gulpSync.sync(['lint', 'amd'], 'build'));
    gulp.task('publish', gulpSync.sync(['transpile', 'clean', 'minify'], 'publish'));

}(require));
