var chai = require('chai');
var expect = chai.expect;
var FilePreloader = require('../src/file-preloader');

 describe('File preloader specifications', function () {
   
   it('should put text to textMap', function () {
   	 var filePreloader = new FilePreloader();
   	 filePreloader.putText('one','Sample');
   	 expect(filePreloader.getText('one')).to.equal('Sample');
   });

   it('should set template file', function () {
     expect(FilePreloader).to.not.be.undefined;
     var filePreloader = new FilePreloader();
     filePreloader.setTemplateFile('templateFile.json');
     expect(filePreloader.getTemplateFile()).to.be.defined;
     expect(filePreloader.getTemplateFile()).to.equal('templateFile.json');
   });

   it('should set location directory', function () {
     expect(FilePreloader).to.not.be.undefined;
     var filePreloader = new FilePreloader();
     filePreloader.setLocationPath('//somewhere');
     expect(filePreloader.getLocationPath()).to.be.defined;
     expect(filePreloader.getLocationPath()).to.equal('//somewhere');
   });

   it('should throw when templateFile does not exists', function () {
   	  var filePreloader = new FilePreloader();
   	  filePreloader.setTemplateFile('test/templates-file.json');
   	  expect(filePreloader.readTemplate(function(error){
   	  	expect(error).to.be.defined;
   	  	done();
   	  })).to.throw;
   });

   it('should read the templateFile', function () {
      var filePreloader = new FilePreloader();
      filePreloader.setTemplateFile('sample-files/template-file.json');
      filePreloader.setLocationPath('sample-files/dest');
      filePreloader.putText('#NAME','hello-project');
      filePreloader.putText('#DESCRIPTION','hello-description');
      filePreloader.putText('#VERSION','0.1.0');
      var read = filePreloader.readTemplate(
        function(err){
          console.log(err);
        }, 
        function() {
          console.log('done');
        });
      expect(read).to.not.throw;
   });
 });
