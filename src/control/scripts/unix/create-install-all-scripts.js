var fs = require('node-fs');
var IterateService = require('../../common/iterate-services');
var path = require('path');

function execute(config, callback) {
    var shCalls = '';
    new IterateService(config.containers.services,
        function (service, done) {
            var servicePath = path.join(service.name, 'unix');
            shCalls += 'cd ' + servicePath + '\n';
            shCalls += 'sh install.sh\n';
            shCalls += 'cd ' + service.outputPath;
            done();
        }, function (err) {
            if (err) {
                callback({
                    message: 'Failed to create install-all scripts'
                });
            } else {
                createFile(config.path, shCalls, callback);
            }
        });
}
function createFile(outputPath, shCalls, callback) {
    fs.writeFile(path.join(outputPath, 'install.sh'), shCalls, callback);
}
module.exports = execute;