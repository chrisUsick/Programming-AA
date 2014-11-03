module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
  extend = require('extend');

  var build = {
    buildtex: 'cd build && pandoc --smart -o body.tex ../src/body.md',
    builddocx: 'cd build && pandoc --smart -o body.docx ../src/body.md',
    cpmain: 'cp src/main.tex build/main.tex',
    cpbib: 'cp src/bibliography.bib build/bibliography.bib',

    // http://tex.stackexchange.com/questions/26516/how-to-use-biber/34136#34136
    buildpdf: 'cd build && pdflatex --shell-escape main',
    biber: 'cd build && biber main',
    buildpdf2: 'cd build && pdflatex --shell-escape main',
    buildpdf3: 'cd build && pdflatex --shell-escape main'
  }
  var coms = {
    clean: 'rm -r build'
  }
  extend(coms, build);
  grunt.initConfig({
    exec: coms,
    mkdir: {
      build: {
        options: {
          create: ["build"]
        }
      }
    }
  });

  var buildcoms = [];
  for (var b in build) {
    buildcoms.push("exec:" + b);
  }
  grunt.registerTask('default', ["mkdir:build"].concat(buildcoms));
  grunt.registerTask('clean', ['exec:clean']);
}