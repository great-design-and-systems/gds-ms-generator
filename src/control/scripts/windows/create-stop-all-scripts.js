var fs = require('node-fs');
var IterateService = require('../../common/iterate-services');
var path = require('path');

function execute(config, callback) {
    var shCalls = '';
    new IterateService(config.containers.services,
        function (service, done) {
            var servicePath = path.join(config.path, service.name, 'windows');
            shCalls += 'cd ' + servicePath + '\n';
            shCalls += 'call stop.bat\n';
            shCalls += 'cd ' + config.path + '\n';
            done();
        }, function (err) {
            if (err) {
                callback({
                    message: 'Failed to create stop-all scripts'
                });
            } else {
                createFile(config.path, shCalls, callback);
            }
        });
}
function createFile(outputPath, shCalls, callback) {
    fs.writeFile(path.join(outputPath, 'stop.bat'), shCalls, callback);
}
module.exports = execute;