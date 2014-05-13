var gulp        = require("gulp");
var browserify  = require("gulp-browserify");
var jshint      = require("gulp-jshint");
var stylish     = require('jshint-stylish');
var path        = require("path");
var rimraf      = require("gulp-rimraf");
var argv        = require("minimist")(process.argv.slice(2));

// globs and build directories
var paths = {
  scripts: {
    all: "./**/*.js",
    lint: ["./hovercar.js", "./lib/**/*.js"],
    watch: ["./hovercar.js", "./lib/**/*.js"],
    build: ["./hovercar.js"],
    clean: [path.join(process.cwd(), "dist")]
  },
  build: {
    root: path.join(process.cwd(), "dist")
  }
};


/**
 * Utility functions
 */

function cleanUp(glob) {
  return gulp.src(glob, { read: false })
    .pipe(rimraf());
}

/** ========================================================================
 *
 * TASK DEFINITIONS
 *
 */

gulp.task("default", ["scripts"]);


gulp.task("scripts", ["jshint", "cleanScripts"], function () {

  return gulp.src(paths.scripts.build)
    .pipe(browserify({
      debug: !argv.production
    }))
    .pipe(gulp.dest(paths.build.root));

});


gulp.task("cleanScripts", function () {

  return cleanUp(paths.scripts.clean);

});



gulp.task("jshint", function () {

  return gulp.src(paths.scripts.lint)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
    // .pipe(jshint.reporter('fail'));

});



gulp.task("watch", ["default"], function () {

  gulp.watch(paths.scripts.watch, ["scripts"]);

});
