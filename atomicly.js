// 
// Created by David Helgeson
//  github.com/dhcar/
//  MIT license
// 

var atomicly = (function() {

	//
	// Return a promise that will have a value object
	// 
	return function(ref, propArray){

		var vals          = {};	// value to be callback argument in atomicly(ref, array).then( callback )
		var outerDeferred = Q.defer();
		var outerPromise  = outerDeferred.promise;
		// wraps promises below to return our object rather than hash array :)

		var promises = [];
		// will be used for Q.all()

		for (var i = 0; i < propArray.length; i++) {

			var prop = propArray[i];

			var deferred = Q.defer();
			var promise = deferred.promise;

			promises.push(promise);

			var binder = {
				'prop': prop,
				'deferred': deferred
			};

			ref.child(prop).once( 'value', collectVals, errVals, binder );

		};

		function collectVals(snap){
			vals[this.prop] = snap.val();
			this.deferred.resolve();
		}

		function errVals(err){
			console.error(err);
			this.deferred.reject(err);
		}

		Q.all(promises).then(function(){
			outerDeferred.resolve(vals);
		});

		return outerPromise;

	};
		
})();
