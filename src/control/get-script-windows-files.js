var FilePreloader = require('file-preloader');
var lodash = require('lodash');
var path = require('path');

function execute(config, callback) {
    iterateServiceScriptsfileCreation(config, callback);
}

function preloadWindowsScripts(templateFile, servicePath, parameters, callback) {
    var filePreloader = new FilePreloader();
    filePreloader.setTemplateFile(templateFile);
    filePreloader.setLocationPath(servicePath);
    filePreloader.putText('#DOMAIN_SERVICE', lodash.get(parameters, '#DOMAIN_SERVICE'));
    filePreloader.putText('#DOMAIN_DB', lodash.get(parameters, '#DOMAIN_DB'));
    filePreloader.putText('#DBPATH', lodash.get(parameters, '#DBPATH'));
    filePreloader.putText('#LOGPATH', lodash.get(parameters, '#LOGPATH'));
    filePreloader.readTemplate(function (err) {
        console.log('Windows', err);
        callback({
            message: 'Error preloading Windows scripts from template ' + templateFile
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
        preloadWindowsScripts(config.containers.templates.scripts.windowScriptsTemplateFile, servicePath, service.parameters, function (errPreloaderServiceScriptsFile) {
            if (errPreloaderServiceScriptsFile) {
                callback({
                    message: 'Error loading Windows scripts for service ' + service.name
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