var fs = require('node-fs');
var lodash = require('lodash');
var path = require('path');
var dockerServiceDir = process.env.DOCKER_SERVICE_DIR || 'templates/dockerfiles/';

function execute(config, callback) {
    createServiceDocker(config, callback);
}

function createServiceDocker(config, callback) {
    if (config.containers.serviceDocker) {
        var dockerFile = [];
        var index = 0;
        lodash.forEach(config.containers.serviceDocker, function (value, key) {
            if (key.match(/.*\[\d\]/g)) {
                var index = key.match(/\[\d\]/g)[0].substring(1, 2);
                var subL = key.indexOf('[');
                var ik = key.substring(0, subL);
                dockerFile.push({
                    index: index,
                    key: ik,
                    data: value
                });
            } else {
                dockerFile.push({
                    key: key,
                    data: value
                });
            }
            index++;
        });
        callback(undefined, dockerFile);
    } else {
        callback({
            message: 'No serviceDocker defined'
        });
    }
}

function createFile(outputPath, content, callback) {
    fs.writeFile(path.join(outputPath, 'Dockerfile'), content, callback);
}

module.exports = execute;