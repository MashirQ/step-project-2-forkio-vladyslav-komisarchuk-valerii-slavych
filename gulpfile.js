import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import jsMinify from 'gulp-js-minify';
import imagemin from 'gulp-imagemin';
import clean from 'gulp-clean';

export const cleanDist = () => gulp.src('./dist/*',{read: false}).pipe(clean());

const BS = browserSync.create();
const sass = gulpSass(dartSass);

const styles = () => gulp.src('./src/styles/**/*.scss')
      .pipe(sass())
      .pipe(concat('styles.min.css'))
      .pipe(cleanCSS())
      .pipe(autoprefixer({
        cascade: false
    }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());

const images = () => gulp.src('./src/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/img'));

export const scripts = () => gulp.src('./src/js/*.js')
      .pipe(concat('scripts.min.js'))
      .pipe(jsMinify())
      .pipe(gulp.dest('./dist/js'));

export const build = gulp.series(cleanDist, styles, images, scripts);

export const dev = gulp.series(() => {
    BS.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('*.html').on('change', BS.reload);

    gulp.watch('./src/**/*', gulp.series(styles, (done) => {
        BS.reload();
        done();
    }));
    gulp.watch('./src/**/*', gulp.series(scripts, (done) => {
        BS.reload();
        done();
    }));
});
