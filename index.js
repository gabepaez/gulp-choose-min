var through = require('through2'),
    stripBom = require('strip-bom'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path');

function gulpChooseMin(options) {
  options = options || {};

  if(!options.suffix) options.suffix = '.min';

  return through.obj( function (file, enc, done) {
    var ext = options.ext || path.extname(file.path);
        name = path.basename( file.path, path.extname(file.path) ),
        minPath = path.join( path.dirname(file.path), name + options.suffix + ext );

    if( !endsWith(file.path, options.suffix+ext) && fs.existsSync(minPath) ){
      file =  new gutil.File({
        cwd: file.cwd,
        base: file.base,
        path: minPath,
        contents: new Buffer( stripBom(fs.readFileSync(minPath)) )
      });
    }
    
    this.push(file);
    done();
  });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = gulpChooseMin;
