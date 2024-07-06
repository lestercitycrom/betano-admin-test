"use strict";

Vue.component('user-menu', {
	
	props: {
		position: { type: String, default: "top" }
	},
	
	computed: {
		me() { return this.$store.getters["me/data"] },
		
	},

	template: `
	
<div  v-if="me"class="dropdown ms-sm-3 header-item topbar-user">
	<button type="button" class="btn material-shadow-none" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<span class="d-flex align-items-center">
			<img class="rounded-circle header-profile-user" :src="me.src" alt="Header Avatar">
			<span class="text-start ms-xl-2">
				<span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{me.name}}</span>
				<span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{{me.role}}</span>
			</span>
		</span>
	</button>
	<div class="dropdown-menu dropdown-menu-end">
		<!-- item-->
		<h6 class="dropdown-header">Welcome {{me.name}}!</h6>
		<div class="dropdown-divider"></div>
		<a  @click.prevent=" $store.dispatch('me/deleteAuth') " class="dropdown-item" href="#"><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span class="align-middle" data-key="t-logout">Logout</span></a>
	</div>
</div>

	
`
});

