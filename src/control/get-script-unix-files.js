var FilePreloader = require('file-preloader');
var lodash = require('lodash');
var path = require('path');

function execute(config, callback) {
    iterateServiceScriptsfileCreation(config, callback);
}

function preloadUnixScripts(templateFile, servicePath, parameters, callback) {
    var filePreloader = new FilePreloader();
    filePreloader.setTemplateFile(templateFile);
    filePreloader.setLocationPath(servicePath);
    filePreloader.putText('#DOMAIN_SERVICE', lodash.get(parameters, '#DOMAIN_SERVICE'));
    filePreloader.putText('#DOMAIN_DB', lodash.get(parameters, '#DOMAIN_DB'));
    filePreloader.putText('#DBPATH', lodash.get(parameters, '#DBPATH'));
    filePreloader.putText('#LOGPATH', lodash.get(parameters, '#LOGPATH'));
    filePreloader.putText('#IMAGE_DB_TAG', lodash.get(parameters, '#IMAGE_DB_TAG'));
    filePreloader.putText('#IMAGE_SERVICE_TAG', lodash.get(parameters, '#IMAGE_SERVICE_TAG'));
    filePreloader.readTemplate(function (err) {
        console.log('unix', err);
        callback({
            message: 'Error preloading unix scripts from template ' + templateFile
        });
    }, function () {
        callback(undefined);
    });
}

function iterateServiceScriptsfileCreation(config, callback, index) {
    if (!index) {
        index = 0;
    }
    var services = config.containers.services;

    if (index < services.length) {
        var service = services[index];
        var servicePath = path.join(config.path, service.name);
        preloadUnixScripts(config.containers.templates.scripts.unixScriptsTemplateFile, servicePath, service.parameters, function (errPreloaderServiceScriptsFile) {
            if (errPreloaderServiceScriptsFile) {
                callback({
                    message: 'Error loading unix scripts for service ' + service.name
                });
            } else {
                index++;
                iterateServiceScriptsfileCreation(config, callback, index);
            }
        });
    } else {
        callback();
    }
}

module.exports = execute;