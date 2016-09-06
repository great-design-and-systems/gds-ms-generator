var fs = require('node-fs');
var path = require('path');
var async = require('async');
var lodash = require('lodash');

function execute(configFile, callback) {
    setTimeout(function() {
        if (configFile.files) {
            createFiles(configFile.files, callback);
        } else {
            callback({
                message: 'No files created.'
            });
        }
    });
}

function createFiles(files, callback) {
    async.eachSeries(files, function(file, next) {
        console.log('file', file);
    }, function() {
        callback();
    });
}

function createFile(filename, outputPath, shCalls, callback) {
    fs.writeFile(path.join(outputPath, filename), shCalls, callback);
}
module.exports = execute;