var gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  usemin = require("gulp-usemin"),
  rev = require("gulp-rev"),
  cssnano = require("gulp-cssnano"),
  uglify = require("gulp-uglify"),
  // tinify = require("tinify");
  tinypng = require('gulp-tinypng-compress');
  

// gulp.task("tinify", function() {
//   tinify.key = "R8y9qFT9RxQLcsV25PS0jfzpQqcCcsH8";

//   tinify.fromFile("./app/assets/images").toFile("./app/temp", function(err) {
//     let compressionsThisMonth = (500 - tinify.compressionCount);
//     console.log("Zostało mi jeszcze " + compressionsThisMonth);
//     if (err instanceof tinify.AccountError) {
//       console.log("The error message is: " + err.message);
//       // Verify your API key and account limit.
//     } else if (err instanceof tinify.ClientError) {
//       // Check your source image and request options.
//     } else if (err instanceof tinify.ServerError) {
//       // Temporary issue with the Tinify API.
//     } else if (err instanceof tinify.ConnectionError) {
//       // A network connection error occurred.
//     } else {
//       // Something else went wrong, unrelated to the Tinify API.
//     }
//   });
// })

gulp.task('tinypng', ["deleteDocsFolder", "icons"], function () {
  return gulp.src([
    "./app/assets/images/**/*",
    "!./app/assets/images/uncompressed",
    "!./app/assets/images/uncompressed/**/*",
    "!./app/assets/images/not_used",
    "!./app/assets/images/not_used/**/*",
    "!./app/assets/images/gif",
    "!./app/assets/images/gif/**/*",
    "!./app/assets/images/icons",
    "!./app/assets/images/icons/**/*",

  ])
      .pipe(tinypng({
          key: 'R8y9qFT9RxQLcsV25PS0jfzpQqcCcsH8',
          sigFile: 'images/.tinypng-sigs',
          log: true,
          summarize: true
      }))
      .pipe(gulp.dest('./docs/assets/images'));
});


gulp.task("optimizeImages", ["tinypng","icons"], function() {
  return gulp
    .src([
      "./app/assets/images/**/*",
      "!./app/assets/images/*",
      "!./app/assets/images/uncompressed",
      "!./app/assets/images/uncompressed/**/*",
      "!./app/assets/images/not_used",
      "!./app/assets/images/not_used/**/*"
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
  "usemin",
  "modernizr"
]);
