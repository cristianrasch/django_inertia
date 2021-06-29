<template>
  <inertia-head>
    <title head-key="title">Endpoint '{{ endpoint }}'</title>
  </inertia-head>

  <h1>{{ msg }}</h1>
  <h3>
    The time is now:
    <span class="clock">
      {{ formattedTime }}
    </span>
  </h3>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePage } from '@inertiajs/inertia-vue3'

export default {
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { component, version } = usePage();
    console.log(new Date().getTime(), 'COMPONENT:', component.value, '- VERSION:', version.value);

    let time = ref(new Date().getTime());
    let intervalID = ref(null);

    const formattedTime = computed(() => new Date(time.value).toLocaleString());

    onMounted(() => {
      intervalID = setInterval(() => time.value += 1_000, 1_000);
    });

    onUnmounted(() => intervalID.value && clearInterval(intervalID.value));

    return {
      time,
      intervalID,
      formattedTime,
    };
  },
};
</script>

<style scoped>
  .clock {
    color: green;
  }
</style>
