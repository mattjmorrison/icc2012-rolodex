/*
	jscoverage must be installed before this will run
*/

require('jasmine-node');
require('jscoverage-reporter');
var exec = require('child_process').exec;
var scriptDir = process.argv[2];
exec("jscoverage " + scriptDir + " " + scriptDir + "-cov", function() {
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.addReporter(new jasmine.JSCoverageReporter('./reports'));	
	require('./node_modules/jasmine-node/lib/jasmine-node/cli.js');
});
