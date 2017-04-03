var budo = require('budo')
var gulp = require('gulp')

gulp.task('default', () => {
	budo('./app/main.js', {
		live: true,             // setup live reload 
		port: 8000,             // use this port 
		// watchGlob: ['app/**/*.*, public/**/*.{html,css}'],
		dir: ['public'],
		// stream: process.stdout,
		open: true,
	}).on('connect', function (ev) {
		console.log('Server running on %s', ev.uri)
		console.log('LiveReload running on port %s', ev.livePort)
	}).on('update', function (buffer) {
		console.log('bundle - %d bytes', buffer.length)
	})

})