var consoleProxy = require('./index.js');

// consoleProxy.log(function(arg) {
// 	var tempArg = arg.replace(/\s/g, '');
// 	console.log(tempArg);
// },true)
consoleProxy.dev(function() {
	console.log(arguments)
})
consoleProxy.warn([
	function() {
		var args = Array.prototype.slice.call(arguments);
		var sum = 0;
		args.forEach(x => {
			sum = sum+ x;
		})
		console.error(sum);
	},
	function() {
		var args = Array.prototype.slice.call(arguments);
		newArr = args.map(x => {
			return (x % 2 === 0) ? 'even' : 'odd'
		})	
		console.error(newArr)
	}
	
	],false);
consoleProxy.addCustom('jordan',function() {
	console.log(arguments)
},false)
consoleProxy.addCustom('john',function() {
	console.log(arguments)
},false)

module.exports = consoleProxy.console();