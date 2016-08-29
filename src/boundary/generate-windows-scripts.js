var GetScriptWindowsFiles = require('../control/get-script-windows-files');
var CreateStartAllWindowsScript = require('../control/scripts/windows/create-start-all-scripts');
var CreateStopAllWindowsScript = require('../control/scripts/windows/create-stop-all-scripts');
var CreateInstallAllWindowsScript = require('../control/scripts/windows/create-install-all-scripts');
var CreateUninstallAllWindowsScript = require('../control/scripts/windows/create-uninstall-all-scripts');
var CreateRestartAllWindowsScript = require('../control/scripts/windows/create-restart-all-scripts');
var CreateUpdateAllWindowsScript = require('../control/scripts/windows/create-update-all-scripts');
var CreateStartServiceWindowsScript = require('../control/scripts/windows/create-start-service-scripts');
var CreateUpdateWindowsScript = require('../control/scripts/windows/create-update-script');
var CreateDebugWindowsScripts = require('../control/scripts/windows/create-debug-service-script');
module.exports = function(config, callback) {
    new GetScriptWindowsFiles(config, function(err) {
        if (!err) {
            new CreateStartAllWindowsScript(config, function(err, batCalls) {
                if (!err) {
                    new CreateStopAllWindowsScript(config, function(err, batCalls) {
                        if (!err) {
                            new CreateInstallAllWindowsScript(config, function(err, batCalls) {
                                if (!err) {
                                    new CreateUninstallAllWindowsScript(config, function(err, batCalls) {
                                        if (!err) {
                                            new CreateRestartAllWindowsScript(config, function(err, batCalls) {
                                                if (!err) {
                                                    new CreateUpdateAllWindowsScript(config, function(err, batCalls) {
                                                        if (!err) {
                                                            new CreateStartServiceWindowsScript(config, function(err, batCalls) {
                                                                if (!err) {
                                                                    new CreateUpdateWindowsScript(config, function(err, batCalls) {
                                                                        if (!err) {
                                                                            new CreateDebugWindowsScripts(config, function(err, batCalls) {
                                                                                if (!err) {
                                                                                    callback();
                                                                                } else {
                                                                                    console.error('CreateDebugWindowsScripts', err);
                                                                                }
                                                                            });
                                                                        } else {
                                                                            console.error('CreateUpdateWindowsScript', err);
                                                                        }
                                                                    });
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
        } else {
            console.error('GetScriptWindowsFiles', err);
            callback(err);
        }
    });
};