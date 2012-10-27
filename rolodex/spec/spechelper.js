
var jsdom = require('jsdom');
global.document = jsdom.jsdom("<html><head></head><body></body></html>");
global.window = document.createWindow();

require('../vendor/jquery-1.8.2.js')

global.$ = window.$
global.jQuery = global.$;

beforeEach(function () {
	$(document.body).empty();
	$(document).unbind();
	window.location = {reload:function(){}};
});
