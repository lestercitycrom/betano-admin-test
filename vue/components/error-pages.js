"use strict";


Vue.component('page-error', {
	props: {
		status: {
			type: Object,
			default: () => ({}) 		
		},
	},

	computed: {
	
		st() { return Object.assign( this.$store.getters['page/status'], this.status ) },
			
		status_code() { return this.st.code ? +this.st.code : ''; },
		status_name() { return this.st.name ? this.st.name : "Internal Server Error!"; },
		status_message() { return this.st.message ? this.st.message : "Server Error. We're not exactly sure what happened, but our servers say something is wrong."; },
	
	
	},


	template: `	
	
    <!-- auth-page wrapper -->
    <div class="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">

        <!-- auth-page content -->
        <div class="auth-page-content overflow-hidden p-0">
            <div class="container-fluid">
                <div class="row justify-content-center">
				
					<div v-if=" status_code == 404 " class="col-xl-7 col-lg-8">
						<div class="text-center">
							<img src="/tmpl/images/error400-cover.png" alt="error img" class="img-fluid">
							<div class="mt-3">
								<h3 class="text-uppercase">Sorry, Page not Found</h3>
								<p class="text-muted mb-4">The page you are looking for not available!</p>
								<!--
								<button class="btn btn-success" @click="$store.commit('page/setStatusCode', 200)">Set Status Code 200</button>
								-->
								<router-link to="/" class="btn btn-success"><i class="mdi mdi-home me-1"></i>Back to home</router-link>
							</div>
						</div>
					</div>				
					
                    <div v-else class="col-xl-4 text-center">
                        <div class="error-500 position-relative">
                            <img src="/tmpl/images/error500.png" alt="" class="img-fluid error-500-img error-img" />
                            <h1 class="title text-muted">{{status_code}}</h1>
                        </div>
                        <div>
                            <h4 v-html="status_name"></h4>
                            <p class="text-muted w-75 mx-auto" v-html="status_message"></p>
                            <router-link to="/" class="btn btn-success"><i class="mdi mdi-home me-1"></i>Back to home</router-link>
                        </div>
                    </div><!-- end col-->
					
					
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end auth-page content -->
    </div>
    <!-- end auth-page-wrapper -->	
	
	`
});
