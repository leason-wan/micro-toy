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

export function createApp(options = {}) {
  isValidateOptions(options);
  const { name, publicPath, container, baseUrl } = options;

  const app = {
    isMount: false,
    resetContainer,
    ...options,
    props: {
      ...options.props,
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

  return app;
}

function isValidateOptions(options) {
  if (!options) throw new Error('[micro-toy] options is required');
  const key = ['name', 'entry', 'container'];
  key.forEach(k => {
    if (!options[k]) throw new Error(`[micro-toy] options.${k} is required`);
  })  
}
