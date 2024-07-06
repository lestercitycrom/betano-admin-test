
"use strict";
const Dashboard = {
	mixins: [componentsMixin],
	template: `
		<div>
			<div class="row">
				<div class="col-md-4">
					<widget-revenue></widget-revenue>
				</div>
				<div class="col-md-4">
					<widget-orders></widget-orders>
				</div>
				<div class="col-md-4">
					<widget-customers></widget-customers>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<chart-sales></chart-sales>
				</div>
			</div>
		</div>
	`
};
