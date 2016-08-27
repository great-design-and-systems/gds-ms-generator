var lodash = require('lodash');

function execute(options, callback) {
    setTimeout(function () {
        createOptions(options, callback);
    });
}

function createOptions(options, callback) {
    try {
        var dockerFile = [];
        var index = 0;
        lodash.forEach(options, function (value, key) {
            if (key.match(/.*\[\d\]/g)) {
                var index = key.match(/\[\d\]/g)[0].substring(1, 2);
                var subL = key.indexOf('[');
                var ik = key.substring(0, subL);
                dockerFile.push({
                    index: index,
                    key: ik,
                    data: value
                });
            } else {
                dockerFile.push({
                    key: key,
                    data: value
                });
            }
            index++;
        });
        callback(undefined, dockerFile);
    } catch (err) {
        console.error('get-config-options', err);
        callback(err);
    }

}

module.exports = execute;