var lodash = require('lodash');

function execute(configFile, callback) {
    setTimeout(function() {
        if (configFile.properties) {
            var stringifiedJSON = JSON.stringify(configFile);
            lodash.forEach(configFile.properties, function(value, key) {
                var regex = new RegExp('\\${' + key + '}', 'g');
                lodash.forEach(configFile.properties, function(fieldValue, field) {
                    if (key !== field) {
                        value = value.replace(new RegExp('\\${' + field + '}', 'g'), fieldValue);
                    }
                });
                stringifiedJSON = stringifiedJSON.replace(regex, value);
            });
            callback(undefined, JSON.parse(stringifiedJSON));
        } else {
            callback({
                message: 'No properties found'
            });
        }
    });
}

module.exports = execute;