<template>
    <div class="home">
        <img alt="Vue logo" src="@/assets/logo.png" />
        <ExampleComponent msg="Welcome to Your Vue.js + TypeScript App" />
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-4">
                    <ExampleForm />
                </div>
            </div>
        </div>

        <div>counter: {{ state.counter }}</div>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { Options, Vue, setup } from 'vue-class-component';
import ExampleComponent from '../components/ExampleComponent.vue'; // @ is an alias to /src
import ExampleForm from '../components/ExampleForm.vue'; // @ is an alias to /src
import { exampleModule } from '../store';

@Options({
    components: {
        ExampleComponent,
        ExampleForm,
    },
})
export default class ExamplePage extends Vue {
    state = setup(() => {
        exampleModule.getUser();
        // exampleModule.incrementAfterTime(1000)

        const counter = computed(() => exampleModule.count);

        return { counter };
    });
}
</script>
