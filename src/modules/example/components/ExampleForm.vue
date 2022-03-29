<template>
    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                v-model="form.email"
                aria-describedby="emailHelp"
            />
            <div class="invalid-feedback" :class="{ 'd-block': form.emailError }">
                {{ form.emailError }}
            </div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input
                type="password"
                class="form-control"
                v-model="form.password"
                aria-describedby="emailHelp"
            />
            <div class="invalid-feedback" :class="{ 'd-block': form.passwordError }">
                {{ form.passwordError }}
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';
import { initExampleForm } from '../form';

@Options({})
export default class ExampleComponent extends Vue {
    form = setup(() => initExampleForm());
}
</script>
