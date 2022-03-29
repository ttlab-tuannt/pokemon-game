import { concat, forEach } from 'lodash';
import {
    createRouter,
    createWebHistory,
    NavigationGuardWithThis,
    RouteRecordRaw,
} from 'vue-router';
import { getRouteFromModules } from './util';
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import AuthMiddleware from './middlewares/authMiddleware';

const routesModules = getRouteFromModules();

let routes: Array<RouteRecordRaw> = [];

forEach(routesModules, (module) => {
    routes = concat(routes, (module as { default: Array<RouteRecordRaw> }).default);
});

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(
    VueRouteMiddleware({
        [GLOBAL_MIDDLEWARE_NAME]: AuthMiddleware,
    }) as NavigationGuardWithThis<unknown>,
);

export default router;
