const gulpMinifyCss = require("gulp-minify-css");
const gulpConcat = require("gulp-concat");
const gulpUglify = require("gulp-uglify");
const gulpHtmlmin = require("gulp-htmlmin");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const gulpPlumber = require("gulp-plumber");
const babel = require("gulp-babel");
const { dest, src, watch, series, parallel } = require("gulp");
const { server, reload } = require("gulp-connect");

const createServer = async () => {
  return server({
    root: "www",
    livereload: true,
  });
};

const minifyCss = async () => {
  return src("./src/**/*.css")
    .pipe(
      gulpMinifyCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulpConcat("styles.css"))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("./www/dist/css/"))
    .pipe(reload());
};

const minifyJs = async () => {
  return src(["./src/**/*.js"])
    .pipe(gulpConcat("bundle.js"))
    .pipe(gulpPlumber())
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
    .pipe(reload());
};

const minifyHtml = async () => {
  return src("src/*.html")
    .pipe(
      gulpHtmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("www"))
    .pipe(reload());
};

const watching = async () => {
  cleaning();
  watch("./src/**/*.js", series(minifyJs));
  watch("./src/**/*.css", series(minifyCss));
  watch("./src/*.html", series(minifyHtml));
};

const cleaning = async () => {
  return src("www/dist", {
    read: false,
    allowEmpty: true,
  }).pipe(clean());
};

const build = async () => {
  return series(cleaning, parallel(minifyCss, minifyJs, minifyHtml));
};

exports.build = build;
exports.default = series(
  process.env === "production" ? build : parallel(watching, createServer)
);
