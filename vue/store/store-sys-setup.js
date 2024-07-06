 "use strict";

const store_sys_setup = {
	namespaced: true,
	
	state: {
		menu: [
			{ "title": "menu" },
			{ "title": "Dashboard", "url": "/", "icon": "bx bxs-dashboard" },
		],
	},
	
	getters: {
		menu: state => { return state.menu },
	},
	
};
 