module.exports = function( grunt ) {
	'use strict';

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		jshint: {
			options: {
				browser: true,
				jquery: true,
				curly: true,
				eqeqeq: true,
				quotmark: true,
				trailing: true,
				debug: true,
				smarttabs: true,
				es3: true
			},
			files: [ 'Gruntfile.js', 'js/src/main.js', 'templates/*.json' ]
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: 'js/src',
					paths: {
						// Use CDN for jq
						jquery: 'empty:',
						bootstrap: '../vendor/bootstrap-plugins',
						lazyload: '../vendor/lazyload.min',
						transparency: '../vendor/transparency.min',
						lightbox: '../vendor/lightbox.min'
					},
					name: 'require.min',
					include: 'main',
					out: 'js/build/main.min.js',
					removeCombined: false
					//,optimize: "none"
				}
			}
		},
		responsive_images: {
			myTask: {
				options: {
					separator: '',
					sizes: [{
						name: '1024',
						width: 1024,
						quality: 0.9
					},
					{
						name: '480',
						width: 480,
						quality: 0.9
					}]
				},
				files: [{
					expand: true,
					src: ['assets/*/*.{jpg,png}'],
					cwd: 'img',
					dest: 'img/bags'
				}]
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},
		/*uncss: {
			dist: {
				files: {
					'css/main.css': [ 'index.html', 'bags-adults.html', 'events.html' ]
				},
				options: {
					compress: true,
					ignore: [ '.open', '.navbar-ex1-collapse', '.in', '.dropdown-toggle', '.dropdown-menu', '.lightboxOverlay' ]
				}
			}
		},*/
		watch: {
			files: [ 'js/src/*.js', 'css/*.scss' ],
			all: {
				files: [ 'js/src/*.js', 'css/*.scss' ],
				tasks: [ 'requirejs', 'sass', 'uncss' ]
			},
			sass: {
				files: [ 'css/*.scss' ],
				tasks: [ 'sass' ]
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-responsive-images' );
	// grunt.loadNpmTasks( 'grunt-uncss' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	// Tasks
	grunt.registerTask( 'default', [ 'jshint', 'requirejs', 'sass' ] );
	grunt.registerTask( 'w', [ 'watch:all' ] );
	grunt.registerTask( 'sasswatch', [ 'watch:sass' ] );
};
