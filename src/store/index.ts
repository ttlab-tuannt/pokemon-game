import { IUser } from '@/modules/auth/types';
import { createLogger, createStore } from 'vuex';

import { appService } from '@/utils/app';

const user = appService.getUser<IUser>();

export default createStore({
    state: {
        loginUser: user,
    },
    mutations: {
        setLoginUser: (state, payload: IUser) => {
            state.loginUser = payload;
        },
    },
    actions: {
        setLoginUser: (context, payload: IUser) => {
            context.commit('setLoginUser', payload);
        },
    },
    modules: {},
    plugins: process.env.mode === 'debug' ? [createLogger()] : [],
});
