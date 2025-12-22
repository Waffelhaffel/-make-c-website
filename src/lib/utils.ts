// #region agent log
fetch('http://127.0.0.1:7243/ingest/cdd55c48-8f97-48da-958e-408c57b972dd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/lib/utils.ts:1',message:'Utils loaded',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
// #endregion

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

