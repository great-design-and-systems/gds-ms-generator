var fs = require('node-fs');
var lodash = require('lodash');
var path = require('path');

function iterateServiceFolderCreation(outputFolder, services, callback, index) {
    if (!index) {
        index = 0;
    }
    if (index < services.length) {
        var service = services[index];
        createServiceFolder(outputFolder, service, function (errorCreation) {
            if (errorCreation) {
                callback(errorCreation);
            } else {
                index++;
                iterateServiceFolderCreation(outputFolder, services, callback, index);
            }
        });
    } else {
        callback();
    }
}

function createServiceFolder(outputFolder, service, callback) {
    var servicePath = path.join(outputFolder, service.name);
    var servicePathWin = path.join(servicePath, 'windows');
    var servicePathUnix = path.join(servicePath, 'unix');
    var servicePathDB = path.join(servicePath, 'db');
    
    createFolder(servicePath, 'failed to create service folder ' + service.name, function (errService) {
        if (!errService) {
            createFolder(servicePathDB, 'failed to create db folder for service ' + service.name, function (errDB) {
                if (errDB) {
                    callback(errDB);
                } else {
                    createFolder(servicePathWin, 'failed to create windows folder for service ' + service.name, function (errWin) {
                        if (errWin) {
                            callback(errWin);
                        } else {
                            createFolder(servicePathUnix, 'failed to create unix folder for service ' + service.name, function (errWin) {
                                if (errWin) {
                                    callback(errWin);
                                } else {
                                    callback(undefined);
                                }
                            });
                        }
                    });
                }
            });
        } else {
            callback(errService);
        }
    });

}

function createFolder(path, message, callback) {
    fs.exists(path, function (exist) {
        if (!exist) {
            fs.mkdir(path, function (errFolder) {
                if (errFolder) {
                    callback({
                        message: message
                    });
                } else {
                    callback(undefined, {
                        created: true
                    });
                }
            });
        } else {
            callback(undefined, {
                created: false
            });
        }
    });

}

function execute(gdsMsConfig, callback) {
    iterateServiceFolderCreation(gdsMsConfig.path, gdsMsConfig.containers.services, callback);
}

module.exports = execute;