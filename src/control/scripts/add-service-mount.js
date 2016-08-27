var GetConfigOptions = require('../common/get-config-options');
function execute(baseCMDString, mounts, callback) {
    setTimeout(function () {
        addServiceMount(baseCMDString, mounts, callback);
    });
}
function addServiceMount(baseCMDString, mounts, callback) {
    new GetConfigOptions(mounts, function (err, options) {
        try {
            if (!err) {
                var addedMount = baseCMDString;
                options.forEach(function (value) {
                    addedMount += '-v ' + value.data + ':' + value.key + '\t';
                });
                callback(undefined, addedMount);
            } else {
                callback(err);
            }
        } catch (err) {
            console.error('add-service-mount', err);
            callback(err);
        }
    });
}
module.exports = execute;
