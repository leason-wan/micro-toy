import { createApp } from './app.js';

export function createLayer() {

  function registerMicroApps(options) {
    options.forEach(opt => {
      layer.apps.push(createApp(opt));
    })
  }

  function start() {

  }

  const layer = {
    apps: [],
    registerMicroApps,
    start
  }
  return layer;
}