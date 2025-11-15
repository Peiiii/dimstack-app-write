interface SplitChunkStrategyItem {
  match: string | RegExp | (string | RegExp)[];
  name: string | ((s: string) => string);
}
type SplitChunkStrategy = SplitChunkStrategyItem[];
export const strategy: SplitChunkStrategy = [
  // Split Monaco into its own chunk to keep app chunk smaller
  {
    match: [/^monaco-editor$/],
    name: "monaco",
  },
  {
    match: [
      /^react$/,
      /^react-dom$/,
      /^react-router-dom$/,
      /^react-redux$/,
      /^@reduxjs/,
    ],
    name: "vendor",
  },
  {
    match: [/^@chakra-ui/, /^@emotion/, /^framer-motion/],
    name: "chakra-ui",
  },
  {
    match: [/react-icons/, /usehooks-ts/],
    name: "react-utils",
  },
  {
    match: [/fuse.js/, /history/, /nanoid/],
    name: "common-utils",
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
      /recharts/,
    ],
    name: (file) => {
      return file;
    },
  },
];
export const renderChunksWithStrategy = (deps) => {
  deps = Object.keys(deps).filter((dep) => !dep.startsWith("@types"));
  const chunks = {};
  const match = (ptns: string | RegExp | (string | RegExp)[], s: string) => {
    const matchOne = (ptn: string | RegExp, s) => {
      if (typeof ptn === "string") ptn = new RegExp("^" + ptn + "$");
      return ptn.test(s);
    };
    if (!Array.isArray(ptns)) ptns = [ptns];
    for (let i = 0; i < ptns.length; i++) {
      if (matchOne(ptns[i], s)) return true;
    }
    return false;
  };

  for (let i = 0; i < deps.length; i++) {
    const dep = deps[i];
    for (let j = 0; j < strategy.length; j++) {
      const rule = strategy[j];
      if (match(rule.match, dep)) {
        const name =
          typeof rule.name === "function" ? rule.name(dep) : rule.name;
        if (!(name in chunks)) chunks[name] = [];
        chunks[name].push(dep);
        break; //stop matching
      }
    }
  }
  console.log("chunks:", chunks);
  return chunks;
};
