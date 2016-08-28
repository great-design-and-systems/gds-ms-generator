var GetConfigOptions = require('../common/get-config-options');
function execute(baseCMDString, files, callback) {
    setTimeout(function () {
        addServiceFile(baseCMDString, files, callback);
    });
}
function addServiceFile(baseCMDString, files, callback) {
    new GetConfigOptions(files, function (err, options) {
        try {
            if (!err) {
                var addedFile = baseCMDString;
                options.forEach(function (value) {
                  
                });
                callback(undefined, addedFile);
            } else {
                callback(err);
            }
        } catch (err) {
            console.error('add-service-file', err);
            callback(err);
        }
    });
}
module.exports = execute;
