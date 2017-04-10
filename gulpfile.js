var budo = require('budo')
var gulp = require('gulp')
var hbsfy = require('hbsfy')
var babelify = require('babelify')
var handlebars = require('gulp-handlebars')
var wrap = require('gulp-wrap')
var declare = require('gulp-declare')
var concat = require('gulp-concat')
var shell = require('gulp-shell')

gulp.task('build', ['scripts'], shell.task(['browserify --full-paths  app/app.js -t [ babelify --presets [ es2015 ] ] > public/bundle.js']))

gulp.task('inspect', ['build'], shell.task([
	'browserify-inspect-bundle public/bundle.js',
	'discify public/bundle.js > tree.html'
]))
gulp.task('hbs', shell.task([
	'handlebars app/templates/*.handlebars -f app/templates/index.js'
]))

gulp.task('scripts', ['hbs'], () => {
	return Promise.resolve()
	// return gulp
	// 	.src(['./node_modules/backbone.localstorage/build/backbone.localStorage.min.js'])
	// 	.pipe(gulp.dest('./public/js/vendor/'))
})
gulp.task('default', ['build'], () => {
	budo('./app/app.js', {
		live: true,             // setup live reload 
		port: 8000,             // use this port 
		// watchGlob: ['app/**/*.*, public/**/*.{html,css}'],
		dir: ['public'],
		stream: process.stdout,
		browserify: {
			transform: [[babelify, { presets: ["es2015"]}]],
			sourceType: 'module'
		},

		watchGlob: ['**/*.{html,css,handlebars}'],
		
		serve: 'bundle.js',
		pushstate: true,
		base: "/",
		open: true,
	}).on('connect', function (ev) {
		console.log('Server running on %s', ev.uri)
		console.log('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
		console.log('bundle - %d bytes', buffer.length)
	}).on('reload', function(cb) {
		console.log('reload')
		gulp.start('scripts')
		
	})

})