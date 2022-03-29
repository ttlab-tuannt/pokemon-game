import { RouteRecordRaw } from 'vue-router';
import ErrorLayout from '@/layouts/ErrorLayout.vue';
import { PageName, SpecialPage } from './constants';

export default [
    {
        path: '/error/404',
        component: ErrorLayout,
        name: PageName.NOT_FOUND,
        meta: {
            name: SpecialPage.NOT_FOUND,
            requiresAuth: false,
        },
    },
] as RouteRecordRaw[];
