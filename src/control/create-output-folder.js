var fs = require('node-fs');

function execute(gdsMsConfig, callback) {
    fs.exists(gdsMsConfig.path, function (exist) {
        if (!exist) {
            fs.mkdir(gdsMsConfig.path, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, {
                        created: true
                    });
                }
            });
        } else {
            callback(undefined, {
                created: false
            });
        }
    });
}

module.exports = execute;