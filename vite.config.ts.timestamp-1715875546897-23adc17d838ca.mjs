// vite.config.ts
import react from "file:///D:/Projects/JavascriptProjects/dimstack-apps/dimstack-app-write/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///D:/Projects/JavascriptProjects/dimstack-apps/dimstack-app-write/node_modules/vite/dist/node/index.js";

// package.json
var dependencies = {
  "@chakra-ui/icons": "^2.1.0",
  "@chakra-ui/react": "^2.8.0",
  "@emotion/css": "^11.11.2",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "@reduxjs/toolkit": "^1.9.5",
  classnames: "^2.5.1",
  "framer-motion": "^10.16.1",
  history: "^5.3.0",
  "js-base64": "^3.7.5",
  lodash: "^4.17.21",
  "path-browserify": "^1.0.1",
  "pouchdb-browser": "^8.0.1",
  react: "^18.2.0",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "react-dnd-touch-backend": "^16.0.1",
  "react-dom": "^18.2.0",
  "react-error-boundary": "^4.0.11",
  "react-icons": "^4.10.1",
  "react-redux": "^8.1.2",
  redaxios: "^0.5.1",
  "redux-persist": "^6.0.0",
  "redux-persist-pouchdb": "^0.2.1",
  rxjs: "^7.8.1",
  "simplebar-react": "^3.2.4",
  systemjs: "^6.14.2",
  tinykeys: "^2.1.0",
  "usehooks-ts": "^2.9.1"
};

