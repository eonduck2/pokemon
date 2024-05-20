const gulp = require("gulp");
const less = require("gulp-less");

gulp.task("less", () => {
  return gulp.src("./style.less").pipe(less()).pipe(gulp.dest("../CSS/"));
});

gulp.task("watch", () => {
  gulp.watch("./*.less", gulp.series("less"));
});

gulp.task("default", gulp.parallel("less", "watch"));
