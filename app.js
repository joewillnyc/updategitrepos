'update strict';

var fs = require('fs');
var exec = require('child_process').exec;
var dir = require('subdirs');
var gitcheck = require('isGitControlled');
var nodemailer = require('nodemailer');
var basedir = '/Users/joewilly/dev/';
var outputFile = './gitRepoUpdateStatus.txt';

// var transport = nodemailer.createTransport('SMTP', {
//   host: 'smtp.gmail.com',
//   secureConnection: true,
//   port: 465,
//   auth: {
//     user: 'gmail.user@gmail.com',
//     pass: 'userpass'
//   }
// });

/*
* @param gitManaged boolean
* @param dir string
*/
function updateGitRepository (gitManaged, dir, lastDirectory) {
  var child;

  try {
    child = exec('git pull', { cwd: dir },
      function (error, stdout, stderr) {
        var content;

        if (stdout.length > 0) {
          content = 'Local Repo to Update -> ' + dir + '.\nMessage -> ' + stdout + '\n';
          fs.appendFile(outputFile, content, function (err) {
            if (err) { throw err; }
          });
        }
      }
    );

    // child.on('exit', function (code) {});
  } catch (err) {
    console.log('chdir: ' + err);
  }
}

function checkGitStatus (dirs) {
  var lastDirectory = false;
  var numberOfDirectories = dirs.length;

  dirs.forEach(function (dir, idx) {
    if ((idx + 1) === numberOfDirectories) {
      lastDirectory = true;
    }

    gitcheck.isDirectoryUnderGitControl(dir, updateGitRepository, lastDirectory);
  });
}

dir.getSubDirs(basedir, checkGitStatus);