var gulp = require("gulp"), 
    lint = require("gulp-jshint");

gulp.task("default", ["lint"]);

gulp.task("lint", function () {
    // we can move this to an external JSON config later, if desired.
    // for a single value / var, I felt the the ROI was too low
    jsFilePattern = [
        "ch1/**/*.js",
        "ch2/**/*.js",
        "ch3/**/*.js",
        "ch4/**/*.js",
        "ch5/**/*.js",
        "ch6/**/*.js"
    ];
    
    gulp.src( jsFilePattern )
        .pipe( lint() )
        .pipe( lint.reporter("default") )
});
