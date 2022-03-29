<template>
    <div>this is: {{ msg }}</div>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component';

@Options({
    props: {
        msg: prop({ type: String }),
    },
})
export default class ExampleComponent extends Vue {
    msg!: string;
}
</script>
