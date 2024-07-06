"use strict";

const store_sys_account = {
	namespaced: true,
	
	state: {
		data: undefined,
	},
	

	getters: {
		auth: state => { 
			if ( state.data === undefined ) return undefined;
			return state.data ? true : false 
		},
		role: state => { 
			if ( state.data === undefined ) return undefined;
			return state.data ? state.data.role : false 
		},
		data: state => { return state.data },
	},		

	
	actions: {
		
		async getAccount( context ) {
			try {
				const response = await app.api.get( "/auth" );
				context.state.data = response.me ? response.me : false;
			} catch( { name, message } ) {
				app.error( message, name );
				context.rootState.page.status = { code: 500, name, message };
			}
		},
		
		async postAuth( context, params ) {
			const response = await app.api.post( "/auth", params );
			context.state.data = response.me ? response.me : false;
			if ( response.me ) location.reload();
			// return context.state.data
		},		
		
		
		deleteAuth( context ) {
			app.api.delete( "/auth" );
			context.state.data = false;
			return false;
		},	


	}
};
