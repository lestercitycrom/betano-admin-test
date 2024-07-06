"use strict";


const store = new Vuex.Store({

	modules: {
		setup: store_sys_setup,
		page: store_sys_page,
		me: store_sys_account,
		
		users: store_users,
		customers: store_customers,
		
// assembled stores start		  
		  
// assembled stores end		  
	},	
	
	state: { 
		demo: true,
		log: true,
	}, 
	
	getters: {
	},
		
	
	mutations: {
	},
	
	actions: {
	}
	
});


