"use strict";
Vue.component('flatpickr-diapazon', {
	props: {
		id: { default: "flatpickr-range" },
		value: { required: true },
		min: { required: true }, 
		max: { required: true },
	},
	
	data: function () {
		return {
			handler: undefined,
		}		
	},		
	
	computed: {
		selector() { return "#" + this.id },

	},

	mounted() {
		const self = this;

		$(document).ready( () => {	self.init();});
		
		
		// window.onresize = function () { setTimeout(() => {	self.loadCharts(); }, 1000); };
	},


	methods: {
		
		updateValue( dia ) {
			var 
				el = document.querySelector( this.selector ),
				new_value = "";
			if ( dia.length == 1 ) new_value = moment( dia[0] ).format("DD.MM.YYYY");
			else new_value = moment(dia[0] ).format("DD.MM.YYYY") + " - " + moment(dia[1] ).format("DD.MM.YYYY");
			
			//console.log( dia, new_value );
			//this.$emit('input', new_value);
			el.value = new_value;
		},

		init() {
			const 
				self = this;
			
			var
				value = this.value;
			if ( value[0] === undefined ) {
				value = [this.min, this.max];
				self.$emit('input', value);
			};
			
			let options = {
				mode: "range", // Режим выбора диапазона
				dateFormat: "Y-m-d", // Внутренний формат даты
				altFormat: true,
				// allowInput: true,
				defaultDate: value,
				onChange: function(selectedDates, dateStr, instance) {
					self.updateValue( selectedDates );
					if ( selectedDates.length == 2 ) self.$emit('input', [ 
						moment(selectedDates[0] ).format("YYYY-MM-DD"),
						moment(selectedDates[1] ).format("YYYY-MM-DD")
					]);
				},
				onReady: function(selectedDates, dateStr, instance) {
					self.updateValue( selectedDates );
					console.log("onReady");
				}				
			};
			
			if ( this.min ) options.minDate = this.min;
			if ( this.max ) options.maxDate = this.max;
			
			this.handler = flatpickr( this.selector, options );		
		
		}	

	},

// 

	template: `	
		
		<input type="text" :id="id">
		
	`,
	
	
	
	watch: {
        value: {
            handler: function( new_data, old_data ) { 
				if ( this.handler ) {
					this.handler.set("defaultDate", new_data );
					this.updateValue( new_data );
				};
			},
            deep: true
        },
	},	
	
	beforeDestroy() {
		if (this.handler) {
			this.handler.destroy();
		}
	}	
});