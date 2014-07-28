var gulp = require("gulp"), 
    lint = require("gulp-jshint");

gulp.task("default", ["lint"]);

gulp.task("lint", function () {
    // we can move this to an external JSON config later, if desired.
    // for a single value / var, I felt the the ROI was too low
    jsFilePattern = [
        "!./node_modules",
        "**/*.js"
    ];
    
    gulp.src( jsFilePattern )
        .pipe( lint() )
        .pipe( lint.reporter("default") )
});
