// 用户options
// name: 'react app',              // app名称
// entry: '//localhost:7100',      // 入口文件
// container: '#yourContainer',    // 挂载节点
// isActive: () => boolean         // 是否激活
// publicPath: '//localhost:7100'  // 公共路径

// 内部状态
// isMount: true | false           // 应用是否激活
// mounted: () => void            // 应用挂载的回调
// unmount: () => void            // 应用卸载的回调
// resetContainer                 // 重置容器DOM

// callhook
// mountApp
// unMountApp

import { createSandbox } from './sandbox/index.js';

export function createApp(options = {}) {
  isValidateOptions(options);
  const { name, publicPath, container, baseUrl } = options;

  const app = {
    isMount: false,
    resetContainer,
    mountApp,
    unMountApp,
    sandbox: createSandbox(),
    ...options,
    props: {
      ...options.props,
      isMicroToy: true,
      name,
      publicPath,
      container,
      baseUrl
    }
  }

  function resetContainer() {
    const { container } = app;
    container.innerHTML = '';
    const divEl = document.createElement('div');
    container.appendChild(divEl);
    app.props.container = divEl;
  }

  async function mountApp() {
    if (app.isMount) return;
    const { entry, name } = app;
    if (!app.mount) {
      const scripts = await Promise.all(entry.map(script => fetch(script)
        .then(res => res.text()))
      )
      scripts.forEach(script => {
        // eval(script);
        app.sandbox.run(script);
      })
      app.mount = app.sandbox.global[name].mount;
      app.unmount = app.sandbox.global[name].unmount;
      // const { mount, unmount } = window[name];
      // app.mount = mount;
      // app.unmount = unmount;
    }

    app.resetContainer();
    await app.mount(app.props);
    app.isMount = true;
  }

  async function unMountApp() {
    if (!app.unmount) return;
    app.resetContainer();
    await app.unmount(app.props);
    app.sandbox.stop();
    app.isMount = false;
    return true;
  }

  return app;
}

function isValidateOptions(options) {
  if (!options) throw new Error('[micro-toy] options is required');
  const key = ['name', 'entry', 'container'];
  key.forEach(k => {
    if (!options[k]) throw new Error(`[micro-toy] options.${k} is required`);
  })  
}
