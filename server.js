const express = require('express');
const next = require('next');
const path = require('path');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    // CORS config
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');

      // authorized headers for preflight requests
      // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();

      server.options('*', (req, res) => {
        // allowed XHR methods
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
      });
    });

    // handle GET request to /service-worker.js
    server.get('/service-worker.js', (req, res) => {
      // Don't cache service worker is a best practice.
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.set('Content-Type', 'application/javascript');
      const filePath = path.join(__dirname, 'public/service-worker.js');
      app.serveStatic(req, res, filePath);
    });

    server.get('*', (req, res) => handle(req, res));
    await server.listen(port);
    console.log(`> Ready on http://localhost:${port}`);
  } catch (err) {
    console.log('Caught an error on server.js: ' + err.toString());
  }
})();
