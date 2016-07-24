var fs = require('node-fs');
var IterateService = require('../../common/iterate-services');
var path = require('path');
var lodash = require('lodash');

function execute(config, callback) {
    new IterateService(config.containers.services,
        function (service, done) {
            var shCalls = '';
            var servicePath = path.join(config.path, service.name, 'unix');
            shCalls += 'docker run -d ';
            shCalls += '-v ' + lodash.get(service.parameters, '#LOGPATH') + ':/app/log ';
            shCalls += '--name=' + lodash.get(service.parameters, '#DOMAIN_SERVICE') + ' ';
            if (lodash.get(service.parameters, '#DOMAIN_DB')) {
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
            shCalls += lodash.get(service.parameters, '#DOMAIN_SERVICE') + ':' + lodash.get(service.parameters, '#IMAGE_SERVICE_TAG');

            createFile(servicePath, shCalls, function (err) {
                if (err) {
                    callback({
                        message: 'Failed to create start-service.sh for service ' + service.name
                    })
                } else {
                    done();
                }
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
}
function createFile(outputPath, shCalls, callback) {
    fs.writeFile(path.join(outputPath, 'start-service.sh'), shCalls, callback);
}

module.exports = execute;