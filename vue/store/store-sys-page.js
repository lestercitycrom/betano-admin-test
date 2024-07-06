"use strict";

const store_sys_page = {
	namespaced: true,
	
	state: {
		
		breadcrumbs: [],
		
		load: true,
		role: false,
		
		// раскрыто ли левое меню навигации
		sidebar_expanded: true,
		status: { code: 200 },
		title: "",
		
		
	},
	
	// Vue.set(vm.someObject, 'b', 2)
	getters: {
		breadcrumbs: state => { return state.breadcrumbs },
		
		load: state => { return state.load },
		role: state => { return state.role },
		sidebar_expanded: state => { return state.sidebar_expanded },
		status: state => { return state.status },
		title: state => { return state.title },
	},		
	
	
	mutations: {
		setBreadcrumbs( state, data ) { state.breadcrumbs = data },
		setLoad( state, data ) { 
			/*
			setTimeout(function() {
				if ( data ) $('.pageloader').fadeIn('fast', function() {} );
				else $('.pageloader').fadeOut('fast', function() {}  );
			}, 500);			
			*/
			state.load = data; 	
		},
		setRole( state, data ) { state.role = data; 	},
		setStatus( state, data ) { state.status = data; 	},
		switchSidebarExpanded( state, data ) { state.sidebar_expanded = !state.sidebar_expanded; 	},
		setTitle( state, data ) { document.title = state.title = data; 	},
	},		
	
	actions: {
		
		/*
		getAuth( context ) {



		}
		*/
	}
	
	
};
