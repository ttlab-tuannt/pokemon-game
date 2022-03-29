<template>
    <div class="main-wrapper">
        <layouts-header />
        <layouts-sidebar />
        <!-- Page Wrapper -->
        <div class="page-wrapper">
            <!-- Page Content -->
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
            <!-- /Page Content -->
        </div>
        <!-- /Page Wrapper -->
    </div>
</template>

<script lang="ts">
import { appModule } from '@/store/app';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class MainLayout extends Vue {
    created(): void {
        const className = ['main_body'];
        if (appModule.isMiniSidebar) {
            className.push('mini-sidebar');
            if (appModule.isExpandMenu) {
                className.push('expand-menu');
            }
        }
        className.forEach((name) => {
            document.body.classList.add(name);
        });
    }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
    left: 0;
    margin-left: 260px;
    padding-top: 64px;
    position: relative;
    transition: all 0.2s ease-in-out;
    @media only screen and (max-width: 991.98px) {
        margin-left: 0;
    }
}
.mini-sidebar {
    .page-wrapper {
        @media only screen and (min-width: 991px) {
            margin-left: 60px;
        }
    }
}
</style>
