import Vue from 'vue'
import App from './App.vue'
import { routes } from './router'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

let instance = null;

function render(props = {}) {
  const { container, publicPath, baseUrl } = props;
  const router = new VueRouter({
    mode: 'history',
    base: baseUrl || process.env.BASE_URL,
    routes
  })
  // eslint-disable-next-line
  publicPath && (__webpack_public_path__ = publicPath);
  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount(container || '#app');
}

if (!window.__POWERED_BY_MICRO_TOY__) {
  render();
}

export async function mount(props) {
  console.log('vue app mounted');
  render(props);
}

export async function unmount() {
  instance.$destroy();
  // instance.$el.innerHTML = '';
  instance = null;
  console.log('vue app unmount');
}
