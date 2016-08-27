var GetConfigOptions = require('../common/get-config-options');
function execute(baseCMDString, environment, callback) {
    setTimeout(function () {
        addServiceEnv(baseCMDString, environment, callback);
    });
}
function addServiceEnv(baseCMDString, environment, callback) {
    new GetConfigOptions(environment, function (err, options) {
        try {
            if (!err) {
                var addedEnv = baseCMDString;
                options.forEach(function (value) {
                    addedEnv += '-e \"' + value.key + '=' + value.data + '\"\t';
                });
                callback(undefined, addedEnv);
            } else {
                callback(err);
            }
        } catch (err) {
            console.error('add-service-env', err);
            callback(err);
        }
    });
}
module.exports = execute;
