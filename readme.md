console-extend
===
Description: This module allows you to proxy the console.log,console.warn and console.error methods to add in your own function calls that are executed before the origial console(log|warn|error) (can all set it to not do the origional call at all). Also exposes console.dev as a new method you can use to have a custome console call. If you need more then just one new method you can call addCustom to add any new console method by name. Ex console.test or console.jordan.

Steps:

	1. Include console-extend
	2. Create a constructor file(or do it all in the file you will be logging from)
	3. Call .console() to retireve new console object with proxied methods attached.
	4. Replace origional console with new console returned.

Example:
	
	consoleConstructor.js
	
	var consoleProxy = require('./console-extend');

	consoleProxy.log(function(arg) {
		var tempArg = arg.replace(/\s/g, '');
		console.error(tempArg);
	},false)
	
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

	module.exports = consoleProxy.console();
	
The above overrides console.log to console.error what was passed in without spaces && console.warn will return sum off all numbers that were arguments and an array showing if they started as even or odd.

Example in use:

	test.js
	//replace console object with the new one returned from consoleConstructor
	console = require('./consoleConstructor');
	
	//below should now replace all spaces in string
	console.log('hiiowihefpoqwehif pqowhiefpoqwehifpo qweifh poqwehf')
	
	//below should log out the sum of the numbers and also tell if each number is even or odd
	console.warn(1,23,45,234234,3)		
	
Methods included in console-extend:

	.log([fn],shouldStillLog)
	
	args:
		firstArg: array of functions or a single function that will run before orig log.
		secondArg: true or false that decideds if it should still do origional log at the end.	
		=====================
		
	.warn([fn],shouldStillLog)
	
	args:
		firstArg: array of functions or a single function that will run before orig log.
		secondArg: true or false that decideds if it should still do origional log at the end.	
		=====================
		
	.error([fn],shouldStillLog)
	
	args:
		firstArg: array of functions or a single function that will run before orig log.
		secondArg: true or false that decideds if it should still do origional log at the end.	
		=====================
		
		.dev([fn],shouldStillLog) //give you a new custom log called with console.dev
	
	args:
		firstArg: array of functions or a single function that will run before orig log.
		secondArg: true or false that decideds if it should still do origional log at the end.	
		=====================
		.addCustom('name',[fn],shouldStillLog)
	
	args:
		firstArg: name for new console method. example 'test' = console.test.
		secondArg: array of functions or a single function that will run before orig log.
		thirdArg: true or false that decideds if it should still do origional log at the end.	
		=====================

	.console()
	
	args:none
	
	returns new console object;
	
Things to note that are important:

1. each function that is used as a proxy method will be passed the same args that the orig log function was passed. So in order to interact with them make sure to use the arguments object and not try to set params on the functions.
2. This happens async so if you are to pass an array of functions to be ran they may or may not run in order. They are executed inside a forEach loop.
3. The logging functions can include a wide range of types and arguments so in order to not get hard fails make sure to type check everything inside your proxy function(unlike above). Ex if your are calling .toUpperCase() type check to make sure its a string your calling it on.
4. Last, Do not call console.(log|warn|error) inside the function your proxing or else it will recursively call itself until it fills the stack killing the program.		