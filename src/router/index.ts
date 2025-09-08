import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import Cookies from "js-cookie"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...setupLayouts(routes),
        {
            path: '/',
            component: () => import('@/layouts/default.vue'),
            meta: { requiresAuth: true },
            children: [
                { path: 'users/profile', component: () => import('@/pages/Users/profile.vue') },
                // thêm các route con khác cần login
            ]
        },
        { path: '/login', component: () => import('@/pages/login.vue') },
    ]
})

router.beforeEach((to, from, next) => {
    const token = Cookies.get("token")

    if (to.meta.requiresAuth && !token) {
        next("/login")
    } else if (to.path === "/login" && token) {
        next("/")
    } else if (to.path === "/" && !token) {
        next("/login")
    }
    else {
        next()
    }
})

export default router
