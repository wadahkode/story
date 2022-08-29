const gulpMinifyCss = require("gulp-minify-css");
const gulpConcat = require("gulp-concat");
const gulpUglify = require("gulp-uglify");
const gulpHtmlmin = require("gulp-htmlmin");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const gulp = require("gulp");
const connect = require("gulp-connect");
const { dest, src, series, parallel, watch } = require("gulp");

gulp.task("server", async function () {
  return connect.server({
    root: "www",
    livereload: true,
  });
});

gulp.task("minifyCss", async function () {
  return src("./src/**/*.css")
    .pipe(
      gulpMinifyCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulpConcat("styles.css"))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("./www/dist/css/"))
    .pipe(connect.reload());
});

gulp.task("minifyJs", async function () {
  return src(["./src/**/*.js"])
    .pipe(gulpConcat("bundle.js"))
    .pipe(plumber())
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              modules: "auto",
            },
          ],
        ],
      })
    )
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulpUglify())
    .pipe(dest("./www/dist/js/"))
    .pipe(connect.reload());
});

gulp.task("minifyHtml", async function () {
  return src("src/*.html")
    .pipe(
      gulpHtmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("www"))
    .pipe(connect.reload());
});

gulp.task("watch", async function () {
  series("clean");
  watch("./src/*.html", series("minifyHtml"));
  watch("./src/**/*.css", series("minifyCss"));
  watch("./src/**/*.js", series("minifyJs"));
});

gulp.task("clean", async function () {
  return src("www", {
    read: false,
    allowEmpty: true,
  }).pipe(clean());
});

gulp.task(
  "build",
  series("clean", parallel("minifyHtml", "minifyCss", "minifyJs"))
);

gulp.task(
  "default",
  series(process.env === "production" ? "build" : parallel("watch", "server"))
);
