var proxy = {
	log: function(arrOfFunctions,stillLog) {
			stillLog = (typeof stillLog != 'undefined') ? stillLog : true;
			(function() {

			var orig=console.log;

			return function() {
				if(Array.isArray(arrOfFunctions)){
					arrOfFunctions.forEach(x => {
						x.apply(this,arguments)
					})
				} else {
					arrOfFunctions.apply(this,arguments)
				}
				if(stillLog) {
					orig.apply(console, arguments);
				}
			};
		})();

	},
	addCustom: function(name,arrOfFunctions,stillLog) {
			stillLog = (typeof stillLog != 'undefined') ? stillLog : true;
			console[name]=(function() {

			var orig=console.log;

			return function() {
				if(Array.isArray(arrOfFunctions)){
					arrOfFunctions.forEach(x => {
						x.apply(this,arguments)
					})
				} else {
					arrOfFunctions.apply(this,arguments)
				}
				if(stillLog) {
					orig.apply(console, arguments);
				}
			};
		})();
	},
	dev: function(arrOfFunctions,stillLog) {
			stillLog = (typeof stillLog != 'undefined') ? stillLog : true;
			console.dev=(function() {

			var orig=console.log;

			return function() {
				if(Array.isArray(arrOfFunctions)){
					arrOfFunctions.forEach(x => {
						x.apply(this,arguments)
					})
				} else {
					arrOfFunctions.apply(this,arguments)
				}
				if(stillLog) {
					orig.apply(console, arguments);
				}			};
			})();
		},
	error: function(arrOfFunctions,stillLog) {
			stillLog = (typeof stillLog != 'undefined') ? stillLog : true;
			console.error=(function() {

			var orig=console.error;

			return function() {
				if(Array.isArray(arrOfFunctions)){
					arrOfFunctions.forEach(x => {
						x.apply(this,arguments)
					})
				} else {
					arrOfFunctions.apply(this,arguments)
				}
				if(stillLog) {
					orig.apply(console, arguments);
				}			};
			})();

		},
		warn: function(arrOfFunctions,stillLog) {
			stillLog = (typeof stillLog != 'undefined') ? stillLog : true;
			console.warn=(function() {

				var orig=console.warn;

				return function() {
					if(Array.isArray(arrOfFunctions)){
						arrOfFunctions.forEach(x => {
							x.apply(this,arguments)
						})
					} else {
						arrOfFunctions.apply(this,arguments)
					}
					if(stillLog) {
						orig.apply(console, arguments);
					}			};
				})();

			},
			console: function() {
				return console;
			}
		} 

		module.exports = proxy;