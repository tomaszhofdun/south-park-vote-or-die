var gulp = require('gulp'),
modernizr = require("gulp-modernizr"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
sourcemaps = require("gulp-sourcemaps"),
sass = require("gulp-sass"),
simpleVars = require("postcss-simple-vars"),
nested = require("postcss-nested"),
importCss = require("postcss-import"),
mixin = require("postcss-mixins"),
postcssColorMod = require("postcss-color-mod-function"),
webpack = require("webpack"),
rename = require("gulp-rename"),
svg = require("gulp-svg-sprite"),
browserSync = require("browser-sync").create(),
del = require("del"),
imagemin = require("gulp-imagemin"),
usemin = require("gulp-usemin"),
rev = require("gulp-rev"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify"),
svg2png = require("gulp-svg2png");

const { series, parallel } = require('gulp');




  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
    //   modernizr
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  // Add classes like "flexbox" to html tag
  
  gulp.task("setClasses2",function setClasses2(){
    return gulp
      .src(["./app/assets/styles/**/*.css","./app/assets/scripts/**/*.js"])
      .pipe(
        modernizr({
          options: ["setClasses"]
        })
      )
      .pipe(gulp.dest("./app/temp/scripts"));
  })

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
    //   scripts
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  gulp.task("scripts", function(callback) {
     return webpack(require("./webpack.config.js"), function(err, stats) {
      if (err) {
        console.log(err.toString());
      }
      else {
        console.log(stats.toString());
      }
      callback();
    });
  })
  
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
    //   styles
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  gulp.task("css", function css(done) {
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
      .pipe(rename("style.css"))
      .pipe(gulp.dest("app/temp/styles/"));
      done();
  })

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
    //sprite
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  //   plik konfiguracyjny sprite ze scieżką do template
config = {
    shape: {
      spacing: {
        padding: 1
      }
    },
    mode: {
      css: {
        variables: {
          replaceSvgWithPng: function() {
            return function(sprite, render) {
              return render(sprite)
                .split(".svg")
                .join(".png");
            };
          }
        },
        sprite: "sprite.svg",
        render: {
          css: {
            template: "gulp/templates/sprite.css"
          }
        }
      }
    }
  };
  gulp.task("deleteOldSpriteCss",function deleteOldSpriteCss() {
    return del(["app/temp/sprite", "app/assets/images/icons/svg-compiled"]);
  });
  
  
  // sprite tworzy css-a z backgroundem i pozycją ikon oraz tworzy plik .svg ze wszystkimi ikonami
  gulp.task("createSprite",function createSprite() {
    return gulp
      .src("app/assets/images/icons/**/*.svg")
      .pipe(svg(config))
      .pipe(gulp.dest("app/temp/sprite"));
  });

  // kopiujemy wygenerowany plik css z pozycją każej ikony tam gdzie mamy wszystkie style
  gulp.task("copySpriteCss",function copySpriteCss() {
    return gulp
      .src("app/temp/sprite/css/*.css")
      .pipe(rename("_sprite.css"))
      .pipe(gulp.dest("app/assets/styles/modules"));
  });
  
  
  gulp.task("createPng",function createPng() {
    return gulp
      .src("app/temp/sprite/css/*.svg")
      .pipe(svg2png())
      .pipe(gulp.dest("app/temp/sprite/css"));
  });
  
  
  
  // kopiujemy utworzony zbiorczy svg i png do folderu app/assets/images
  gulp.task("copySpriteSvg",function copySpriteSvg() {
    return gulp
      .src("app/temp/sprite/css/**/*.{svg,png}")
      .pipe(gulp.dest("app/assets/images/icons/svg-compiled"));
  });
  
  // usuwamy folder sprite w katalogu sprite
  gulp.task("endCleaning",function endCleaning() {
    return del("app/temp/sprite");
  });
  
  
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
    //   monitor
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////


  gulp.task("monitor", function(callback) {
    browserSync.init({
        notify: false,
        server: {
          baseDir: "app"
        },
        port: 3300
      });
  
    gulp.watch("app/index.html", function (done) {
      browserSync.reload();
      done();
    })
    gulp.watch(["app/assets/styles/**/*.css", "app/assets/styles/**/*.scss"], gulp.series("css","cssInject"))
    gulp.watch("app/assets/scripts/**/*.js", gulp.series("setClasses2", "scripts", "refreshSite" ))
    callback();
  } ) 
  
  gulp.task("cssInject", function cssInject() {
    return gulp.src("app/temp/styles/style.css")
    .pipe(browserSync.stream());
  })
  
  gulp.task("refreshSite", function refreshSite(done) {
    browserSync.reload();
    done();
  })
  
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
    //   build
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  gulp.task("deleteDocsFolder", function deleteDocsFolder() {
    return del("./docs")
  });

  gulp.task("copyOtherFiles", function copyOtherFiles() {
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

  gulp.task("optimizeAndCopyImages", function optimizeAndCopyImages() {
    return gulp
      .src([
        "./app/assets/images/**/*",
        "!./app/assets/images/icons/svg",
        "!./app/assets/images/icons/svg/**/*",
        "!./app/assets/images/not_used",
        "!./app/assets/images/not_used/**/*",
        "!./app/assets/images/uncompressed",
        "!./app/assets/images/uncompressed/**/*"
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

  gulp.task("use_min", function use_min() {
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

  gulp.task("scripts_with_modernizr", gulp.series("setClasses2", "scripts"))
  
  gulp.task("icons", gulp.series("deleteOldSpriteCss", "createSprite",  "copySpriteCss", "createPng", "copySpriteSvg", "endCleaning"))

  gulp.task("build", gulp.series("deleteDocsFolder", "copyOtherFiles", "icons", "optimizeAndCopyImages", "css", "scripts_with_modernizr", "use_min"))
 