"use strict";
Vue.component('data-table', {
	
	// ~~~~~~~~~~~~~~~~~~~~~~				properties
	props: {
		value: { required: true },
		def: {},
		selected: {},
	},
	
	// ~~~~~~~~~~~~~~~~~~~~~~				data
	data: function () {
		return {
			dt: undefined,
		}
	},

	methods: {
		
		setData: function( newData ) {
			const old_page = this.dt.page();
				
			if (newData instanceof Array) {
				this.dt.clear();
				this.dt.rows.add( newData ).draw();		
				if ( old_page != 0 ) this.dt.page( old_page ).draw( 'page' );
			};			
		},
		
		createPlugin() {
			//const self = this;
			
			var definition = { ...this.def };
			
/*
					{ name: "id", "title": `<div class="form-check"><input class="form-check-input" type="checkbox" onchange=" vueApp.DTSelectAllRows( $(this).closest('table').attr('id'), 'orders', this.checked ); " name="checkAll" value="option"></div>`, width: '1%',  "orderable": false, render: function( data, type, row, meta ) { 
						let checked = "";

						if (  store.getters.selected_rows.orders.includes( row.id ) ) checked = "checked='checked'";		
						
						//console.log( checked );
						return `
							<div class="form-check">
								<input ${checked} onchange="vueApp.DTSelectRow( 'orders', ${row.id}, this.checked );" class="form-check-input" type="checkbox" name="selected_rows[orders]" value="{data}">
							</div>						
						`;
					}},
*/					
			
			// selected
			if ( this.selected !== undefined ) {
				definition.columnDefs.unshift({
					name: "id",
					title: `<div class="form-check"><input class="form-check-input" type="checkbox" onchange=" vueApp.DTSelectAllRows( $(this).closest('table').attr('id'), 'orders', this.checked ); " name="checkAll" value="option"></div>`, 
					width: '1%',  
					orderable: false, 
					render: function( data, type, row, meta ) { 					
						
						let checked = "";
						return `
							<div class="form-check">
								<input ${checked} onchange="" class="form-check-input" type="checkbox">
							</div>						
						`;					
					}
				});
			};
			
			
			definition.columnDefs.forEach(  (item_col, index_col) => {
				if ( item_col.targets === undefined ) item_col.targets = index_col;
				if ( item_col.data === undefined ) item_col.data = item_col.name;	
				
				definition.columnDefs[ index_col ] = item_col;
			});
			
			//definition.language = { url: "/assets/js/components/datatables/ru.json",	};		
			
			const $table = jQuery( this.$refs.el ); 
			this.dt = $table.DataTable( definition );
			
			$table.find("thead").addClass("table-light text-muted");
			
			this.setData( this.value );
		},
	},	
	
	mounted() {
		if (document.readyState === "complete") this.createPlugin();
		else window.addEventListener("DOMContentLoaded", this.createPlugin());
	},
	
	watch: {
        value: {
            handler: function( data ) { this.setData( data ); },
            deep: true
        },
        selected: {
            handler: function( data ) { 
				console.log( "selected" );
			},
        },		
	},	
	
	// ~~~~~~~~~~~~~~~~~~~~~~				template
	template: `
		<!-- <div class="datatable-scroll1" data-simplebar=""> -->
		<div class="table-responsive mb-1">
			<table class="table table-bordered dt-responsive nowrap table-striped align-middle" ref="el" style="width: 100%"></table>
		</div>
	`
});