// splitChunks.ts
var strategy = [
  {
    match: [
      /^react$/,
      /^react-dom$/,
      /^react-router-dom$/,
      /^react-redux$/,
      /^@reduxjs/
    ],
    name: "vendor"
  },
  {
    match: [/^@chakra-ui/, /^@emotion/, /^framer-motion/],
    name: "chakra-ui"
  },
  {
    match: [/react-icons/, /usehooks-ts/],
    name: "react-utils"
  },
  {
    match: [/fuse.js/, /history/, /nanoid/],
    name: "common-utils"
  },
  {
    match: [
      /remark-gfm/,
      /remark-math/,
      /remark/,
      /react-syntax-highlighter/,
      /rehype-katex/,
      /rehype/,
      /react-markdown/,
      /device-detector-js/,
      /crisp-sdk-web/,
      /@cloudbase\/js-sdk/,
      /recharts/
    ],
    name: (file) => {
      return file;
    }
  }
];
var renderChunksWithStrategy = (deps) => {
  deps = Object.keys(deps).filter((dep) => !dep.startsWith("@types"));
  const chunks = {};
  const match = (ptns, s) => {
    const matchOne = (ptn, s2) => {
      if (typeof ptn === "string")
        ptn = new RegExp("^" + ptn + "$");
      return ptn.test(s2);
    };
    if (!Array.isArray(ptns))
      ptns = [ptns];
    for (let i = 0; i < ptns.length; i++) {
      if (matchOne(ptns[i], s))
        return true;
    }
    return false;
  };
  for (let i = 0; i < deps.length; i++) {
    const dep = deps[i];
    for (let j = 0; j < strategy.length; j++) {
      const rule = strategy[j];
      if (match(rule.match, dep)) {
        const name = typeof rule.name === "function" ? rule.name(dep) : rule.name;
        if (!(name in chunks))
          chunks[name] = [];
        chunks[name].push(dep);
        break;
      }
    }
  }
  console.log("chunks:", chunks);
  return chunks;
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\Projects\\JavascriptProjects\\dimstack-apps\\dimstack-app-write";
console.log("dependencies", dependencies);
var vite_config_default = defineConfig({
  base: "/",
  plugins: [
    react()
    // eslint()
  ],
  define: {
    global: "window"
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "src")
      },
      {
        find: "xbook",
        replacement: resolve(__vite_injected_original_dirname, "src/xbook")
      },
      {
        find: "libs",
        replacement: resolve(__vite_injected_original_dirname, "libs")
      }
    ]
  },
  build: {
    outDir: "dist/",
    rollupOptions: {
      input: {
        app: "index.html"
      },
      output: {
        manualChunks: renderChunksWithStrategy(dependencies)
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNwbGl0Q2h1bmtzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcSmF2YXNjcmlwdFByb2plY3RzXFxcXGRpbXN0YWNrLWFwcHNcXFxcZGltc3RhY2stYXBwLXdyaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxKYXZhc2NyaXB0UHJvamVjdHNcXFxcZGltc3RhY2stYXBwc1xcXFxkaW1zdGFjay1hcHAtd3JpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL0phdmFzY3JpcHRQcm9qZWN0cy9kaW1zdGFjay1hcHBzL2RpbXN0YWNrLWFwcC13cml0ZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGRlcGVuZGVuY2llcyB9IGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IHsgcmVuZGVyQ2h1bmtzV2l0aFN0cmF0ZWd5IH0gZnJvbSBcIi4vc3BsaXRDaHVua3NcIjtcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JztcblxuXG5jb25zb2xlLmxvZyhcImRlcGVuZGVuY2llc1wiLCBkZXBlbmRlbmNpZXMpO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogXCIvXCIsXG4gIHBsdWdpbnM6IFtyZWFjdCgpLFxuICAgIC8vIGVzbGludCgpXG4gIF0sXG5cbiAgZGVmaW5lOiB7XG4gICAgZ2xvYmFsOiBcIndpbmRvd1wiLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogXCJAXCIsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiBcInhib29rXCIsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMveGJvb2tcIiksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiBcImxpYnNcIixcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcImxpYnNcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3QvXCIsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgYXBwOiBcImluZGV4Lmh0bWxcIixcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiByZW5kZXJDaHVua3NXaXRoU3RyYXRlZ3koZGVwZW5kZW5jaWVzKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwiZGltc3RhY2stYXBwLXdyaXRlXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInZlcnNpb25cIjogXCIwLjAuMFwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkXCI6IFwidHNjICYmIHZpdGUgYnVpbGRcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJnaXQ6dXBkYXRlXCI6IFwiZ2l0IGFkZCAuICYmIGdpdCBjb21taXQgLW0gXFxcIiB1cGRhdGUgc29tdGhpbmcgXFxcIiAmJiAgZ2l0IHB1c2hcIixcbiAgICBcImRlcGxveVwiOiBcInlhcm4gYnVpbGQgJiYgeWFybiBvc3M6dXBsb2FkXCIsXG4gICAgXCJ1cGRhdGVcIjogXCJ5YXJuIGRlcGxveSAmJiB5YXJuIGdpdDp1cGRhdGVcIixcbiAgICBcIm9zczp1cGxvYWRcIjogXCJvc3N1dGlsNjQgY3AgLXIgLXUgZGlzdC8gb3NzOi8vd3JpdGUtZGltc3RhY2stY29tLyAtYyAuLy5vc3N1dGlsY29uZmlnLmxvY2FsXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNoYWtyYS11aS9pY29uc1wiOiBcIl4yLjEuMFwiLFxuICAgIFwiQGNoYWtyYS11aS9yZWFjdFwiOiBcIl4yLjguMFwiLFxuICAgIFwiQGVtb3Rpb24vY3NzXCI6IFwiXjExLjExLjJcIixcbiAgICBcIkBlbW90aW9uL3JlYWN0XCI6IFwiXjExLjExLjFcIixcbiAgICBcIkBlbW90aW9uL3N0eWxlZFwiOiBcIl4xMS4xMS4wXCIsXG4gICAgXCJAcmVkdXhqcy90b29sa2l0XCI6IFwiXjEuOS41XCIsXG4gICAgXCJjbGFzc25hbWVzXCI6IFwiXjIuNS4xXCIsXG4gICAgXCJmcmFtZXItbW90aW9uXCI6IFwiXjEwLjE2LjFcIixcbiAgICBcImhpc3RvcnlcIjogXCJeNS4zLjBcIixcbiAgICBcImpzLWJhc2U2NFwiOiBcIl4zLjcuNVwiLFxuICAgIFwibG9kYXNoXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcInBhdGgtYnJvd3NlcmlmeVwiOiBcIl4xLjAuMVwiLFxuICAgIFwicG91Y2hkYi1icm93c2VyXCI6IFwiXjguMC4xXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRuZFwiOiBcIl4xNi4wLjFcIixcbiAgICBcInJlYWN0LWRuZC1odG1sNS1iYWNrZW5kXCI6IFwiXjE2LjAuMVwiLFxuICAgIFwicmVhY3QtZG5kLXRvdWNoLWJhY2tlbmRcIjogXCJeMTYuMC4xXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1lcnJvci1ib3VuZGFyeVwiOiBcIl40LjAuMTFcIixcbiAgICBcInJlYWN0LWljb25zXCI6IFwiXjQuMTAuMVwiLFxuICAgIFwicmVhY3QtcmVkdXhcIjogXCJeOC4xLjJcIixcbiAgICBcInJlZGF4aW9zXCI6IFwiXjAuNS4xXCIsXG4gICAgXCJyZWR1eC1wZXJzaXN0XCI6IFwiXjYuMC4wXCIsXG4gICAgXCJyZWR1eC1wZXJzaXN0LXBvdWNoZGJcIjogXCJeMC4yLjFcIixcbiAgICBcInJ4anNcIjogXCJeNy44LjFcIixcbiAgICBcInNpbXBsZWJhci1yZWFjdFwiOiBcIl4zLjIuNFwiLFxuICAgIFwic3lzdGVtanNcIjogXCJeNi4xNC4yXCIsXG4gICAgXCJ0aW55a2V5c1wiOiBcIl4yLjEuMFwiLFxuICAgIFwidXNlaG9va3MtdHNcIjogXCJeMi45LjFcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC41LjZcIixcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjBcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjE1XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuN1wiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4wLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNi4wLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMC4zXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC40NS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjogXCJeMC40LjNcIixcbiAgICBcInNhc3NcIjogXCJeMS42Ni4xXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMC4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC41XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjogXCJeMS44LjFcIixcbiAgICBcInZzY29kZVwiOiBcIl4xLjEuMzdcIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFByb2plY3RzXFxcXEphdmFzY3JpcHRQcm9qZWN0c1xcXFxkaW1zdGFjay1hcHBzXFxcXGRpbXN0YWNrLWFwcC13cml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcSmF2YXNjcmlwdFByb2plY3RzXFxcXGRpbXN0YWNrLWFwcHNcXFxcZGltc3RhY2stYXBwLXdyaXRlXFxcXHNwbGl0Q2h1bmtzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9KYXZhc2NyaXB0UHJvamVjdHMvZGltc3RhY2stYXBwcy9kaW1zdGFjay1hcHAtd3JpdGUvc3BsaXRDaHVua3MudHNcIjtpbnRlcmZhY2UgU3BsaXRDaHVua1N0cmF0ZWd5SXRlbSB7XHJcbiAgbWF0Y2g6IHN0cmluZyB8IFJlZ0V4cCB8IChzdHJpbmcgfCBSZWdFeHApW107XHJcbiAgbmFtZTogc3RyaW5nIHwgKChzOiBzdHJpbmcpID0+IHN0cmluZyk7XHJcbn1cclxudHlwZSBTcGxpdENodW5rU3RyYXRlZ3kgPSBTcGxpdENodW5rU3RyYXRlZ3lJdGVtW107XHJcbmV4cG9ydCBjb25zdCBzdHJhdGVneTogU3BsaXRDaHVua1N0cmF0ZWd5ID0gW1xyXG4gIHtcclxuICAgIG1hdGNoOiBbXHJcbiAgICAgIC9ecmVhY3QkLyxcclxuICAgICAgL15yZWFjdC1kb20kLyxcclxuICAgICAgL15yZWFjdC1yb3V0ZXItZG9tJC8sXHJcbiAgICAgIC9ecmVhY3QtcmVkdXgkLyxcclxuICAgICAgL15AcmVkdXhqcy8sXHJcbiAgICBdLFxyXG4gICAgbmFtZTogXCJ2ZW5kb3JcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG1hdGNoOiBbL15AY2hha3JhLXVpLywgL15AZW1vdGlvbi8sIC9eZnJhbWVyLW1vdGlvbi9dLFxyXG4gICAgbmFtZTogXCJjaGFrcmEtdWlcIixcclxuICB9LFxyXG4gIHtcclxuICAgIG1hdGNoOiBbL3JlYWN0LWljb25zLywgL3VzZWhvb2tzLXRzL10sXHJcbiAgICBuYW1lOiBcInJlYWN0LXV0aWxzXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBtYXRjaDogWy9mdXNlLmpzLywgL2hpc3RvcnkvLCAvbmFub2lkL10sXHJcbiAgICBuYW1lOiBcImNvbW1vbi11dGlsc1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbWF0Y2g6IFtcclxuICAgICAgL3JlbWFyay1nZm0vLFxyXG4gICAgICAvcmVtYXJrLW1hdGgvLFxyXG4gICAgICAvcmVtYXJrLyxcclxuICAgICAgL3JlYWN0LXN5bnRheC1oaWdobGlnaHRlci8sXHJcbiAgICAgIC9yZWh5cGUta2F0ZXgvLFxyXG4gICAgICAvcmVoeXBlLyxcclxuICAgICAgL3JlYWN0LW1hcmtkb3duLyxcclxuICAgICAgL2RldmljZS1kZXRlY3Rvci1qcy8sXHJcbiAgICAgIC9jcmlzcC1zZGstd2ViLyxcclxuICAgICAgL0BjbG91ZGJhc2VcXC9qcy1zZGsvLFxyXG4gICAgICAvcmVjaGFydHMvLFxyXG4gICAgXSxcclxuICAgIG5hbWU6IChmaWxlKSA9PiB7XHJcbiAgICAgIHJldHVybiBmaWxlO1xyXG4gICAgfSxcclxuICB9LFxyXG5dO1xyXG5leHBvcnQgY29uc3QgcmVuZGVyQ2h1bmtzV2l0aFN0cmF0ZWd5ID0gKGRlcHMpID0+IHtcclxuICBkZXBzID0gT2JqZWN0LmtleXMoZGVwcykuZmlsdGVyKChkZXApID0+ICFkZXAuc3RhcnRzV2l0aChcIkB0eXBlc1wiKSk7XHJcbiAgY29uc3QgY2h1bmtzID0ge307XHJcbiAgY29uc3QgbWF0Y2ggPSAocHRuczogc3RyaW5nIHwgUmVnRXhwIHwgKHN0cmluZyB8IFJlZ0V4cClbXSwgczogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBtYXRjaE9uZSA9IChwdG46IHN0cmluZyB8IFJlZ0V4cCwgcykgPT4ge1xyXG4gICAgICBpZiAodHlwZW9mIHB0biA9PT0gXCJzdHJpbmdcIikgcHRuID0gbmV3IFJlZ0V4cChcIl5cIiArIHB0biArIFwiJFwiKTtcclxuICAgICAgcmV0dXJuIHB0bi50ZXN0KHMpO1xyXG4gICAgfTtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShwdG5zKSkgcHRucyA9IFtwdG5zXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHRucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAobWF0Y2hPbmUocHRuc1tpXSwgcykpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZGVwID0gZGVwc1tpXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgc3RyYXRlZ3kubGVuZ3RoOyBqKyspIHtcclxuICAgICAgY29uc3QgcnVsZSA9IHN0cmF0ZWd5W2pdO1xyXG4gICAgICBpZiAobWF0Y2gocnVsZS5tYXRjaCwgZGVwKSkge1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPVxyXG4gICAgICAgICAgdHlwZW9mIHJ1bGUubmFtZSA9PT0gXCJmdW5jdGlvblwiID8gcnVsZS5uYW1lKGRlcCkgOiBydWxlLm5hbWU7XHJcbiAgICAgICAgaWYgKCEobmFtZSBpbiBjaHVua3MpKSBjaHVua3NbbmFtZV0gPSBbXTtcclxuICAgICAgICBjaHVua3NbbmFtZV0ucHVzaChkZXApO1xyXG4gICAgICAgIGJyZWFrOyAvL3N0b3AgbWF0Y2hpbmdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjb25zb2xlLmxvZyhcImNodW5rczpcIiwgY2h1bmtzKTtcclxuICByZXR1cm4gY2h1bmtzO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlYLE9BQU8sV0FBVztBQUMzWSxTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7OztBQ2EzQixtQkFBZ0I7QUFBQSxFQUNkLG9CQUFvQjtBQUFBLEVBQ3BCLG9CQUFvQjtBQUFBLEVBQ3BCLGdCQUFnQjtBQUFBLEVBQ2hCLGtCQUFrQjtBQUFBLEVBQ2xCLG1CQUFtQjtBQUFBLEVBQ25CLG9CQUFvQjtBQUFBLEVBQ3BCLFlBQWM7QUFBQSxFQUNkLGlCQUFpQjtBQUFBLEVBQ2pCLFNBQVc7QUFBQSxFQUNYLGFBQWE7QUFBQSxFQUNiLFFBQVU7QUFBQSxFQUNWLG1CQUFtQjtBQUFBLEVBQ25CLG1CQUFtQjtBQUFBLEVBQ25CLE9BQVM7QUFBQSxFQUNULGFBQWE7QUFBQSxFQUNiLDJCQUEyQjtBQUFBLEVBQzNCLDJCQUEyQjtBQUFBLEVBQzNCLGFBQWE7QUFBQSxFQUNiLHdCQUF3QjtBQUFBLEVBQ3hCLGVBQWU7QUFBQSxFQUNmLGVBQWU7QUFBQSxFQUNmLFVBQVk7QUFBQSxFQUNaLGlCQUFpQjtBQUFBLEVBQ2pCLHlCQUF5QjtBQUFBLEVBQ3pCLE1BQVE7QUFBQSxFQUNSLG1CQUFtQjtBQUFBLEVBQ25CLFVBQVk7QUFBQSxFQUNaLFVBQVk7QUFBQSxFQUNaLGVBQWU7QUFDakI7OztBQ3hDSyxJQUFNLFdBQStCO0FBQUEsRUFDMUM7QUFBQSxJQUNFLE9BQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0Us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
