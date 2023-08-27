import { AnyArgs, AnyFunction } from "xbook/common/types";
import { logService } from "xbook/services/logService";
export const CommandManager = {
  create: () => {
    let enableLogging = false;
    const map: Map<string, AnyFunction> = new Map();
    const taskQueueMap: { [command: string]: AnyFunction[] } = new Proxy(
      {},
      {
        get(target, p) {
          if (typeof target[p] === "undefined") {
            target[p] = [];
          }
          return target[p];
        },
      }
    );
    const registerCommandSingle = (name: string, runner: AnyFunction) => {
      map.set(name, runner);
      [...taskQueueMap[name]].forEach((task) => {
        task();
        const idx = taskQueueMap[name].indexOf(task);
        taskQueueMap[name].splice(idx, 1);
      });
    };
    const registerCommandWithScope = (
      scope,
      name: string | { [n: string]: AnyFunction },
      runner?: AnyFunction
    ) => {
      if (typeof name === "string") {
        registerCommandSingle(`${scope}.${name}`, runner!);
      } else {
        for (const key in name) {
          registerCommandSingle(`${scope}.${key}`, name[key]);
        }
      }
    };
    const registerCommand = (
      name: string | { [n: string]: AnyFunction },
      runner?: AnyFunction
    ) => {
      if (typeof name === "string") {
        registerCommandSingle(name, runner!);
      } else {
        for (const key in name) {
          registerCommandSingle(key, name[key]);
        }
      }
    };
    const hasCommand = (name: string) => {
      return map.has(name);
    };
    const executeCommand = (name: string, ...args) => {
      return new Promise((resolve, reject) => {
        if (enableLogging) {
          logService.info(`execute ${name}: ${JSON.stringify(args)}`);
        }
        const runner = map.get(name);
        if (!runner) {
          logService.error("No command named '" + name);
          reject(new Error("No command named '" + name));
        } else {
          try {
            const result = runner!(...args);
            resolve(result);
          } catch (e) {
            logService.error(`when executing : ${name}, ${e}`);
            reject(e);
          }
        }
      });
    };

    const onCommandReady = (command: string, task: AnyFunction) => {
      hasCommand(command) ? task() : taskQueueMap[command].push(task);
    };
    const executeCommandOnReady = (command: string, ...args: AnyArgs) => {
      return new Promise((resolve, reject) => {
        onCommandReady(command, () => {
          executeCommand(command, ...args)
            .then(resolve)
            .catch(reject);
        });
      });
    };
    return {
      registerCommand,
      executeCommand,
      hasCommand,
      onCommandReady,
      executeCommandOnReady,
      registerCommandWithScope,
      enableLogging: () => (enableLogging = true),
      disableLogging: () => (enableLogging = false),
    };
  },
};
export const commandService = CommandManager.create();
