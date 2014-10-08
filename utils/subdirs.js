'update strict';

var fs = require('fs');

exports.dirs = [];

exports.getSubDirs = function (basedir, cb) {
  fs.readdir(basedir, function (err, files) {
    var dirs = [];

    files.forEach(function (file, idx) {
      fs.stat(basedir + file, function (err, stats) {
        if (stats.isDirectory()) {
          dirs.push(basedir + files[idx]);
        }

        if ((idx + 1) === files.length) {
          exports.dirs = dirs;
          cb(dirs); 
        }
      });
    });
  });
};