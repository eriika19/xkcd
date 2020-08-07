try {
  self['workbox:core:5.1.3'] && _();
} catch (e) {}
const e = (e, ...t) => {
  let s = e;
  return t.length > 0 && (s += ' :: ' + JSON.stringify(t)), s;
};
class t extends Error {
  constructor(t, s) {
    super(e(t, s)), (this.name = t), (this.details = s);
  }
}
try {
  self['workbox:routing:5.1.3'] && _();
} catch (e) {}
const s = e => (e && 'object' == typeof e ? e : { handle: e });
class n {
  constructor(e, t, n = 'GET') {
    (this.handler = s(t)), (this.match = e), (this.method = n);
  }
}
class i extends n {
  constructor(e, t, s) {
    super(
      ({ url: t }) => {
        const s = e.exec(t.href);
        if (s && (t.origin === location.origin || 0 === s.index)) return s.slice(1);
      },
      t,
      s,
    );
  }
}
const c = e =>
  new URL(String(e), location.href).href.replace(new RegExp('^' + location.origin), '');
class r {
  constructor() {
    this.t = new Map();
  }
  get routes() {
    return this.t;
  }
  addFetchListener() {
    self.addEventListener('fetch', e => {
      const { request: t } = e,
        s = this.handleRequest({ request: t, event: e });
      s && e.respondWith(s);
    });
  }
  addCacheListener() {
    self.addEventListener('message', e => {
      if (e.data && 'CACHE_URLS' === e.data.type) {
        const { payload: t } = e.data,
          s = Promise.all(
            t.urlsToCache.map(e => {
              'string' == typeof e && (e = [e]);
              const t = new Request(...e);
              return this.handleRequest({ request: t });
            }),
          );
        e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  handleRequest({ request: e, event: t }) {
    const s = new URL(e.url, location.href);
    if (!s.protocol.startsWith('http')) return;
    const { params: n, route: i } = this.findMatchingRoute({ url: s, request: e, event: t });
    let c,
      r = i && i.handler;
    if ((!r && this.s && (r = this.s), r)) {
      try {
        c = r.handle({ url: s, request: e, event: t, params: n });
      } catch (e) {
        c = Promise.reject(e);
      }
      return (
        c instanceof Promise &&
          this.i &&
          (c = c.catch(n => this.i.handle({ url: s, request: e, event: t }))),
        c
      );
    }
  }
  findMatchingRoute({ url: e, request: t, event: s }) {
    const n = this.t.get(t.method) || [];
    for (const i of n) {
      let n;
      const c = i.match({ url: e, request: t, event: s });
      if (c)
        return (
          (n = c),
          ((Array.isArray(c) && 0 === c.length) ||
            (c.constructor === Object && 0 === Object.keys(c).length) ||
            'boolean' == typeof c) &&
            (n = void 0),
          { route: i, params: n }
        );
    }
    return {};
  }
  setDefaultHandler(e) {
    this.s = s(e);
  }
  setCatchHandler(e) {
    this.i = s(e);
  }
  registerRoute(e) {
    this.t.has(e.method) || this.t.set(e.method, []), this.t.get(e.method).push(e);
  }
  unregisterRoute(e) {
    if (!this.t.has(e.method))
      throw new t('unregister-route-but-not-found-with-method', { method: e.method });
    const s = this.t.get(e.method).indexOf(e);
    if (!(s > -1)) throw new t('unregister-route-route-not-registered');
    this.t.get(e.method).splice(s, 1);
  }
}
let a;
const o = () => (a || ((a = new r()), a.addFetchListener(), a.addCacheListener()), a);
const h = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: 'undefined' != typeof registration ? registration.scope : '',
  },
  u = e => [h.prefix, e, h.suffix].filter(e => e && e.length > 0).join('-'),
  l = e => e || u(h.precache),
  f = e => e || u(h.runtime);
function d(e) {
  e.then(() => {});
}
const w = new Set();
class p {
  constructor(e, t, { onupgradeneeded: s, onversionchange: n } = {}) {
    (this.o = null), (this.h = e), (this.u = t), (this.l = s), (this.p = n || (() => this.close()));
  }
  get db() {
    return this.o;
  }
  async open() {
    if (!this.o)
      return (
        (this.o = await new Promise((e, t) => {
          let s = !1;
          setTimeout(() => {
            (s = !0), t(new Error('The open request was blocked and timed out'));
          }, this.OPEN_TIMEOUT);
          const n = indexedDB.open(this.h, this.u);
          (n.onerror = () => t(n.error)),
            (n.onupgradeneeded = e => {
              s
                ? (n.transaction.abort(), n.result.close())
                : 'function' == typeof this.l && this.l(e);
            }),
            (n.onsuccess = () => {
              const t = n.result;
              s ? t.close() : ((t.onversionchange = this.p.bind(this)), e(t));
            });
        })),
        this
      );
  }
  async getKey(e, t) {
    return (await this.getAllKeys(e, t, 1))[0];
  }
  async getAll(e, t, s) {
    return await this.getAllMatching(e, { query: t, count: s });
  }
  async getAllKeys(e, t, s) {
    return (await this.getAllMatching(e, { query: t, count: s, includeKeys: !0 })).map(e => e.key);
  }
  async getAllMatching(
    e,
    { index: t, query: s = null, direction: n = 'next', count: i, includeKeys: c = !1 } = {},
  ) {
    return await this.transaction([e], 'readonly', (r, a) => {
      const o = r.objectStore(e),
        h = t ? o.index(t) : o,
        u = [],
        l = h.openCursor(s, n);
      l.onsuccess = () => {
        const e = l.result;
        e ? (u.push(c ? e : e.value), i && u.length >= i ? a(u) : e.continue()) : a(u);
      };
    });
  }
  async transaction(e, t, s) {
    return (
      await this.open(),
      await new Promise((n, i) => {
        const c = this.o.transaction(e, t);
        (c.onabort = () => i(c.error)), (c.oncomplete = () => n()), s(c, e => n(e));
      })
    );
  }
  async g(e, t, s, ...n) {
    return await this.transaction([t], s, (s, i) => {
      const c = s.objectStore(t),
        r = c[e].apply(c, n);
      r.onsuccess = () => i(r.result);
    });
  }
  close() {
    this.o && (this.o.close(), (this.o = null));
  }
}
p.prototype.OPEN_TIMEOUT = 2e3;
const y = {
  readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
  readwrite: ['add', 'put', 'clear', 'delete'],
};
for (const [e, t] of Object.entries(y))
  for (const s of t)
    s in IDBObjectStore.prototype &&
      (p.prototype[s] = async function (t, ...n) {
        return await this.g(s, t, e, ...n);
      });
try {
  self['workbox:expiration:5.1.3'] && _();
} catch (e) {}
const g = e => {
  const t = new URL(e, location.href);
  return (t.hash = ''), t.href;
};
class m {
  constructor(e) {
    (this.m = e), (this.o = new p('workbox-expiration', 1, { onupgradeneeded: e => this.v(e) }));
  }
  v(e) {
    const t = e.target.result.createObjectStore('cache-entries', { keyPath: 'id' });
    t.createIndex('cacheName', 'cacheName', { unique: !1 }),
      t.createIndex('timestamp', 'timestamp', { unique: !1 }),
      (async e => {
        await new Promise((t, s) => {
          const n = indexedDB.deleteDatabase(e);
          (n.onerror = () => {
            s(n.error);
          }),
            (n.onblocked = () => {
              s(new Error('Delete blocked'));
            }),
            (n.onsuccess = () => {
              t();
            });
        });
      })(this.m);
  }
  async setTimestamp(e, t) {
    const s = { url: (e = g(e)), timestamp: t, cacheName: this.m, id: this.q(e) };
    await this.o.put('cache-entries', s);
  }
  async getTimestamp(e) {
    return (await this.o.get('cache-entries', this.q(e))).timestamp;
  }
  async expireEntries(e, t) {
    const s = await this.o.transaction('cache-entries', 'readwrite', (s, n) => {
        const i = s.objectStore('cache-entries').index('timestamp').openCursor(null, 'prev'),
          c = [];
        let r = 0;
        i.onsuccess = () => {
          const s = i.result;
          if (s) {
            const n = s.value;
            n.cacheName === this.m &&
              ((e && n.timestamp < e) || (t && r >= t) ? c.push(s.value) : r++),
              s.continue();
          } else n(c);
        };
      }),
      n = [];
    for (const e of s) await this.o.delete('cache-entries', e.id), n.push(e.url);
    return n;
  }
  q(e) {
    return this.m + '|' + g(e);
  }
}
class v {
  constructor(e, t = {}) {
    (this.R = !1),
      (this._ = !1),
      (this.U = t.maxEntries),
      (this.L = t.maxAgeSeconds),
      (this.m = e),
      (this.k = new m(e));
  }
  async expireEntries() {
    if (this.R) return void (this._ = !0);
    this.R = !0;
    const e = this.L ? Date.now() - 1e3 * this.L : 0,
      t = await this.k.expireEntries(e, this.U),
      s = await self.caches.open(this.m);
    for (const e of t) await s.delete(e);
    (this.R = !1), this._ && ((this._ = !1), d(this.expireEntries()));
  }
  async updateTimestamp(e) {
    await this.k.setTimestamp(e, Date.now());
  }
  async isURLExpired(e) {
    if (this.L) {
      return (await this.k.getTimestamp(e)) < Date.now() - 1e3 * this.L;
    }
    return !1;
  }
  async delete() {
    (this._ = !1), await this.k.expireEntries(1 / 0);
  }
}
const b = (e, t) => e.filter(e => t in e),
  q = async ({ request: e, mode: t, plugins: s = [] }) => {
    const n = b(s, 'cacheKeyWillBeUsed');
    let i = e;
    for (const e of n)
      (i = await e.cacheKeyWillBeUsed.call(e, { mode: t, request: i })),
        'string' == typeof i && (i = new Request(i));
    return i;
  },
  R = async ({ cacheName: e, request: t, event: s, matchOptions: n, plugins: i = [] }) => {
    const c = await self.caches.open(e),
      r = await q({ plugins: i, request: t, mode: 'read' });
    let a = await c.match(r, n);
    for (const t of i)
      if ('cachedResponseWillBeUsed' in t) {
        const i = t.cachedResponseWillBeUsed;
        a = await i.call(t, {
          cacheName: e,
          event: s,
          matchOptions: n,
          cachedResponse: a,
          request: r,
        });
      }
    return a;
  },
  x = async ({
    cacheName: e,
    request: s,
    response: n,
    event: i,
    plugins: r = [],
    matchOptions: a,
  }) => {
    const o = await q({ plugins: r, request: s, mode: 'write' });
    if (!n) throw new t('cache-put-with-no-response', { url: c(o.url) });
    const h = await (async ({ request: e, response: t, event: s, plugins: n = [] }) => {
      let i = t,
        c = !1;
      for (const t of n)
        if ('cacheWillUpdate' in t) {
          c = !0;
          const n = t.cacheWillUpdate;
          if (((i = await n.call(t, { request: e, response: i, event: s })), !i)) break;
        }
      return c || (i = i && 200 === i.status ? i : void 0), i || null;
    })({ event: i, plugins: r, response: n, request: o });
    if (!h) return;
    const u = await self.caches.open(e),
      l = b(r, 'cacheDidUpdate'),
      f = l.length > 0 ? await R({ cacheName: e, matchOptions: a, request: o }) : null;
    try {
      await u.put(o, h);
    } catch (e) {
      throw (
        ('QuotaExceededError' === e.name &&
          (await (async function () {
            for (const e of w) await e();
          })()),
        e)
      );
    }
    for (const t of l)
      await t.cacheDidUpdate.call(t, {
        cacheName: e,
        event: i,
        oldResponse: f,
        newResponse: h,
        request: o,
      });
  },
  U = R,
  L = async ({ request: e, fetchOptions: s, event: n, plugins: i = [] }) => {
    if (
      ('string' == typeof e && (e = new Request(e)), n instanceof FetchEvent && n.preloadResponse)
    ) {
      const e = await n.preloadResponse;
      if (e) return e;
    }
    const c = b(i, 'fetchDidFail'),
      r = c.length > 0 ? e.clone() : null;
    try {
      for (const t of i)
        if ('requestWillFetch' in t) {
          const s = t.requestWillFetch,
            i = e.clone();
          e = await s.call(t, { request: i, event: n });
        }
    } catch (e) {
      throw new t('plugin-error-request-will-fetch', { thrownError: e });
    }
    const a = e.clone();
    try {
      let t;
      t = 'navigate' === e.mode ? await fetch(e) : await fetch(e, s);
      for (const e of i)
        'fetchDidSucceed' in e &&
          (t = await e.fetchDidSucceed.call(e, { event: n, request: a, response: t }));
      return t;
    } catch (e) {
      for (const t of c)
        await t.fetchDidFail.call(t, {
          error: e,
          event: n,
          originalRequest: r.clone(),
          request: a.clone(),
        });
      throw e;
    }
  };
try {
  self['workbox:strategies:5.1.3'] && _();
} catch (e) {}
const k = {
  cacheWillUpdate: async ({ response: e }) => (200 === e.status || 0 === e.status ? e : null),
};
let N;
async function E(e, t) {
  const s = e.clone(),
    n = { headers: new Headers(s.headers), status: s.status, statusText: s.statusText },
    i = t ? t(n) : n,
    c = (function () {
      if (void 0 === N) {
        const e = new Response('');
        if ('body' in e)
          try {
            new Response(e.body), (N = !0);
          } catch (e) {
            N = !1;
          }
        N = !1;
      }
      return N;
    })()
      ? s.body
      : await s.blob();
  return new Response(c, i);
}
try {
  self['workbox:precaching:5.1.3'] && _();
} catch (e) {}
function P(e) {
  if (!e) throw new t('add-to-cache-list-unexpected-type', { entry: e });
  if ('string' == typeof e) {
    const t = new URL(e, location.href);
    return { cacheKey: t.href, url: t.href };
  }
  const { revision: s, url: n } = e;
  if (!n) throw new t('add-to-cache-list-unexpected-type', { entry: e });
  if (!s) {
    const e = new URL(n, location.href);
    return { cacheKey: e.href, url: e.href };
  }
  const i = new URL(n, location.href),
    c = new URL(n, location.href);
  return i.searchParams.set('__WB_REVISION__', s), { cacheKey: i.href, url: c.href };
}
class j {
  constructor(e) {
    (this.m = l(e)), (this.N = new Map()), (this.P = new Map()), (this.j = new Map());
  }
  addToCacheList(e) {
    const s = [];
    for (const n of e) {
      'string' == typeof n ? s.push(n) : n && void 0 === n.revision && s.push(n.url);
      const { cacheKey: e, url: i } = P(n),
        c = 'string' != typeof n && n.revision ? 'reload' : 'default';
      if (this.N.has(i) && this.N.get(i) !== e)
        throw new t('add-to-cache-list-conflicting-entries', {
          firstEntry: this.N.get(i),
          secondEntry: e,
        });
      if ('string' != typeof n && n.integrity) {
        if (this.j.has(e) && this.j.get(e) !== n.integrity)
          throw new t('add-to-cache-list-conflicting-integrities', { url: i });
        this.j.set(e, n.integrity);
      }
      if ((this.N.set(i, e), this.P.set(i, c), s.length > 0)) {
        const e = `Workbox is precaching URLs without revision info: ${s.join(
          ', ',
        )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(e);
      }
    }
  }
  async install({ event: e, plugins: t } = {}) {
    const s = [],
      n = [],
      i = await self.caches.open(this.m),
      c = await i.keys(),
      r = new Set(c.map(e => e.url));
    for (const [e, t] of this.N) r.has(t) ? n.push(e) : s.push({ cacheKey: t, url: e });
    const a = s.map(({ cacheKey: s, url: n }) => {
      const i = this.j.get(s),
        c = this.P.get(n);
      return this.M({ cacheKey: s, cacheMode: c, event: e, integrity: i, plugins: t, url: n });
    });
    await Promise.all(a);
    return { updatedURLs: s.map(e => e.url), notUpdatedURLs: n };
  }
  async activate() {
    const e = await self.caches.open(this.m),
      t = await e.keys(),
      s = new Set(this.N.values()),
      n = [];
    for (const i of t) s.has(i.url) || (await e.delete(i), n.push(i.url));
    return { deletedURLs: n };
  }
  async M({ cacheKey: e, url: s, cacheMode: n, event: i, plugins: c, integrity: r }) {
    const a = new Request(s, { integrity: r, cache: n, credentials: 'same-origin' });
    let o,
      h = await L({ event: i, plugins: c, request: a });
    for (const e of c || []) 'cacheWillUpdate' in e && (o = e);
    if (!(o ? await o.cacheWillUpdate({ event: i, request: a, response: h }) : h.status < 400))
      throw new t('bad-precaching-response', { url: s, status: h.status });
    h.redirected && (h = await E(h)),
      await x({
        event: i,
        plugins: c,
        response: h,
        request: e === s ? a : new Request(e),
        cacheName: this.m,
        matchOptions: { ignoreSearch: !0 },
      });
  }
  getURLsToCacheKeys() {
    return this.N;
  }
  getCachedURLs() {
    return [...this.N.keys()];
  }
  getCacheKeyForURL(e) {
    const t = new URL(e, location.href);
    return this.N.get(t.href);
  }
  async matchPrecache(e) {
    const t = e instanceof Request ? e.url : e,
      s = this.getCacheKeyForURL(t);
    if (s) {
      return (await self.caches.open(this.m)).match(s);
    }
  }
  createHandler(e = !0) {
    return async ({ request: s }) => {
      try {
        const e = await this.matchPrecache(s);
        if (e) return e;
        throw new t('missing-precache-entry', {
          cacheName: this.m,
          url: s instanceof Request ? s.url : s,
        });
      } catch (t) {
        if (e) return fetch(s);
        throw t;
      }
    };
  }
  createHandlerBoundToURL(e, s = !0) {
    if (!this.getCacheKeyForURL(e)) throw new t('non-precached-url', { url: e });
    const n = this.createHandler(s),
      i = new Request(e);
    return () => n({ request: i });
  }
}
let M;
const T = () => (M || (M = new j()), M);
const K = (e, t) => {
  const s = T().getURLsToCacheKeys();
  for (const n of (function* (
    e,
    { ignoreURLParametersMatching: t, directoryIndex: s, cleanURLs: n, urlManipulation: i } = {},
  ) {
    const c = new URL(e, location.href);
    (c.hash = ''), yield c.href;
    const r = (function (e, t = []) {
      for (const s of [...e.searchParams.keys()])
        t.some(e => e.test(s)) && e.searchParams.delete(s);
      return e;
    })(c, t);
    if ((yield r.href, s && r.pathname.endsWith('/'))) {
      const e = new URL(r.href);
      (e.pathname += s), yield e.href;
    }
    if (n) {
      const e = new URL(r.href);
      (e.pathname += '.html'), yield e.href;
    }
    if (i) {
      const e = i({ url: c });
      for (const t of e) yield t.href;
    }
  })(e, t)) {
    const e = s.get(n);
    if (e) return e;
  }
};
let O = !1;
function D(e) {
  O ||
    ((({
      ignoreURLParametersMatching: e = [/^utm_/],
      directoryIndex: t = 'index.html',
      cleanURLs: s = !0,
      urlManipulation: n,
    } = {}) => {
      const i = l();
      self.addEventListener('fetch', c => {
        const r = K(c.request.url, {
          cleanURLs: s,
          directoryIndex: t,
          ignoreURLParametersMatching: e,
          urlManipulation: n,
        });
        if (!r) return;
        let a = self.caches
          .open(i)
          .then(e => e.match(r))
          .then(e => e || fetch(r));
        c.respondWith(a);
      });
    })(e),
    (O = !0));
}
const C = [],
  W = {
    get: () => C,
    add(e) {
      C.push(...e);
    },
  },
  A = e => {
    const t = T(),
      s = W.get();
    e.waitUntil(
      t.install({ event: e, plugins: s }).catch(e => {
        throw e;
      }),
    );
  },
  S = e => {
    const t = T();
    e.waitUntil(t.activate());
  };
var I;
self.addEventListener('install', () => self.skipWaiting()),
  self.addEventListener('activate', () => self.clients.claim()),
  (I = {}),
  (function (e) {
    T().addToCacheList(e),
      e.length > 0 && (self.addEventListener('install', A), self.addEventListener('activate', S));
  })([
    {
      url: '_next/static/chunks/8804ed50.acdc88755e55ded238c8.js',
      revision: '7c1e88c4a68db82bfb3cbc3f81ac70c6',
    },
    {
      url: '_next/static/chunks/commons.791bd1b020fd52da39ef.js',
      revision: '6bbfd6d377fe9fca515a863fc26e6c2d',
    },
    {
      url: '_next/static/chunks/f865ca74e8cbc6bd1bc66026766a1fa6e9e61d56.1c5f61815525fe16961c.js',
      revision: 'f3792224cd1f362549121e8b5a4ef277',
    },
    {
      url: '_next/static/chunks/framework.d3c9d973ca0cf43312e7.js',
      revision: '1c8c47501f8a83e7cbef6220665aa75a',
    },
    {
      url: '_next/static/chunks/main-c8cd3d912a2465a129ab.js',
      revision: '958542ace6715794190c9f6cdca18a82',
    },
    {
      url: '_next/static/chunks/pages/_app-55f11336e17c959c5e20.js',
      revision: '366b1775df37fe08bde247b7da077beb',
    },
    {
      url: '_next/static/chunks/pages/_error-cf0d0b3fdf5c638b18ea.js',
      revision: '911bfcf16e07c6862a480155f2d41bff',
    },
    {
      url: '_next/static/chunks/pages/favorites-14f34ad603e1b808f1d8.js',
      revision: '04ff54ecc6fd52a3b442798ac86d9078',
    },
    {
      url: '_next/static/chunks/pages/index-3265109c35873d1876f7.js',
      revision: 'be7f815f609577d3dcb2455b6277a914',
    },
    {
      url: '_next/static/chunks/polyfills-0c75e203b710edcd412d.js',
      revision: '601f7ee541ff68240ed1951b58218867',
    },
    {
      url: '_next/static/chunks/styles.3195cd64f7b613b55e89.js',
      revision: '4b9e06ef6353287a1d2c94d29b3475cc',
    },
    {
      url: '_next/static/chunks/webpack-045a5f547ab03d9034b6.js',
      revision: '2019297a9ccffe0e261600bad1b1f98a',
    },
    {
      url: '_next/static/css/8804ed50.fe07a263.chunk.css',
      revision: '476773ffddd8fad867e411c49a0f3ef4',
    },
    {
      url: '_next/static/css/styles.3f528f55.chunk.css',
      revision: 'cfb39d76ef110df69c517c13bc9a9253',
    },
    {
      url: '_next/static/haX4p3r5Pkd6PrqWxG_9W/_buildManifest.js',
      revision: '644be1d717497ec62c8ec211b4a0c4d3',
    },
    {
      url: '_next/static/haX4p3r5Pkd6PrqWxG_9W/_ssgManifest.js',
      revision: 'abee47769bf307639ace4945f9cfd4ff',
    },
  ]),
  D(I),
  (function (e, s, c) {
    let r;
    if ('string' == typeof e) {
      const t = new URL(e, location.href);
      r = new n(({ url: e }) => e.href === t.href, s, c);
    } else if (e instanceof RegExp) r = new i(e, s, c);
    else if ('function' == typeof e) r = new n(e, s, c);
    else {
      if (!(e instanceof n))
        throw new t('unsupported-route-type', {
          moduleName: 'workbox-routing',
          funcName: 'registerRoute',
          paramName: 'capture',
        });
      r = e;
    }
    o().registerRoute(r);
  })(
    /^https?.*/,
    new (class {
      constructor(e = {}) {
        if (((this.m = f(e.cacheName)), e.plugins)) {
          const t = e.plugins.some(e => !!e.cacheWillUpdate);
          this.T = t ? e.plugins : [k, ...e.plugins];
        } else this.T = [k];
        (this.K = e.networkTimeoutSeconds || 0),
          (this.O = e.fetchOptions),
          (this.D = e.matchOptions);
      }
      async handle({ event: e, request: s }) {
        const n = [];
        'string' == typeof s && (s = new Request(s));
        const i = [];
        let c;
        if (this.K) {
          const { id: t, promise: r } = this.C({ request: s, event: e, logs: n });
          (c = t), i.push(r);
        }
        const r = this.W({ timeoutId: c, request: s, event: e, logs: n });
        i.push(r);
        let a = await Promise.race(i);
        if ((a || (a = await r), !a)) throw new t('no-response', { url: s.url });
        return a;
      }
      C({ request: e, logs: t, event: s }) {
        let n;
        return {
          promise: new Promise(t => {
            n = setTimeout(async () => {
              t(await this.A({ request: e, event: s }));
            }, 1e3 * this.K);
          }),
          id: n,
        };
      }
      async W({ timeoutId: e, request: t, logs: s, event: n }) {
        let i, c;
        try {
          c = await L({ request: t, event: n, fetchOptions: this.O, plugins: this.T });
        } catch (e) {
          i = e;
        }
        if ((e && clearTimeout(e), i || !c)) c = await this.A({ request: t, event: n });
        else {
          const e = c.clone(),
            s = x({ cacheName: this.m, request: t, response: e, event: n, plugins: this.T });
          if (n)
            try {
              n.waitUntil(s);
            } catch (e) {}
        }
        return c;
      }
      A({ event: e, request: t }) {
        return U({
          cacheName: this.m,
          request: t,
          event: e,
          matchOptions: this.D,
          plugins: this.T,
        });
      }
    })({
      cacheName: 'offlineCache',
      plugins: [
        new (class {
          constructor(e = {}) {
            var t;
            (this.cachedResponseWillBeUsed = async ({
              event: e,
              request: t,
              cacheName: s,
              cachedResponse: n,
            }) => {
              if (!n) return null;
              const i = this.S(n),
                c = this.I(s);
              d(c.expireEntries());
              const r = c.updateTimestamp(t.url);
              if (e)
                try {
                  e.waitUntil(r);
                } catch (e) {}
              return i ? n : null;
            }),
              (this.cacheDidUpdate = async ({ cacheName: e, request: t }) => {
                const s = this.I(e);
                await s.updateTimestamp(t.url), await s.expireEntries();
              }),
              (this.B = e),
              (this.L = e.maxAgeSeconds),
              (this.F = new Map()),
              e.purgeOnQuotaError && ((t = () => this.deleteCacheAndMetadata()), w.add(t));
          }
          I(e) {
            if (e === f()) throw new t('expire-custom-caches-only');
            let s = this.F.get(e);
            return s || ((s = new v(e, this.B)), this.F.set(e, s)), s;
          }
          S(e) {
            if (!this.L) return !0;
            const t = this.H(e);
            if (null === t) return !0;
            return t >= Date.now() - 1e3 * this.L;
          }
          H(e) {
            if (!e.headers.has('date')) return null;
            const t = e.headers.get('date'),
              s = new Date(t).getTime();
            return isNaN(s) ? null : s;
          }
          async deleteCacheAndMetadata() {
            for (const [e, t] of this.F) await self.caches.delete(e), await t.delete();
            this.F = new Map();
          }
        })({ maxEntries: 200, purgeOnQuotaError: !0 }),
      ],
    }),
    'GET',
  );
