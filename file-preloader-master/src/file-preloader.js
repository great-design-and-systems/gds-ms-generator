(function () {
    var fs = require('fs');
    var jsonFile = require('jsonfile');
    var lodash = require('lodash');
    var replacestream = require("replacestream");
    var path = require('path');

    var FilePreloader = function () {
        var filePreloader = this;
        filePreloader.textMap = [];
        return filePreloader;
    };

    FilePreloader.prototype.setTemplateFile = function (templateFile) {
        this.templateFile = templateFile;
    };

    FilePreloader.prototype.getTemplateFile = function () {
        return this.templateFile;
    };

    FilePreloader.prototype.setLocationPath = function (locationPath) {
        this.locationPath = locationPath;
    };

    FilePreloader.prototype.getLocationPath = function () {
        return this.locationPath;
    };

    FilePreloader.prototype.readTemplate = function (error, done) {
        var filePreloader = this;
        if (filePreloader.templateFile) {
            jsonFile.readFile(filePreloader.templateFile, function (err, data) {
                if (err) {
                    if (error) {
                        error(err);
                    }
                }
                var keys = lodash.keys(data);
                createFilesFromTemplate(error, keys, data, filePreloader.locationPath, filePreloader.textMap, done);
            });
        }
    };

    FilePreloader.prototype.putText = function (key, value) {
        lodash.set(this.textMap, key, value);
    };

    FilePreloader.prototype.getText = function (key) {
        return lodash.get(this.textMap, key);
    };

    function createFilesFromTemplate(error, keys, templateData, locationPath, textMap, done, index) {
        if (!index) {
            index = 0
        }
        ;
        if (index < keys.length) {
            var key = keys[index];
            var sourceFileLocation = lodash.get(templateData, key);
            index++;
            copyToDest(error, key, sourceFileLocation, locationPath, textMap, function () {
                createFilesFromTemplate(error, keys, templateData, locationPath, textMap, done, index);
            });
        } else {
            done();
        }
    }

    function copyToDest(error, key, source, dest, textMap, done) {
        var dest = path.join(dest, key);
        var writable = fs.createWriteStream(dest);
        var readStream = fs.createReadStream(source);
        var replaceFn = function (match) {
            return textMap[match];
        };
        readStream.pipe(replacestream(getKeyRegex(textMap), replaceFn)).pipe(writable);
        readStream.on('error', error);
        writable.on('error', error);
        writable.on('finish', function () {
            writable.close();
            done();
        });
        readStream.on('end', function () {
            readStream.close();
        });
    }

    function getKeyRegex(textMap) {
        var textMapKeys = lodash.keys(textMap);
        var regex = new RegExp(textMapKeys.join('|'), 'g');
        return regex;
    }

    module.exports = FilePreloader;

})();
