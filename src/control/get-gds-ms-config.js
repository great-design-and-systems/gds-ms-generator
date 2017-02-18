var jsonFile = require('jsonfile');
var CONFIG_FILE = process.env.GDS_CONFIG_FILE || 'gds-ms-config.json';
var SetGdsMsConfigProperties = require('./set-gds-ms-config-properties');

function execute(callback) {
    jsonFile.readFile(CONFIG_FILE, function(err, file) {
        if (err) {
            console.log(err);
            callback({
                message: 'Failed to open file ' + CONFIG_FILE
            });
        } else {
            new SetGdsMsConfigProperties(file, function(err, parsedConfig) {
                if (err) {
                    callback(undefined, file);
                } else {
                    callback(undefined, parsedConfig);
                }
            });
        }
    });
}

module.exports = execute;