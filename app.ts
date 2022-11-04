import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import router from './src/routers/index.ts';

const HOST = '127.0.0.1';
const PORT = 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
