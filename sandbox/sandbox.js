import { corePlugin } from "./plugins/index.js";

function exeCode(code, sandbox) {
  window.SANDBOX_GLOBAL_CONTEXT = sandbox.global;
  const _code = `;(function(window, self){
    with(window) {
      ${code}
    }
  }).call(window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT);`;;

  try {
    (0, eval)(_code);
    sandbox.isRun = true;
  } catch (error) {
    console.error(`[sandbox runtime error]: ${error}`);
  }
}

function createSandbox(plugins = []) {
  const sandbox = {
    isRun: false
  };
  const rawWindow = window;
  const fakeWindow = Object.create(null);
  plugins = [corePlugin, ...plugins];

  sandbox.run = function run(code) {
    // 处理变量状态
    sandbox.global = new Proxy(fakeWindow, {
      get(target, key) {
        // 优先从代理对象上取值
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key)
        }

        // 否则兜底到全局window对象上取值
        const rawValue = Reflect.get(rawWindow, key)

        // 如果兜底的值为函数，则需要绑定window对象，如：console、alert等
        if (typeof rawValue === 'function') {
          const valueStr = rawValue.toString()
          // 排除构造函数
          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(rawWindow)
          }
        }

        // 其它情况直接返回
        return rawValue
      },
      set(target, property, value) {
        target[property] = value;
        return true;
      },
    });

    plugins.forEach((plugin) => {
      const { beforeStart } = plugin;
      beforeStart(sandbox.global);
    })
    exeCode(code, sandbox);
  }

  sandbox.stop = function destory() {
    plugins.forEach((plugin) => {
      const { beforeStop } = plugin;
      beforeStop(sandbox.global);
    })
    sandbox.isRun = false;
  }

  sandbox.destory = function destory() {
    if (sandbox.isRun) {
      sandbox.stop();
    }
    sandbox.global = {};
  }

  return sandbox;
}

export { createSandbox };
