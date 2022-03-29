import LoginPage from './pages/LoginPage.vue';
import { PageName } from '../common/constants';
import { RouteRecordRaw } from 'vue-router';
import LoginLayout from '@/layouts/LoginLayout.vue';

export default [
    {
        path: '/login',
        component: LoginLayout,
        children: [
            {
                path: '',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
                meta: {
                    onlyWhenLoggedOut: true,
                    public: true,
                },
            },
        ],
    },
] as RouteRecordRaw[];
