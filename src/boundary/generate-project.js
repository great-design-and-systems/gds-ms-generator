var GetGdsMsConfig = require('../control/get-gds-ms-config');
var CreateOutputFolder = require('../control/create-output-folder');
var CreateServiceFolder = require('../control/create-service-folder');
var GetDockerfiles = require('../control/get-docker-files');
var CreateServiceDocker = require('../control/create-service-docker');
var GenerateUnixScripts = require('./generate-unix-scripts');
var GenerateWindowsScripts = require('./generate-windows-scripts');

module.exports = function() {
    new GetGdsMsConfig(function(err, config) {
        if (!err) {
            new CreateOutputFolder(config, function(outputFolderErr, outputFolder) {
                if (!outputFolderErr) {
                    new CreateServiceFolder(config, function(err) {
                        if (!err) {
                            new CreateServiceDocker(config, function(err, serviceDocker) {
                                if (!err) {
                                    new GetDockerfiles(config, serviceDocker, function(err) {
                                        if (!err) {
                                            createScripts(config, function(err) {
                                                if (!err) {
                                                    console.log('done');
                                                } else {
                                                    console.error('createScripts', err);
                                                }
                                            });
                                        } else {
                                            console.error('GetDockerfiles', err);
                                        }
                                    });
                                } else {
                                    console.error('CreateDockerFiles', err);
                                }
                            });
                        } else {
                            console.error('CreateServiceFolder', err);
                        }
                    });
                } else {
                    console.error('CreateOutputFolder', outputFolderErr);
                }
            });
        } else {
            console.error('GetGdsMsConfig', err);
        }
    });
};

function createScripts(config, callback) {
    if (isWindows()) {
        new GenerateWindowsScripts(config, callback);
    } else {
        new GenerateUnixScripts(config, callback);
    }
}

function isWindows() {
    return /^win/.test(process.platform);
}