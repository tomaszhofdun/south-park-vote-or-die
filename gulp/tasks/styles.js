var gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  sourcemaps = require("gulp-sourcemaps"),
  sass = require("gulp-sass");


gulp.task("css", function() {
  return gulp
    .src("app/assets/styles/styles.css")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .on("error", function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit("end");
    })
    .pipe(sourcemaps.write())

    .pipe(gulp.dest("app/temp/styles/"));
});
