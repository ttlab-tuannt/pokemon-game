<template>
    <div>
        <div v-if="code == 404" class="error404 error-page" style="height: 100vh">
            <!-- Main Wrapper -->
            <div class="main-wrapper background-img">
                <el-card
                    ><div class="error-box">
                        <h1>404</h1>
                        <h3>
                            <i class="fa fa-warning" />{{ $t('common.app.pageNotFound') }}
                        </h3>
                        <router-link to="/" class="btn btn-custom">
                            {{ $t('common.app.backToHome') }}
                        </router-link>
                    </div></el-card
                >
            </div>
            <!-- /Main Wrapper -->
        </div>
        <div v-else class="error500 error-page" style="height: 100vh">
            <!-- Main Wrapper -->
            <div class="main-wrapper">
                <div class="error-box">
                    <h1>500</h1>
                    <h3><i class="fa fa-warning" /> Oops! Something went wrong</h3>
                    <p>The page you requested was not found.</p>
                    <router-link to="/" class="btn btn-custom">
                        Back to Home
                    </router-link>
                </div>
            </div>
            <!-- /Main Wrapper -->
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class ErrorLayout extends Vue {
    code = 404;
}
</script>

<style lang="scss" scoped>
.main-wrapper {
    font-size: 0.9375rem;
    color: #1f1f1f;
    background-color: #f7f7f7;
    min-height: 100%;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    overflow-x: hidden;
    border: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.background-img {
        height: 100vh;
        background-position: center;
        background-repeat: no-repeat;
    }
    .el-card {
        width: 480px;
        max-width: 90%;
        border-radius: 8px;
    }
}
</style>
