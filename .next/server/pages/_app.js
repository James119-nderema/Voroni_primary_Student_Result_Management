const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/pages__app_jsx_ab64a88c._.js");
runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.jsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.jsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
