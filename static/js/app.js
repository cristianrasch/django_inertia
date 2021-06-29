import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';

import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

import Layout from './components/Layout';
import '../css/app.css';

createInertiaApp({
  page: JSON.parse(document.getElementById('page').textContent),
  resolve: (name) => {
    const page = require(`./components/${name}`).default;
    page.layout = page.layout || Layout;
    return page;
  },
  // resolve: (name) => require(`./components/${name}`),
  setup({ el, app, props, plugin }) {
    const application = createApp({ render: () => h(app, props) }).use(plugin);
    application.config.globalProperties.$route = window.reverseUrl;
    application.mount(el);
  },
});
