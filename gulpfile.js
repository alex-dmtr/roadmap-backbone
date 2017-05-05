var budo = require('budo')
var gulp = require('gulp')
var hbsfy = require('hbsfy')
var babelify = require('babelify')
var handlebars = require('gulp-handlebars')
var wrap = require('gulp-wrap')
var declare = require('gulp-declare')
var concat = require('gulp-concat')
var shell = require('gulp-shell')


gulp.task('build', ['scripts'], shell.task(['browserify --full-paths  ./app/main.js -t [ babelify --presets [ es2015 ] ] > ./public/bundle/main.js']))

gulp.task('inspect', ['build'], shell.task([
	'browserify-inspect-bundle ./public/bundle/main.js',
	'discify ./public/bundle/main.js > tree.html'
]))
// gulp.task('hbs', shell.task([
// 	'handlebars ./app/templates/*.handlebars -f ./app/templates/index.js'
// ]))

gulp.task('copy-handlebars', () => {
	gulp.src('./node_modules/handlebars/dist/handlebars.runtime.min.js')
		.pipe(gulp.dest('./public/bundle/'));
})
gulp.task('hbs', ['copy-handlebars'], () => {
	gulp.src('./app/templates/*.hbs')
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'Handlebars.templates',
			noRedeclare: true
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('./public/bundle/'));
});

gulp.task('scripts', ['hbs'], () => {
	return Promise.resolve()
	// return gulp
	// 	.src(['./node_modules/backbone.localstorage/build/backbone.localStorage.min.js'])
	// 	.pipe(gulp.dest('./public/js/vendor/'))
})
gulp.task('default', ['build'], () => {
	budo('./app/main.js', {
		live: true, // setup live reload 
		port: 8000, // use this port 
		// watchGlob: ['app/**/*.*, public/**/*.{html,css}'],
		dir: ['public'],
		stream: process.stdout,
		browserify: {
			transform: [
				[babelify, {
					presets: ["es2015"]
				}]
			],
			sourceType: 'module'
		},

		watchGlob: ['**/*.{html,css,hbs}'],

		serve: 'bundle/main.js',
		pushstate: true,
		base: "/",
		open: true,
	}).on('connect', function (ev) {
		console.log('Server running on %s', ev.uri)
		console.log('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
		console.log('bundle - %d bytes', buffer.length)
	}).on('reload', function (cb) {
		gulp.start('scripts')

	})

})