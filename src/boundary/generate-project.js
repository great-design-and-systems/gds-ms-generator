var GetGdsMsConfig = require('../control/get-gds-ms-config');
var CreateOutputFolder = require('../control/create-output-folder');
var CreateServiceFolder = require('../control/create-service-folder');
var GetDockerfiles = require('../control/get-docker-files');
var GetScriptUnixFiles = require('../control/get-script-unix-files');
var GetScriptWindowsFiles = require('../control/get-script-windows-files');
var CreateStartAllUnixScript = require('../control/scripts/unix/create-start-all-scripts');
var CreateStartAllWindowsScript = require('../control/scripts/windows/create-start-all-scripts');
var CreateStopAllUnixScript = require('../control/scripts/unix/create-stop-all-scripts');
var CreateStopAllWindowsScript = require('../control/scripts/windows/create-stop-all-scripts');
var CreateInstallAllUnixScript = require('../control/scripts/unix/create-install-all-scripts');
var CreateInstallAllWindowsScript = require('../control/scripts/windows/create-install-all-scripts');
var CreateUninstallAllUnixScript = require('../control/scripts/unix/create-uninstall-all-scripts');
var CreateUninstallAllWindowsScript = require('../control/scripts/windows/create-uninstall-all-scripts');
var CreateRestartAllUnixScript = require('../control/scripts/unix/create-restart-all-scripts');
var CreateRestartAllWindowsScript = require('../control/scripts/windows/create-restart-all-scripts');
var CreateUpdateAllUnixScript = require('../control/scripts/unix/create-update-all-scripts');
var CreateUpdateAllWindowsScript = require('../control/scripts/windows/create-update-all-scripts');
var CreateStartServiceWindowsScript = require('../control/scripts/windows/create-start-service-scripts');

module.exports = function () {
    new GetGdsMsConfig(function (err, config) {
        if (!err) {
            new CreateOutputFolder(config, function (outputFolderErr, outputFolder) {
                if (!outputFolderErr) {
                    new CreateServiceFolder(config, function (err) {
                        if (!err) {
                            new GetDockerfiles(config, function (err) {
                                if (!err) {
                                    createScripts(config, function (err) {
                                        if (!err) {

                                        } else {
                                            console.error('createScripts', err);
                                        }
                                    });
                                } else {
                                    console.error('GetDockerfiles', err);
                                }
                            });
                        }
                        else {
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
        createWindowsScripts(config, callback);
    } else {
        createUnixScripts(config, callback);
    }
}

function createWindowsScripts(config, callback) {
    new GetScriptWindowsFiles(config, function (err) {
        if (!err) {
            new CreateStartAllWindowsScript(config, function (err, batCalls) {
                if (!err) {
                    new CreateStopAllWindowsScript(config, function (err, batCalls) {
                        if (!err) {
                            new CreateInstallAllWindowsScript(config, function (err, batCalls) {
                                if (!err) {
                                    new CreateUninstallAllWindowsScript(config, function (err, batCalls) {
                                        if (!err) {
                                            new CreateRestartAllWindowsScript(config, function (err, batCalls) {
                                                if (!err) {
                                                    new CreateUpdateAllWindowsScript(config, function (err, batCalls) {
                                                        if (!err) {
                                                            new CreateStartServiceWindowsScript(config, function (err, batCalls) {
                                                                if (!err) {
                                                                    callback();
                                                                } else {
                                                                    console.error('CreateStartServiceWindowsScript', err);
                                                                    callback(err);
                                                                }
                                                            });
                                                        } else {
                                                            console.error('CreateUpdateAllWindowsScript', err);
                                                            callback(err);
                                                        }
                                                    });
                                                } else {
                                                    console.error('CreateRestartAllWindowsScript', err);
                                                    callback(err);
                                                }
                                            });
                                        } else {
                                            console.error('CreateUninstallAllWindowsScript', err);
                                            callback(err);
                                        }
                                    });
                                } else {
                                    console.error('CreateInstallAllWindowsScript', err);
                                    callback(err);
                                }
                            });
                        } else {
                            console.error('CreateStopAllWindowsScript', err);
                            callback(err);
                        }
                    });
                } else {
                    console.error('CreateStartAllWindowsScript', batCalls);
                    callback(err);
                }
            });
        }
        else {
            console.error('GetScriptWindowsFiles', err);
            callback(err);
        }
    });
}

function createUnixScripts(config, callback) {
    new GetScriptUnixFiles(config, function (err) {
        if (!err) {
            new CreateStartAllUnixScript(config, function (err, shCalls) {
                if (!err) {
                    new CreateStopAllUnixScript(config, function (err, shCalls) {
                        if (!err) {
                            new CreateInstallAllUnixScript(config, function (err, shCalls) {
                                if (!err) {
                                    new CreateUninstallAllUnixScript(config, function (err, shCalls) {
                                        if (!err) {
                                            new CreateRestartAllUnixScript(config, function (err, shCalls) {
                                                if (!err) {
                                                    new CreateUpdateAllUnixScript(config, function (err, shCalls) {
                                                        if (!err) {
                                                            callback();
                                                        } else {
                                                            console.error('CreateUpdateAllUnixScript', err);
                                                            callback(err);
                                                        }
                                                    });
                                                } else {
                                                    console.error('CreateRestartAllUnixScript', err);
                                                    callback(err);
                                                }
                                            });
                                        } else {
                                            console.error('CreateUninstallAllUnixScript', err);
                                            callback(err);
                                        }
                                    });
                                } else {
                                    console.error('CreateInstallAllUnixScript', err);
                                    callback(err);
                                }
                            });
                        } else {
                            console.error('CreateStopAllUnixScript', err);
                            callback(err);
                        }
                    });
                } else {
                    console.error('CreateStartAllUnixScript', err);
                    callback(err);
                }
            });
        } else {
            console.error('GetScriptUnixFiles', err);
            callback(err);
        }
    });
}

function isWindows() {
    return /^win/.test(process.platform);
}