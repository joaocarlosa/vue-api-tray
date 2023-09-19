// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterComponent from '../components/auth/RegisterComponent.vue';
import LoginComponent from '../components/auth/LoginComponent.vue';
import SaleComponent from '../components/sale/SaleComponent.vue';
import SellerComponent from '../components/seller/SellerComponent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/sale',
    name: 'sale',
    component: SaleComponent,
    meta: { requiresAuth: true }
  },
  {
    path: '/seller',
    name: 'seller',
    component: SellerComponent,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    const authToken = window.sessionStorage.getItem('authToken');

    if (authToken) {
      next();
    } else {
      next({ name: 'home' });
    }
  } else {
    next();
  }
});

export default router;
