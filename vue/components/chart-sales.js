
"use strict";

Vue.component('chart-sales', {
	template: `
		<div id="sales-chart"></div>
	`,
	mounted() {
		this.renderChart();
	},
	methods: {
		renderChart() {
			// Используем пример графика с страницы https://themesbrand.com/velzon/html/master/dashboard-analytics.html
			// Это демо-данные
			const options = {
				series: [{
					name: 'Продажи',
					data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
				}],
				chart: {
					height: 350,
					type: 'line',
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth'
				},
				title: {
					text: 'Продажи за последние 9 месяцев',
					align: 'left'
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						opacity: 0.5
					},
				},
				xaxis: {
					categories: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен'],
				}
			};

			const chart = new ApexCharts(document.querySelector("#sales-chart"), options);
			chart.render();
		}
	}
});
