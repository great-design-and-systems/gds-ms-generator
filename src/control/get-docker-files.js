var FilePreloader = require('file-preloader');
var lodash = require('lodash');
var path = require('path');

function execute(config, callback) {
    iterateServiceDockerfileCreation(config, callback);
}

function preloadServiceDockerfile(templateFile, servicePath, parameters, callback) {
    var filePreloader = new FilePreloader();
    filePreloader.setTemplateFile(templateFile);
    filePreloader.setLocationPath(servicePath);
    filePreloader.putText('#REPO', lodash.get(parameters, '#REPO'));
    filePreloader.putText('#DOMAIN_DB', lodash.get(parameters, '#DOMAIN_DB'));
    filePreloader.putText('#MAINTAINER', lodash.get(parameters, '#MAINTAINER'));
    filePreloader.readTemplate(function (err) {
        console.log('readTemplate', err);
        callback({
            message: 'Error preloading dockerfiles from template ' + templateFile
        });
    }, function () {
        callback(undefined);
    });
}

function iterateServiceDockerfileCreation(config, callback, index) {
    if (!index) {
        index = 0;
    }
    var services = config.containers.services;

    if (index < services.length) {
        var service = services[index];
        var servicePath = path.join(config.path, service.name);
        preloadServiceDockerfile(config.containers.templates.dockerTemplateFile, servicePath, service.parameters, function (errPreloaderServiceDockerfile) {
            if (errPreloaderServiceDockerfile) {
                callback({
                    message: 'Error loading dockerfile for service ' + service.name
                });
            } else {
                index++;
                iterateServiceDockerfileCreation(config, callback, index);
            }
        });
    } else {
        callback();
    }
}

module.exports = execute;