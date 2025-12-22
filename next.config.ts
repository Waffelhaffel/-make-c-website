import type { NextConfig } from "next";

// #region agent log
fetch('http://127.0.0.1:7243/ingest/cdd55c48-8f97-48da-958e-408c57b972dd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'next.config.ts:3',message:'Build initialization',data:{cwd:process.cwd(),nodeVersion:process.version},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
// #endregion

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
