import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { networkInterfaces } from 'node:os';
import { extname, join, normalize, resolve, sep } from 'node:path';

const port = Number.parseInt(process.env.PORT ?? '5173', 10);
const host = process.env.HOST ?? '0.0.0.0';
const publicDir = resolve('public');

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

function getLanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((address) => address && address.family === 'IPv4' && !address.internal)
    .map((address) => address.address);
}

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://${host}:${port}`).pathname);
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const normalizedPath = normalize(requestedPath).replace(/^([/\\])+/, '');
  const filePath = resolve(join(publicDir, normalizedPath));

  if (filePath !== publicDir && !filePath.startsWith(`${publicDir}${sep}`)) {
    return null;
  }

  return filePath;
}

const server = createServer((request, response) => {
  if (request.url === '/healthz') {
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('ok');
    return;
  }

  const filePath = resolveRequestPath(request.url ?? '/');

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'cache-control': 'no-store',
    'content-type': contentTypes.get(extname(filePath)) ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  const lanAddresses = getLanAddresses();
  console.log(`Exercise Tracker is running on port ${port}.`);
  console.log(`Computer browser: http://localhost:${port}`);

  if (lanAddresses.length === 0) {
    console.log('No LAN IP was detected. Make sure Wi-Fi is on, then run hostname -I or ipconfig getifaddr en0.');
    return;
  }

  console.log('Phone URLs on the same Wi-Fi:');
  for (const address of lanAddresses) {
    console.log(`  http://${address}:${port}`);
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other server or run: PORT=5174 npm start`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});
