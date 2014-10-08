'use strict';

var child;
var exec = require('child_process').exec;

exports.isDirectoryUnderGitControl = function (dir, cb, lastDirectory) {
  try {
    child = exec('git rev-parse --is-inside-work-tree', { cwd: dir },
      function (error, stdout, stderr) {
        if (stdout.length > 0) {
          cb(true, dir, lastDirectory);
        } else if (stderr.match(/^fatal\: Not a git repository/)) {
          cb(false, dir, lastDirectory);
        } else {
          cb('unknown', dir, lastDirectory);
        }
      }
    );
  } catch (err) {
    console.log('chdir: ' + err);
  }
};