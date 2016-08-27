'use strict';
var fs = require('node-fs');
var lodash = require('lodash');
var path = require('path');
module.exports = function (serviceDocker, parameters, servicePath, callback) {
    var toWrite = '';
    lodash.forEach(serviceDocker, function (value) {
        toWrite += value.key;
        toWrite += ' ';
        toWrite += value.data;
        toWrite += '\n';
    });
    lodash.forEach(parameters, function (value, key) {
        toWrite = toWrite.replace(new RegExp(key, 'g'), value);
    });
    createFile(servicePath, toWrite, callback);
}
function createFile(outputPath, output, callback) {
    fs.writeFile(path.join(outputPath, 'Dockerfile'), output, callback);
}
