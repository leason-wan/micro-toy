import { createApp } from './app.js';

export function createLayer() {

  const layer = {
    apps: [],
    registerMicroApps,
    start
  }

  function registerMicroApps(options) {
    options.forEach(opt => {
      layer.apps.push(createApp(opt));
    })
    layer.start();
  }

  async function runMount(app) {
    if (app.isMount) return;
    const { entry, name } = app;
    if (!app.mount) {
      const scripts = await Promise.all(entry.map(script => fetch(script)
        .then(res => res.text()))
      )
      scripts.forEach(script => {
        eval(script);
      })
      const { mount, unmount } = window[name];
      app.mount = mount;
      app.unmount = unmount;
    }

    app.resetContainer();
    await app.mount(app.props);
    app.isMount = true;
  }

  async function runUnMount(app) {
    if (!app.unmount) return;
    app.resetContainer();
    await app.unmount(app.props);
    app.isMount = false;
  }

  function start() {
    window.__POWERED_BY_MICRO_TOY__ = true;
    layer.apps.forEach(async app => {
      const { isActive } = app;
      if (!isActive()) {
        await runUnMount(app);
      } else {
        await runMount(app);
      }
    })
  }
  
  // 路由拦截
  const rawPushState = window.history.pushState;
  window.history.pushState = function () {
    rawPushState.apply(this, arguments);
    layer.start();
  };

  return layer;
}