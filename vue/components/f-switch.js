"use strict";
Vue.component('f-switch', {
	props: {
		id: {}, 
		value: { required: true },
		size: { default: "sm" },
	},
	
	methods: {
	
		change( value ) {
	
			console.info( +value );
			this.$emit('input', +value);
			// $emit('input', value)
		},
	},
	
	template: `
	<div class="row mb-3">
		<div class="col-lg-9">
			<label :for="id" class="form-label text-muted"><slot></slot></label>
		</div>
		<div class="col-lg-3">
			<div class="form-check form-check-secondary form-switch text-center" :class=" 'form-switch-' + size " dir="ltr">
				<input 
					:id="id" 			
					type="checkbox" 
					:checked=" +value == 1 "
					@input=" change($event.target.checked) "
					class="form-check-input"
				>		
			</div>	
		</div>
	</div>	
`
});