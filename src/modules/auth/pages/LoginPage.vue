<template>
    <el-card :body-style="{ padding: 0 }">
        <template #header>
            <div class="clearfix">
                <span>Card name</span>
                <el-button style="float: right; padding: 3px 0" type="text"
                    >Operation button</el-button
                >
            </div>
        </template>
    </el-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class LoginPage extends Vue {
    msg!: string;
}
</script>

<style lang="scss" scoped></style>
