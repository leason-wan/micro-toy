const rawWindow = window;

function exeCode(code, sandbox) {
  window.__MICRO_TOY_CONTEXT__ = sandbox.global;
  const _code = `;(function(window, self) {
    with(window) {
      ${code}
    }
  }).call(window.__MICRO_TOY_CONTEXT__, window.__MICRO_TOY_CONTEXT__, window.__MICRO_TOY_CONTEXT__);`

  // 规避with严格模式的问题。 new Funciton -- vuejs template complier
  try {
    (0, eval)(_code);
    sandbox.isRun = true;
  } catch (error) {
    console.error(`[micro-toy sandbox] ${error}`);
  }
  
}

export function createSandbox() {
  const fakeWindow = {};
  
  const sandbox = {
    global: {},
    run,           // script run window inject
    stop,
    isRun: false
  };

  function run (code) {
    // 访问fakeWindow的属性, 没有的话，从全局window取。
    // 设置fakeWindow的属性，设置到fakewindow上。
    sandbox.global = new Proxy(fakeWindow, {
      get(target, key) {
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key);
        }

        const rawValue = Reflect.get(rawWindow, key);

        // console alert
        if (typeof rawValue === 'function') {
          const valueStr = rawValue.toString();
          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(rawWindow);
          }
        }

        return rawValue;
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      }
    })
    exeCode(code, sandbox);
  }

  function stop() {
    sandbox.isRun = false;
  }

  return sandbox;
}
