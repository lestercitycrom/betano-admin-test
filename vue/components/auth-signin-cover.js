"use strict";

Vue.component('auth-signin-cover', {
	
	data: function () {
		return {
			login: "",
			password: "",
			remember: 0,
			full_year: new Date().getFullYear(),
		}
	},
	
	
	
	methods: {
		
		postAuth() {
			this.$store.dispatch("me/postAuth", { login: this.login, password: this.password, remember: this.remember })
			return false;
		},

	},	

	template: `


    <!-- auth-page wrapper -->
    <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div class="bg-overlay"></div>
        <!-- auth-page content -->
        <div class="auth-page-content overflow-hidden pt-lg-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card overflow-hidden card-bg-fill galaxy-border-none">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="p-lg-5 p-4 auth-one-bg h-100">
                                        <div class="bg-overlay"></div>
                                        <div class="position-relative h-100 d-flex flex-column">
                                            <div class="mb-4">
                                                <a href="index.html" class="d-block">
                                                    <img src="/assets/images/digital-shop-logo.png" style="max-width: 40%">
                                                </a>
                                            </div>
                                            <div class="mt-auto">
                                                <div class="mb-3">
                                                    <i class="ri-double-quotes-l display-4 text-success"></i>
                                                </div>

                                                <div id="qoutescarouselIndicators" class="carousel slide" data-bs-ride="carousel">
                                                    <div class="carousel-indicators">
                                                        <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                                        <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                        <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                    </div>
                                                    <div class="carousel-inner text-center text-white-50 pb-5">
                                                        <div class="carousel-item active">
                                                            <p class="fs-15 fst-italic">" <b>Удобство и доступность: </b>Возможность управления магазинами и предоставления услуг через Telegram обеспечивает легкий доступ к CRM с любого устройства, в любое время. Это упрощает взаимодействие с клиентами и ускоряет процессы обслуживания. "</p>
                                                        </div>
                                                        <div class="carousel-item">
                                                            <p class="fs-15 fst-italic">" <b>Интеграция и автоматизация: </b>CRM интегрирована с Telegram, что позволяет автоматизировать рутинные задачи, такие как отправка уведомлений, подтверждение заказов и обработка запросов клиентов. Это снижает нагрузку на персонал и повышает эффективность работы."</p>
                                                        </div>
                                                        <div class="carousel-item">
                                                            <p class="fs-15 fst-italic">"<b> Аналитика и отчеты: </b>Система предоставляет подробные отчеты и аналитические данные о продажах, клиентах и операционной деятельности. Это помогает принимать обоснованные решения и улучшать стратегию управления магазином. "</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- end carousel -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->

                                <div class="col-lg-6">
                                    <div class="p-lg-5 p-4">
                                        <div>
                                            <h5 class="text-primary">Добро пожаловать обратно!</h5>
                                            <p class="text-muted">Войдите, чтобы продолжить работу в системе</p>
                                        </div>

                                        <div class="mt-4">
                                            <form @submit.prevent="postAuth">

                                                <div class="mb-3">
                                                    <label for="username" class="form-label">Ваш логин (email)</label>
                                                    <input v-model="login" required type="text" class="form-control" id="username" placeholder="Введите ваш логин">
                                                </div>

                                                <div class="mb-3">
												<!--
                                                    <div class="float-end">
                                                        <a href="auth-pass-reset-cover.html" class="text-muted">Forgot password?</a>
                                                    </div>
												-->
                                                    <label class="form-label" for="password-input">Пароль</label>
                                                    <div class="position-relative auth-pass-inputgroup mb-3">
                                                        <input v-model="password" required  type="password" class="form-control pe-5 password-input" placeholder="Введите ваш пароль" id="password-input">
                                                        <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon material-shadow-none" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox"  v-model="remember" id="auth-remember-check">
                                                    <label class="form-check-label" for="auth-remember-check">Запомнить меня</label>
                                                </div>

                                                <div class="mt-4">
                                                    <button class="btn btn-success w-100" type="submit">Войти</button>
                                                </div>

												<!--
                                                <div class="mt-4 text-center">
                                                    <div class="signin-other-title">
                                                        <h5 class="fs-13 mb-4 title">Sign In with</h5>
                                                    </div>

                                                    <div>
                                                        <button type="button" class="btn btn-primary btn-icon waves-effect waves-light"><i class="ri-facebook-fill fs-16"></i></button>
                                                        <button type="button" class="btn btn-danger btn-icon waves-effect waves-light"><i class="ri-google-fill fs-16"></i></button>
                                                        <button type="button" class="btn btn-dark btn-icon waves-effect waves-light"><i class="ri-github-fill fs-16"></i></button>
                                                        <button type="button" class="btn btn-info btn-icon waves-effect waves-light"><i class="ri-twitter-fill fs-16"></i></button>
                                                    </div>
                                                </div>
												-->

                                            </form>
                                        </div>

										<!--					
                                        <div class="mt-5 text-center">
                                            <p class="mb-0">Don't have an account ? <a href="auth-signup-cover.html" class="fw-semibold text-primary text-decoration-underline"> Signup</a> </p>
                                        </div>
										-->
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->
                        </div>
                        <!-- end card -->
                    </div>
                    <!-- end col -->

                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end auth page content -->

        <!-- footer -->
        <footer class="footer galaxy-border-none">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <p class="mb-0">&copy;{{full_year}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->
	
`
});

