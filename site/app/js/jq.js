export default {
	addClass: function(el, className) {
		el.classList.add(className);
	},
	removeClass: function(el, className) {
		el.classList.remove(className);
	},
	hasClass: function(el, className) {
		el.classList.contains(className);
	}
};