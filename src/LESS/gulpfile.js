var gulp = require("gulp");
var less = require("gulp-less");

gulp.task("less", function () {
  return gulp.src("./style.less").pipe(less()).pipe(gulp.dest("../CSS/"));
});

gulp.task("watch", function () {
  gulp.watch("./*.less", gulp.series("less"));
});

gulp.task("default", gulp.parallel("less", "watch"));
