import {
  GiteeClient,
  createGiteeClient,
  refreshGiteeAccessToken,
} from "./gitee-client";
const wrapPromise = (func) => {
  return (...args) => {
    return new Promise((resolve: Function, reject) => {
      func(...args, (err, ...rest) => {
        if (!err) resolve(...rest);
        else reject(err);
      });
    });
  };
};

const buildGiteeFS = ({
  owner,
  repo,
  client,
}: {
  owner: string;
  repo: string;
  client: GiteeClient;
}) => {
  let File = client.File;
  const mkdir = (path, callback) => {
    if (!path.endsWith("/")) path += "/";
    const keepFile = path + ".keep";
    File.add({ owner, repo, path: keepFile, content: "placeholder" })
      .then(() => {
        callback(null);
      })
      .catch(callback);
  };

  const readdir = (path, callback) => {
    File.getInfo({ owner, repo, path })
      .then((r) => {
        callback(
          null,
          r.data.map((file) => file.name)
        );
      })
      .catch(callback);
  };
  const rmdir = (path: string, callback) => {
    if (!path.endsWith("/")) path += "/";
    File.getInfo({ owner, repo, path }).then((r) => {
      let files = [...r.data];
      const consumer = () => {
        if (files.length > 0) {
          let file = files[0];
          files = files.slice(1);
          File.delete({ owner, repo, path: file.path, sha: file.sha })
            .then(consumer)
            .catch(callback);
        } else {
          callback(null);
        }
      };
      consumer();
    });
  };
  const rename = (oldPath: string, newPath: string, callback) => {
    File.get({ owner, repo, path: oldPath })
      .then((r) => r.data)
      .then((file) => {
        if (Array.isArray(file)) {
          if (file.length === 0) {
            callback(new Error("Found not found:" + oldPath));
          } else {
            callback(
              new Error("Renaming of directory is not supported currently.")
            );
          }
        } else {
          File.add({ owner, repo, path: newPath, content: file.content })
            .then(() => {
              File.delete({ owner, repo, path: oldPath, sha: file.sha })
                .then(() => {
                  callback(null);
                })
                .catch(callback);
            })
            .catch(callback);
        }
      })
      .catch(callback);
  };
  const existsFile = async (path: string, callback) => {
    File.getInfo({ owner, repo, path })
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length === 0) callback(false);
        else callback(true);
      })
      .catch(() => callback(false));
  };
  const exists = (path: string, callback) => {
    existsFile(path, (e) => {
      if (e) callback(true);
      else {
        if (path.endsWith("/")) path += "/";
        path += ".keep";
        existsFile(path, (e) => {
          if (e) callback(true);
          callback(false);
        });
      }
    });
  };
  const writeFile = (path: string, data: string, callback) => {
    existsFile(path, (e) => {
      if (e) {
        File.update({ owner, repo, path, content: data })
          .then(() => callback(null))
          .catch(callback);
      } else {
        File.add({ owner, repo, path, content: data })
          .then(() => callback(null))
          .catch(callback);
      }
    }).catch(callback);
  };
  const readFile = (path: string, ...args) => {
    let encoding, callback;
    if (args.length === 1) callback = args[0];
    else [encoding, callback] = args.slice(0, 2);
    File.get({ owner, repo, path })
      .then((file) => {
        let content;
        if (encoding) {
          console.assert(encoding === "utf8" || encoding === "utf-8");
          content = file.data.content;
        } else {
          content = file.data.uint8array;
        }
        return callback(null, content);
      })
      .catch(callback);
  };
  class Stats {
    info: any;
    constructor(info) {
      this.info = info;
      if (this.isFile()) {
        Object.assign(this, info);
      }
    }
    isDirectory() {
      return Array.isArray(this.info) && this.info.length !== 0;
    }
    isFile() {
      return this.info.type === "file";
    }
  }

  const stat = (path: string, callback) => {
    File.getInfo({ owner, repo, path })
      .then((file) => {
        const stats = new Stats(file.data);
        return callback(null, stats);
      })
      .catch(callback);
  };
  const unlink = (path: string, callback) => {
    File.delete({ owner, repo, path })
      .then(() => callback(null))
      .catch(callback);
  };
  const fsPromises = {
    mkdir: wrapPromise(mkdir),
    rmdir: wrapPromise(rmdir),
    rename: wrapPromise(rename),
    readdir: wrapPromise(readdir),
    writeFile: wrapPromise(writeFile),
    unlink: wrapPromise(unlink),
    readFile: wrapPromise(readFile),
    stat: wrapPromise(stat),
    // exists: async (path:string)=>{
    //   return new Promise((resolve, reject) =>{
    //     exists(path,(e)=>{
    //       if(e)resolve(path);
    //       else reject(path);
    //     })
    //   })
    // },
  };
  const fs = {
    mkdir,
    rmdir,
    rename,
    readdir,
    writeFile,
    unlink,
    readFile,
    stat,
    exists,
  };
  return {
    fs,
    fsPromises,
  };
};

interface AuthInfo {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  created_at: number;
  scope: string;
}

export const createGiteeFS = async ({
  accessToken,
  owner,
  repo,
  refreshToken,
}) => {
  if (refreshGiteeAccessToken) {
    accessToken = await refreshGiteeAccessToken({ refreshToken });
  }
  const client = createGiteeClient({ accessToken });
  const handle = buildGiteeFS({ client, owner, repo });
  return handle;
};

export type GiteeFS = Parameters<
  Exclude<
    Parameters<ReturnType<typeof createGiteeFS>["then"]>[0],
    undefined | null
  >
>[0];

export const validateFS = async (fs: GiteeFS) => {
  let isValid;
  try {
    let files = await fs.fsPromises.readdir("/");
    isValid = true;
    console.log("Validating GiteeFS successfully.");
  } catch (e) {
    isValid = false;
    console.log(
      "Validating GiteeFS failed: " + (e instanceof Error ? e.message : e)
    );
  }
  return isValid;
};
