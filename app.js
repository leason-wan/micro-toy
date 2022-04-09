// 用户options
// name: 'react app',              // app名称
// entry: '//localhost:7100',      // 入口文件
// container: '#yourContainer',    // 挂载节点

// 内部状态
// status: beforeCreate | beforeMounte | mounted // 应用的状态
// isActive: true | false           // 应用是否激活

export function createApp(options = {}) {
  isValidateOptions(options);
  // const {name, entry, container} = options;
  const app = {
    status: 'beforeCreate',
    isActive: false,
    ...options,
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
