这是一个grunt练习项目。

配置任务有：

* 清理文件（grunt-contrib-clean）
* js代码检查（grunt-contrib-jshint）
* 代码压缩 （grunt-contrib-uglify）
* 文件合并（grunt-contrib-concat）
* SASS编译（grunt-contrib-sass）
* 实时监听（grunt-contrib-watch）

详细配置如下：

    module.exports = function (grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
          js: ['build/src/*.js', '!build/src/*.vendor.js'],
          css: ['build/src/*.css']
        },
        jshint: {
          options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true
            },
          },
          files: {
            //定义要检查的文件
            src: ['gruntfile.js', 'src/**/*.js']
          },
        },
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'build/css/clock.css':'sass/clock.scss'
            }
          }
        },
        concat: {
          options: {
            //不同文件之间用分好隔开
            separator: ';'
          },
          dist: {
            //整合源文件路径
            src: ['src/**/*.js'],
            //整合后的目标文件
            dest: 'dist/<%= pkg.name %>.js',
          }
        },
        uglify: {
          options: {
            //用于在文件顶部生成一个注释
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            //生成sourcemap文件，方便调试使用
            sourceMap: true,
            //指定生成sourcemap文件的路径，不指定则生成到源文件的同级目录下
            sourceMapName: 'build/src/sourcemap.map'
          },
          build: {
            //要压缩的源文件
            //src: 'src/*.js',
            src: ['<%= concat.dist.dest %>'],
            //指定压缩任务后目标文件
            dest: 'build/src/<%= pkg.name %>.min.js'
          },
        },
        watch: {
          sass: {
            files: ['sass/**.scss'],
            tasks: ['sass'],
          },
          js : {
            files: ['src/**/*.js'],
            tasks: ['jshint'],
          },
        }
      });

      // 加载包含的插件。
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');

      // 默认被执行的任务列表。
      grunt.registerTask('default', ['clean','jshint','concat','uglify','sass']);

    };


 由于我们使用了requirejs来加载js, 为了让整体架构更加合理，加入了requirejs插件。由于requirejs插件本身可以完成合并和压缩功能，所以我们可以去掉一些不必要的插件。经过重构，最终的配置如下：

    module.exports = function (grunt) {

      // Project configuration.
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
          css: ['css/*.css']
        },
        jshint: {
          options: {
            curly: true,
            eqeqeq: true,
            eqnull: true,
            browser: true,
            globals: {
              jQuery: true
            },
          },
          files: {
            //定义要检查的文件
            src: ['gruntfile.js', 'src/**/*.js']
          },
        },
        sass: {
          dist: {
            options: {
              style: 'expanded'
            },
            files: {
              'css/clock.css':'sass/clock.scss'
            }
          }
        },
        watch: {
          sass: {
            files: ['sass/**.scss'],
            tasks: ['sass'],
          },
          js : {
            files: ['src/**/*.js'],
            tasks: ['jshint'],
          },
        },
        requirejs: {
          compile: {
            options: {
              baseUrl: './',
              mainConfigFile: 'config.js',
              name: 'config', /* assumes a production build using almond, if you don't use almond, you
                                    need to set the "includes" or "modules" option instead of name */
              include: ['main.js'],
              optimize: 'uglify',
              out: 'all.min.js'
            }
          }
        }
      });

      // 加载包含的插件。
      grunt.loadNpmTasks('grunt-contrib-clean');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-sass');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-requirejs');

      // 默认被执行的任务列表。
      grunt.registerTask('default', ['clean', 'jshint', 'sass','requirejs']);

    };

作者：timgao

license：ISC