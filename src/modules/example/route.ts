import { RouteRecordRaw } from 'vue-router';
import ExamplePage from './pages/ExamplePage.vue';
import HomePage from './pages/HomePage.vue';

export default [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            public: true,
        },
    },
    {
        path: '/example',
        name: 'example',
        component: ExamplePage,
        meta: {
            public: true,
        },
    },
] as RouteRecordRaw[];
