'use strict';
const NestedPage = { template: `<div><router-view></router-view></div>` };

// routes const start
const routes = [
  {
    path: '/',
    component: Dashboard,
    meta: {
      title: 'Главная',
      icon: 'mdi-home'
    }
  },
  
  
    {
    path: '/users',
    component: Users,
    meta: {
      title: 'Пользователи',
      icon: 'mdi-home'
    }
  },  
  
  {
    path: '/*',
    component: Error404,
    meta: {
      title: 'Страница не найдена',
      icon: 'mdi-alert-circle'
    }
  },
];

// routes const end

const router = new VueRouter({
    base: '/',
    mode: 'history',	
	routes: routes,
	linkActiveClass: "",
	linkExactActiveClass: "active",	
});

	
router.beforeEach((to, from, next) => {

	// meta
	if ( to.meta ) {
		
		store.commit("page/setStatus", { code: 200 });
		
		if ( to.meta.title ) store.commit("page/setTitle", to.meta.title);
		if ( to.meta.role ) store.commit("page/setRole", to.meta.role);	

	};


	next();
});