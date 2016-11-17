# Generated on 2015-05-23 using generator-angular 0.10.0
'use strict'
# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'

module.exports = (grunt) ->
	# Load grunt tasks automatically
	require('load-grunt-tasks') grunt
	# Time how long tasks take. Can help when optimizing build times
	require('time-grunt') grunt
	# Configurable paths for the application
	appConfig =
		app: require('./bower.json').appPath or 'app'
		dist: 'dist'
	# Define the configuration for all the tasks
	grunt.initConfig
		yeoman: appConfig
		watch:
			bower:
				files: [ 'bower.json' ]
				tasks: [ 'wiredep' ]
			coffee:
				files: [ '<%= yeoman.app %>/js/{,*/}*.{coffee,litcoffee,coffee.md}' ]
				tasks: [ 'newer:coffee:dist' ]
			scripts:
				files: ["<%= yeoman.app %>/js/{,*/}*.js"],
				tasks: ["browserify"]
			less:
				files: ['<%= yeoman.app %>/css/{,*/}*.less'],
				tasks: ["less", "autoprefixer"]
			styles:
				files: [ '<%= yeoman.app %>/css/{,*/}*.css' ]
				tasks: [
					'newer:copy:styles'
					'autoprefixer'
				]
			gruntfile: files: [ 'Gruntfile.js' ]
			livereload:
				options: livereload: '<%= connect.options.livereload %>'
				files: [
					'<%= yeoman.app %>/{,*/}*.html'
					'<%= yeoman.app %>/css/*.less'
					'<%= yeoman.app %>/js/*.js'
					'.tmp/js/{,*/}*.js'
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}'
				]
		connect:
			options:
				port: 9000
				hostname: '0.0.0.0'
				# hostname: 'localhost'
				livereload: 35729
			livereload: options:
				open: true
				middleware: (connect) ->
					[
						connect.static('.tmp')
						connect().use('/bower_components', connect.static('./bower_components'))
						connect.static(appConfig.app)
					]
			test: options:
				port: 9001
				middleware: (connect) ->
					[
						connect.static('.tmp')
						connect.static('test')
						connect().use('/bower_components', connect.static('./bower_components'))
						connect.static(appConfig.app)
					]
			dist: options:
				open: true
				base: '<%= yeoman.dist %>'
		jshint:
			options:
				jshintrc: '.jshintrc'
				reporter: require('jshint-stylish')
			all: src: [ 'Gruntfile.js' ]
		clean:
			dist: files: [ {
				dot: true
				src: [
					'.tmp'
					'<%= yeoman.dist %>/{,*/}*'
					'!<%= yeoman.dist %>/.git{,*/}*'
				]
			} ]
			server: '.tmp'
		autoprefixer:
			options: browsers: [ 'last 1 version' ]
			dist: files: [ {
				expand: true
				cwd: '.tmp/css/'
				src: '{,*/}*.css'
				dest: '.tmp/css/'
			} ]
		wiredep: app:
			src: [ '<%= yeoman.app %>/index.html' ]
			ignorePath: /\.\.\//
		coffee:
			options:
				sourceMap: true
				sourceRoot: ''
			dist: files: [ {
				expand: true
				cwd: '<%= yeoman.app %>/js'
				src: '{,*/}*.coffee'
				dest: '.tmp/js'
				ext: '.js'
			} ]
			test: files: [ {
				expand: true
				cwd: 'test/spec'
				src: '{,*/}*.coffee'
				dest: '.tmp/spec'
				ext: '.js'
			} ]
		browserify:
			options:
				debug: true
				sourceMap: true
			dist:
				options:
					browserifyOptions: {
						debug: true
					}
					transform:
						[
							[
								"babelify", {
									presets: ["es2015"]
									sourceMap: true
								}
							]
						]
				files:
					# if the source file has an extension of es6 then
					# we change the name of the source file accordingly.
					# The result file's extension is always .js
					".tmp/js/module.js": ["<%= yeoman.app %>/js/main.js"]
		less:
			options:
				paths: ["<%= yeoman.app %>/css"],
				cleancss: true
				strictMath: false
				strictUnits: true
			dist:
				files: [
					expand: true
					cwd: "<%= yeoman.app %>/css"
					src: ["*.less"]
					dest: ".tmp/css"
					ext: ".css"
				]
		useminPrepare:
			html: '<%= yeoman.app %>/{,*/}*.html'
			options:
				dest: '<%= yeoman.dist %>'
				flow: html:
					steps:
						js: []
						css: []
					post: {}
		usemin:
			html: [ '<%= yeoman.dist %>/{,*/}*.html' ]
			css: [ '<%= yeoman.dist %>/css/{,*/}*.css' ]
			options: assetsDirs: [
				'<%= yeoman.dist %>'
				'<%= yeoman.dist %>/images'
			]
		imagemin: dist: files: [ {
			expand: true
			cwd: '<%= yeoman.app %>/images'
			src: '{,*/}*.{png,jpg,jpeg,gif,ico}'
			dest: '<%= yeoman.dist %>/images'
		} ]
		svgmin: dist: files: [ {
			expand: true
			cwd: '<%= yeoman.app %>/images'
			src: '{,*/}*.svg'
			dest: '<%= yeoman.dist %>/images'
		} ]
		htmlmin: dist:
			options:
				collapseWhitespace: true
				conservativeCollapse: true
				collapseBooleanAttributes: true
				removeCommentsFromCDATA: true
				removeOptionalTags: true
			files: [ {
				expand: true
				cwd: '<%= yeoman.dist %>'
				src: [
					'*.html'
				]
				dest: '<%= yeoman.dist %>'
			} ]
		copy:
			dist: files: [
				{
					expand: true
					dot: true
					cwd: '<%= yeoman.app %>'
					dest: '<%= yeoman.dist %>'
					src: [
						'*.{ico,png,txt}'
						'.htaccess'
						'*.html'
						'images/{,*/}*.{webp}'
						'fonts/{,*/}*.*'
						'css/{,*/}*.*'
					]
				}
				{
					expand: true
					dot: true
					cwd: '.tmp'
					dest: '<%= yeoman.dist %>'
					src: [
						'js/{,*/}*.*'
						'css/{,*/}*.*'
					]
				}
				{
					expand: true
					cwd: '.tmp/images'
					dest: '<%= yeoman.dist %>/images'
					src: [ 'generated/*' ]
				}
				{
					expand: true
					dot: true
					cwd: '<%= yeoman.app %>/vendor'
					src: ['*.*']
					dest: '<%= yeoman.dist %>/vendor'
				}
				{
					expand: true
					dot: true
					cwd: '<%= yeoman.app %>'
					src: ['*.ico']
					dest: '<%= yeoman.dist %>'
				}
			]
			styles:
				expand: true
				cwd: '<%= yeoman.app %>/css'
				dest: '.tmp/css/'
				src: '{,*/}*.css'
		concurrent:
			server: [
				'browserify:dist'
				'less'
			]
			test: [
				'browserify'
				'less'
			]
			dist: [
				'browserify'
				'less'
				'imagemin'
				'svgmin'
			]
		karma: unit:
			configFile: 'test/karma.conf.coffee'
			singleRun: true

	grunt.registerTask 'serve', 'Compile then start a connect web server', (target) ->
		if target == 'dist'
			return grunt.task.run([
				'build'
				'connect:dist:keepalive'
			])
		grunt.task.run [
			'clean:server'
			'wiredep'
			'concurrent:server'
			'autoprefixer'
			'connect:livereload'
			'watch'
		]
		return
	grunt.registerTask 'server', 'DEPRECATED TASK. Use the "serve" task instead', (target) ->
		grunt.log.warn 'The `server` task has been deprecated. Use `grunt serve` to start a server.'
		grunt.task.run [ 'serve:' + target ]
		return
	grunt.registerTask 'test', [
		'clean:server'
		'less'
		'concurrent:test'
		'autoprefixer'
		'connect:test'
	]
	grunt.registerTask 'build', [
		'clean:dist'
		'wiredep'
		'useminPrepare'
		'concurrent:dist'
		'copy:dist'
		'autoprefixer'
		'usemin'
		'htmlmin'
	]
	grunt.registerTask 'default', [
		'newer:jshint'
		'test'
		'build'
	]
	return