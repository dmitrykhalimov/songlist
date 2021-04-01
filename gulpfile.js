"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/markup/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(rename("news-widget.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("markup/css"))
    .pipe(server.stream());
});

gulp.task("css-min", function () {
  return gulp.src("source/markup/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("news-widget.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("markup/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "markup/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/markup/sass/**/*.{scss,sass}", gulp.series("css", "css-min"));
  gulp.watch("source/markup/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});


gulp.task("js", function () {
  return gulp.src("source/markup/js/**", {
      base: "source"
    })
  .pipe(gulp.dest("markup"));
});

gulp.task("html", function () {
  return gulp.src("source/markup/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("markup"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/markup/fonts/**/*.{woff,woff2}",
    "source/markup/img/**",
    "source/markup/js/**",
    "source//*.ico"
    ], {
      base: "source/markup"
    })
  .pipe(gulp.dest("markup"));
});

gulp.task("clean", function () {
  return del("markup");
});

gulp.task("build", gulp.series("clean", "copy", "css", "css-min", "html"));
gulp.task("start", gulp.series("build", "server"));
