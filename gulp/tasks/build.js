var gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  usemin = require("gulp-usemin"),
  rev = require("gulp-rev"),
  cssnano = require("gulp-cssnano"),
  uglify = require("gulp-uglify");

gulp.task("deleteDocsFolder", function() {
  return del("./docs");
});

gulp.task("copyOtherFiles", ["deleteDocsFolder"], function() {
  var pathToCopy = [
    "./app/**/*",
    "!./app/index.html",
    "!./app/assets/images/**",
    "!./app/assets/styles/**",
    "!./app/assets/scripts/**",
    "!./app/temp",
    "!./app/temp/**"
  ];
  return gulp.src(pathToCopy).pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages", ["deleteDocsFolder", "icons"], function() {
  return gulp
    .src([
      "./app/assets/images/**/*",
      "!./app/assets/images/icons/svg",
      "!./app/assets/images/icons/svg/**/*"
    ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      })
    )
    .pipe(gulp.dest("./docs/assets/images"));
});

// usemin zmienia odnośnik do css i js w index.html a w połączeniu z:
// gulp-rev: dodaje losowy ciąg znaków na końcu
// gulp-cssnano: minimalizuje css
// gulp-uglify: minimalizuje js
gulp.task("usemin", ["deleteDocsFolder", "css", "scripts"], function() {
  return gulp
    .src([
      "./app/index.html"
    ])
    .pipe(
      usemin({
        css: [
          function() {
            return rev();
          },
          function() {
            return cssnano();
          }
        ],
        js: [
          function() {
            return rev();
          },
          function() {
            return uglify();
          }
        ]
      })
    )
    .pipe(gulp.dest("./docs"));
});

gulp.task("build", [
  "deleteDocsFolder",
  "copyOtherFiles",
  "optimizeImages",
  "usemin"
]);
