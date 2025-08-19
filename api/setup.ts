import fetch, { Headers } from 'cross-fetch';

declare global {
  // expose fetch and Headers for Vitest in Node environment
  // eslint-disable-next-line no-var
  var fetch: typeof fetch;
  // eslint-disable-next-line no-var
  var Headers: typeof Headers;
}

global.fetch = fetch as any;
global.Headers = Headers as any;
