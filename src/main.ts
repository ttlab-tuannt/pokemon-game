import { forEach } from 'lodash';
import { Component, createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import plugins from './plugins';
import { getGlobalComponents } from './utils/globalComponents';

// import global css
import '@/assets/styles/index.scss';

const app = createApp(App)
    .use(store)
    .use(router)
    .use(plugins.i18n)
    .use(plugins.ElementUI, {
        i18n: (key: string) => {
            return plugins.i18n.global.t(key, plugins.i18n.global.locale);
        },
    });

forEach(getGlobalComponents(), (component, name) => {
    app.component(name, component as Component);
});

app.mount('#app');
