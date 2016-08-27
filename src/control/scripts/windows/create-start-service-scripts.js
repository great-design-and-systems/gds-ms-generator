var fs = require('node-fs');
var IterateService = require('../../common/iterate-services');
var path = require('path');
var lodash = require('lodash');
var AddServiceEnv = require('../add-service-env');
var AddServiceMount = require('../add-service-mount');
var async = require('async');
function execute(config, callback) {
    setTimeout(function () {
        new IterateService(config.containers.services,
            function (service, done) {
                var shCalls = '';
                var servicePath = path.join(config.path, service.name, 'windows');
                shCalls += 'docker run -d ';
                shCalls += '--name=' + lodash.get(service.parameters, '#DOMAIN_SERVICE') + ' ';
                if (lodash.get(service.parameters, '#DOMAIN_DB') && (!service.database || !!service.database)) {
                    shCalls += '--link=' + lodash.get(service.parameters, '#DOMAIN_DB') + ':' + lodash.get(service.parameters, '#DOMAIN_DB') + ' ';
                }
                var links = service.links;
                if (links && links.length) {
                    var link = '';
                    for (var li = 0; li < links.length; li++) {
                        shCalls += '--link=' + links[li] + ':' + links[li] + ' ';
                    }

                }
                if (service.port) {
                    shCalls += '-p ' + service.port + ' ';
                }

                async.eachSeries([
                    {
                        name: 'AddServiceEnv',
                        execute: AddServiceEnv
                    },
                    {
                        name: 'AddServiceMount',
                        execute: AddServiceMount
                    }
                ],
                    function (asyncFunc, callback) {
                        if (service.mounts && asyncFunc.name === 'AddServiceMount') {
                            new asyncFunc.execute(shCalls, service.mounts, function (err, shCallsEnv) {
                                if (!err) {
                                    shCalls = shCallsEnv;
                                    callback();
                                } else {
                                    callback(err);
                                }
                            });
                        } else if (service.environments && asyncFunc.name === 'AddServiceEnv') {
                            new asyncFunc.execute(shCalls, service.environments, function (err, shCallsEnv) {
                                if (!err) {
                                    shCalls = shCallsEnv;
                                    callback();
                                } else {
                                    callback(err);
                                }
                            });
                        } else {
                            callback();
                        }
                    }, function () {
                        shCalls += lodash.get(service.parameters, '#DOMAIN_SERVICE') + ':' + lodash.get(service.parameters, '#IMAGE_SERVICE_TAG');
                        createFile(servicePath, shCalls, function (err) {
                            if (err) {
                                callback({
                                    message: 'Failed to create start-service.bat for service ' + service.name
                                })
                            } else {
                                done();
                            }
                        });
                    });
            }, function (err) {
                if (err) {
                    callback({
                        message: 'Failed to create start scripts'
                    });
                } else {
                    callback();
                }
            });
    });
}
function createFile(outputPath, shCalls, callback) {
    fs.writeFile(path.join(outputPath, 'start-service.bat'), shCalls, callback);
}

module.exports = execute;