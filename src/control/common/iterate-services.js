var lodash = require('lodash');

function execute(services, action, callback) {
    iterate(services, action, callback);
}

function iterate(services, action, callback, index) {
    if (index === undefined) {
        index = 0;
    }
    services = lodash.orderBy(services, ['priority'], ['desc']);
    if (index < services.length) {
        var service = services[index];
        action(service, function () {
            index++;
            iterate(services, action, callback, index);
        });
    } else {
        callback();
    }
}

module.exports = execute;