var fs = require('node-fs');
var path = require('path');
var lodash = require('lodash');

function execute(configFile, callback) {
    setTimeout(function() {
        if (configFile.files) {
            createFiles(configFile.files, lodash.keys(configFile.files), callback);
        } else {
            callback({
                message: 'No files created.'
            });
        }
    });
}

function createFiles(files, filenames, callback, index) {
    if (!index) {
        index = 0;
    }
    processFile(filenames[index], lodash.get(files, filenames[index]), function(err){
        if(!err){
            index++;
            if(index < filenames.length){
                createFiles(files, filenames, callback, index);
            }else {
                callback();
            }
        }else {
            callback(err);
        }
    });
}

function processFile(filename, contents, callback) {
    var fileContent = '';
    contents.forEach(function(content){
        fileContent += content;
        fileContent += '\n';
    });
    createFile(filename,fileContent, callback);
}   

function createFile(filename, fileContent, callback) {
    fs.writeFile(filename, fileContent, callback);
}

module.exports = execute;