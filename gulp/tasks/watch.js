var gulp = require("gulp"),
  watch = require("gulp-watch"),
  browserSync = require("browser-sync").create();

// watch
gulp.task("watch", function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    },
    port: 3300
  });

  watch("app/index.html", function () {
    gulp.start("modernizr");
    browserSync.reload();
  });
  watch(["app/assets/styles/**/*.css", "app/assets/styles/**/*.scss"], function () {
    gulp.start("cssInject");
  });
  watch("app/assets/scripts/**/*.js", function () {
    gulp.start("refreshSite");
  })
});

// wstrzykiwanie stylów
gulp.task("cssInject", ["css"], function () {
  return gulp.src("app/temp/styles/styles.css").pipe(browserSync.stream());
});

// odświerzenie strony po upewnieniu się że scripts czyli webpack zadziałał
gulp.task("refreshSite", ["scripts"], function () {
  browserSync.reload();
});