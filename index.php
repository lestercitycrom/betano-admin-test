<?php
	require_once("classes/installer.php");
	$installer = new installer();
	define('VERSION', time());
	define('CDN', "http://cdn.velzon.local/well/");
	?>
<!doctype html>
<html lang="en" 
	data-layout="vertical" 
	data-topbar="light" 
	data-sidebar="dark" 
	data-sidebar-size="lg" 
	data-sidebar-image="none" 
	data-preloader="disable" 
	data-theme="saas" 
	data-theme-colors="default"
>
	<head>
		<meta charset="utf-8" />
		<title>Dashboard</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<!-- App favicon -->
		<link rel="shortcut icon" href="<?=CDN?>images/favicon.ico">

		<!-- Layout config Js -->
		<script src="<?=CDN?>js/layout.js"></script>
		<!-- Bootstrap Css -->
		<link href="<?=CDN?>css/bootstrap.min.css" rel="stylesheet" type="text/css" />
		<!-- Icons Css -->
		<link href="<?=CDN?>css/icons.min.css" rel="stylesheet" type="text/css" />

		<!--datatable css-->
		<link rel="stylesheet" href="<?=CDN?>plugins/datatables2/dataTables.bootstrap5.min.css" />
		<link rel="stylesheet" href="<?=CDN?>plugins/datatables2/dataTables.dataTables.min.css" />
		
		<!-- App Css-->
		<link href="<?=CDN?>css/app.min.css" rel="stylesheet" type="text/css" />

		<!-- custom Css-->
		<link href="<?=CDN?>css/custom.css?v=<?=VERSION?>" rel="stylesheet" type="text/css" />
		<script src="<?=CDN?>components/core.js?v=<?=VERSION?>"></script>
	</head>
	<body>
		<div id="vue-app-container" v-cloak>
			
			<div id="layout-wrapper">
				<header v-show=' !$store.getters["page/is_service"] ' id="page-topbar">
					<div class="layout-width">
						<div class="navbar-header">
							<div class="d-flex">
								<!-- LOGO -->
								<div class="navbar-brand-box horizontal-logo">
									<a href="/" class="logo logo-dark router-link">
										<span class="logo-sm">
											<img src="<?=CDN?>images/logo-sm.png" alt="" height="22">
										</span>
										<span class="logo-lg">
											<img src="<?=CDN?>images/logo-light.png" alt="" height="17">
										</span>
									</a>

									<a href="/" class="logo logo-light router-link">
										<span class="logo-sm">
											<img src="<?=CDN?>images/logo-sm.png" alt="" height="22">
										</span>
										<span class="logo-lg">
											<img src="<?=CDN?>images/logo-light.png" alt="" height="17">
										</span>
									</a>
								</div>
								<button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none" id="topnav-hamburger-icon">
									<span class="hamburger-icon"><span></span><span></span><span></span></span>
								</button>
								
								<!-- App Search-->
								<!-- <app-header-search></app-header-search> -->
								

							</div>
							<div class="d-flex align-items-center">
								<div class="dropdown d-md-none topbar-head-dropdown header-item">
									<button type="button" class="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<i class="bx bx-search fs-22"></i>
									</button>
									<div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
										<form class="p-3">
											<div class="form-group m-0">
												<div class="input-group">
													<input type="text" class="form-control" placeholder="Search123 ..." aria-label="Recipient's username">
													<button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
												</div>
											</div>
										</form>
									</div>
								</div>
								<!-- <app-header-lang></app-header-lang> -->
								<!-- <app-header-apps></app-header-apps> -->
								<!-- <app-header-cart></app-header-cart> -->
								<div class="ms-1 header-item d-none d-sm-flex">
									<button type="button" class="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle" data-toggle="fullscreen">
									<i class='bx bx-fullscreen fs-22'></i>
									</button>
								</div>
								
								<div class="ms-1 header-item d-none d-sm-flex">
									<button type="button" class="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode">
									<i class='bx bx-moon fs-22'></i>
									</button>
								</div>
								
								<!-- <app-header-notifications></app-header-notifications> -->
								<user-menu position="top"></user-menu>
							</div>
						</div>
					</div>
				</header>

				<!-- ========== App Menu ========== -->
				<div class="app-menu navbar-menu">
					<!-- LOGO -->
					<div class="navbar-brand-box">

						<!-- Dark Logo-->
						<a href="/" class="logo logo-dark router-link">
							<span class="logo-sm">
								<img src="<?=CDN?>images/logo-sm.png" alt="" height="22">
							</span>
							<span class="logo-lg">
								<img src="<?=CDN?>images/logo-dark.png" alt="" height="17">
							</span>
						</a>
						<!-- Light Logo-->
						<a href="/" class="logo logo-light router-link">
							<span class="logo-sm">
								<img src="<?=CDN?>images/logo-sm.png" alt="" height="22">
							</span>
							<span class="logo-lg">
								<img src="<?=CDN?>images/logo-light.png" alt="" height="17">
							</span>
						</a>
						
						<button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
						<i class="ri-record-circle-line"></i>
						</button>
					</div>
					
					<user-menu position="left"></user-menu>

					<div id="scrollbar">
						<div class="container-fluid">
							<div id="two-column-menu"></div>
							<ul v-if="$store.getters['setup/menu']" class="navbar-nav" id="navbar-nav">
								<template v-for=" item in $store.getters['setup/menu'] ">
									<li v-if=" item.url === undefined " class="menu-title">
										<span>{{item.title}}</span>
									</li>
									<li v-else class="nav-item">
										<a class="nav-link menu-link router-link" :href=" item.url ">
											<i v-if="item.icon" :class="item.icon"></i> <span>{{item.title}}</span>
										</a>
									</li>							
								</template>
							</ul>

						</div>
						<!-- Sidebar -->
					</div>

					<div class="sidebar-background"></div>
				</div>
				<!-- Left Sidebar End -->
				<!-- Vertical Overlay-->
				<div class="vertical-overlay"></div>
				<!-- ============================================================== -->
				<!-- Start right Content here -->
				<!-- ============================================================== -->
				<div class="main-content">
					<router-view></router-view>
					<!-- End Page-content -->
					<footer class="footer">
						<div class="container-fluid">
							<p class="mb-0 text-muted">&copy; <?=date("Y")?></p>
						</div>
					</footer>
				</div>
				<!-- end main content-->
			</div>

			<!-- END layout-wrapper -->
			
			<!--start back-to-top-->
			<button onclick="topFunction()" class="btn btn-danger btn-icon" id="back-to-top"><i class="ri-arrow-up-line"></i></button></div>
			<!--end back-to-top-->
			
		<!--preloader-->
		<div id="preloader">
			<div id="status">
				<div class="spinner-border text-primary avatar-sm" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		</div>
		<!-- Theme Settings -->
		
		<?php  // require_once("layout-wizard.php") ?>
		
		<!-- JAVASCRIPT -->

		<script src="<?=CDN?>plugins/bootstrap/bootstrap.bundle.5.3.3.min.js"></script>
		
		<script src="<?=CDN?>plugins/simplebar.min.js"></script>
		<script src="<?=CDN?>plugins/waves.min.js"></script>
		<script src="<?=CDN?>plugins/feather-icons/feather.min.js"></script>
		<script src="<?=CDN?>plugins/lord-icon-2.1.0.js"></script>
		<script src="<?=CDN?>plugins/toastify.js"></script>
		<script src="<?=CDN?>plugins/choices.min.js"></script>
		<script src="<?=CDN?>plugins/flatpickr.min.js"></script>
		
		<script src="<?=CDN?>plugins/jquery/jquery.min.js"></script>

		<script src="<?=CDN?>plugins/datatables2/dataTables.2.0.8.min.js"></script>
		<script src="<?=CDN?>plugins/datatables2/dataTables.bootstrap5.min.js"></script>
		<link href="<?=CDN?>plugins/datatables2/fixedColumns.dataTables.5.0.1.min.css" rel="stylesheet" type="text/css">
		<script src="<?=CDN?>plugins/datatables2/dataTables.fixedColumns.5.0.1.min.js"></script>
		
		<script src="<?=CDN?>plugins/moment/moment.2.27.0.min.js"></script>
		 
		<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
		<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
		 
		<link href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" rel="stylesheet"/>
		<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>			 
		 
		<!-- CRM -->
		<script src="<?=CDN?>plugins/axios/axios.min.0.19.2.js"></script>
		<script src="<?=CDN?>plugins/vue/vue.2.7.16.js"></script>	
		<script src="<?=CDN?>plugins/vue/vuex.3.6.2.js"></script>	
		<script src="<?=CDN?>plugins/vue/vue-router.3.6.5.js"></script>

		<script src="<?=CDN?>plugins/awesome-notifications/index.js"></script>
		<link href="<?=CDN?>plugins/awesome-notifications/style.css" rel="stylesheet" type="text/css">

<?=$installer->after()?>

		<script src="/vue/store.js?v=<?=VERSION?>"></script>
		<script src="/vue/router.js?v=<?=VERSION?>"></script>
		<script src="/vue/app.js?v=<?=VERSION?>"></script>	
		
		<script src="<?=CDN?>js/app.js?v=<?=VERSION?>"></script>

	</body>
</html>
