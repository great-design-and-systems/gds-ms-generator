var jsonFile = require('jsonfile');
var CONFIG_FILE = process.env.GDS_CONFIG_FILE || 'gds-ms-config.json';

function execute(callback) {
    jsonFile.readFile(CONFIG_FILE, function (err, file) {
        if (err) {
            callback({
                message: 'Failed to open file ' + CONFIG_FILE
            });
        } else {
            callback(undefined, file);
        }
    });
}

module.exports = execute;