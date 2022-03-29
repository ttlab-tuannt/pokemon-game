import { getModule, VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import store from '@/store';
import { exampleService } from './services/api.service';

@Module({ dynamic: true, namespaced: true, store, name: 'Count' })
class Example extends VuexModule {
    count = 0;

    @Mutation
    INCREMENT() {
        this.count++;
    }

    @Mutation
    DECREMENT() {
        this.count--;
    }

    @Action
    incrementAfterTime(payload: number) {
        const delay = payload;

        return new Promise<void>((resolve) => {
            window.setTimeout(() => {
                this.INCREMENT();
                resolve();
            }, delay);
        });
    }

    @Action
    getUser() {
        exampleService.getList({}).then((response) => {
            console.log('reponse', response);
        });
    }
}

export const exampleModule = getModule(Example);
