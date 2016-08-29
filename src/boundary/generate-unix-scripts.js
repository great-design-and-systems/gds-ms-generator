var GetScriptUnixFiles = require('../control/get-script-unix-files');
var CreateStartAllUnixScript = require('../control/scripts/unix/create-start-all-scripts');
var CreateStopAllUnixScript = require('../control/scripts/unix/create-stop-all-scripts');
var CreateInstallAllUnixScript = require('../control/scripts/unix/create-install-all-scripts');
var CreateUninstallAllUnixScript = require('../control/scripts/unix/create-uninstall-all-scripts');
var CreateRestartAllUnixScript = require('../control/scripts/unix/create-restart-all-scripts');
var CreateUpdateAllUnixScript = require('../control/scripts/unix/create-update-all-scripts');
var CreateStartServiceUnixScript = require('../control/scripts/unix/create-start-service-scripts');
var CreateUpdateUnixScript = require('../control/scripts/unix/create-update-script');
var CreateDebugUnixScript = require('../control/scripts/unix/create-debug-service-script');
module.exports = function(config, callback) {
    new GetScriptUnixFiles(config, function(err) {
        if (!err) {
            new CreateStartAllUnixScript(config, function(err, shCalls) {
                if (!err) {
                    new CreateStopAllUnixScript(config, function(err, shCalls) {
                        if (!err) {
                            new CreateInstallAllUnixScript(config, function(err, shCalls) {
                                if (!err) {
                                    new CreateUninstallAllUnixScript(config, function(err, shCalls) {
                                        if (!err) {
                                            new CreateRestartAllUnixScript(config, function(err, shCalls) {
                                                if (!err) {
                                                    new CreateUpdateAllUnixScript(config, function(err, shCalls) {
                                                        if (!err) {
                                                            new CreateStartServiceUnixScript(config, function(err, shCalls) {
                                                                if (!err) {
                                                                    new CreateUpdateUnixScript(config, function(err, shCalls) {
                                                                        if (!err) {
                                                                            new CreateDebugUnixScript(config, function(err, shCalls) {
                                                                                if (!err) {
                                                                                    callback();
                                                                                } else {
                                                                                    console.error('CreateDebugUnixScript', err);
                                                                                }
                                                                            });
                                                                        } else {
                                                                            console.error('CreateUpdateUnixScript', err);
                                                                        }
                                                                    });
                                                                } else {
                                                                    console.error('CreateStartServiceUnixScript', err);
                                                                    callback(err);
                                                                }
                                                            });
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
};