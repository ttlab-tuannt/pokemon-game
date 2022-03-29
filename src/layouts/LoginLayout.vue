<template>
    <el-container class="login-page background-img">
        <!-- Main Wrapper -->
        <router-view />
        <!-- /Main Wrapper -->
    </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class LoginLayout extends Vue {}
</script>

<style lang="scss" scoped>
.login-page {
    font-size: 0.9375rem;
    color: #1f1f1f;
    background-color: #f7f7f7;
    min-height: 100%;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    &.background-img {
        background-image: url('../assets/images/auth-bg.png');
        height: 100vh;
        background-position: center;
        background-repeat: no-repeat;
    }
    .el-card {
        width: 480px;
        max-width: 90%;
    }
}
</style>
