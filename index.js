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

  async function start() {
    window.__POWERED_BY_MICRO_TOY__ = true;
    
    const unMountPromise = [];
    const mountPromise = [];

    layer.apps.forEach(app => {
      const { isActive } = app;
      if (isActive() && !app.isMount) {
        mountPromise.push(() => app.mountApp());
      }
      if (!isActive() && app.isMount) {
        unMountPromise.push(() => app.unMountApp());
      }
    })

    await Promise.all(unMountPromise.map(fn => fn()));
    Promise.all(mountPromise.map(fn => fn()));
  }
  
  // 路由拦截
  const rawPushState = window.history.pushState;
  window.history.pushState = function (...rest) {
    rawPushState.apply(this, rest);
    layer.start();
  };

  return layer;
}