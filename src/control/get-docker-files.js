var FilePreloader = require('file-preloader');
var lodash = require('lodash');
var path = require('path');
var CreateServiceDockerFile = require('./create-service-docker-file');
function execute(config, serviceDocker, callback) {
    iterateServiceDockerfileCreation(config, serviceDocker, callback);
}

function preloadServiceDockerfile(templateFile, serviceDocker, servicePath, parameters, callback) {
    var filePreloader = new FilePreloader();
    filePreloader.setTemplateFile(templateFile);
    filePreloader.setLocationPath(servicePath);
    filePreloader.putText('#REPO', lodash.get(parameters, '#REPO'));
    filePreloader.putText('#DOMAIN_DB', lodash.get(parameters, '#DOMAIN_DB'));
    filePreloader.putText('#MAINTAINER', lodash.get(parameters, '#MAINTAINER'));
    filePreloader.putText('#IMAGE_DB_TAG', lodash.get(parameters, '#IMAGE_DB_TAG'));
    filePreloader.putText('#IMAGE_SERVICE_TAG', lodash.get(parameters, '#IMAGE_SERVICE_TAG'));
    filePreloader.readTemplate(function (err) {
        console.log('readTemplate', err);
        callback({
            message: 'Error preloading dockerfiles from template ' + templateFile
        });
    }, function () {
        new CreateServiceDockerFile(serviceDocker, parameters, servicePath, callback);
    });
}

function iterateServiceDockerfileCreation(config, serviceDocker, callback, index) {
    if (!index) {
        index = 0;
    }
    var services = config.containers.services;

    if (index < services.length) {
        var service = services[index];
        var servicePath = path.join(config.path, service.name);
        preloadServiceDockerfile(config.containers.templates.dockerTemplateFile, serviceDocker, servicePath, service.parameters, function (errPreloaderServiceDockerfile) {
            if (errPreloaderServiceDockerfile) {
                callback({
                    message: 'Error loading dockerfile for service ' + service.name
                });
            } else {
                index++;
                iterateServiceDockerfileCreation(config, serviceDocker, callback, index);
            }
        });
    } else {
        callback();
    }
}

module.exports = execute;
