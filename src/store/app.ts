import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from './index';

interface AppState {
    isMiniSidebar: boolean;
    isExpandMenu: boolean;
}
@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class AppModule extends VuexModule implements AppState {
    isMiniSidebar = false;
    isExpandMenu = false;
    isDrawer = false;
    // ACTIONS
    @Action
    toggleSidebar(): void {
        this.SET_MINI_SIDEBAR(!this.isMiniSidebar);
    }

    @Action
    toggleExpandMenu(): void {
        this.SET_EXPAND_MENU(!this.isExpandMenu);
    }

    @Action
    toggleDrawer(): void {
        this.SET_DRAWER(!this.isDrawer);
    }
    // GETTERS

    // MUTATION
    @Mutation
    SET_MINI_SIDEBAR(value: boolean): void {
        this.isMiniSidebar = value;
    }

    @Mutation
    SET_EXPAND_MENU(value: boolean): void {
        this.isExpandMenu = value;
    }

    @Mutation
    SET_DRAWER(value: boolean): void {
        this.isDrawer = value;
    }
}

export const appModule = getModule(AppModule);
