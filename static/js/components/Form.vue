<template>
  <h1>Please sign up below for a new free account</h1>

  <form @submit.prevent="form.post($route('form'))">
    <div v-if="flash.alert.length" v-html="flash.alert.join('<br>')"></div>

    <label for="email">Email:</label>
    <input type="email" id="email" v-model="form.email" placeholder="email@example.com">
    <div v-if="form.errors.email">{{ form.errors.email }}</div>

    <label for="password">Password:</label>
    <input type="password" id="password" v-model="form.password" placeholder="secret">
    <div v-if="form.errors.password">{{ form.errors.password }}</div>

    <input type="file" @input="form.avatar = $event.target.files[0]" />
    <progress v-if="form.progress" :value="form.progress.percentage" max="100">
      {{ form.progress.percentage }}%
    </progress>

    <input type="checkbox" v-model="form.remember"> Remember Me

    <button type="submit" :disabled="form.processing">Login</button>
  </form>
</template>

<script>
import { useForm } from '@inertiajs/inertia-vue3'

export default {
  props: {
    flash: {
      type: Object,
      required: true,
    },
  },

  setup () {
    const form = useForm({
      email: null,
      password: null,
      avatar: null,
      remember: false,
    })

    return { form };
  },
}
</script>
