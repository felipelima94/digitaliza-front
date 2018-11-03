app.directive('equal', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
		function myValidation(value) {
			if (attr.equal == value) {
			mCtrl.$setValidity('equal', true);
			} else {
			mCtrl.$setValidity('equal', false);
			}
			return value;
		}
		mCtrl.$parsers.push(myValidation);
		}
	};
});