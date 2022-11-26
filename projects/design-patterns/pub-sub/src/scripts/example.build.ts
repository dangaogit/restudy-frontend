import { build } from 'esbuild';
import path from 'path';

build({
    entryPoints: [path.resolve(__dirname, '../main/example/app.ts')],
    bundle: true,
    minify: true,
    outfile: 'dist/out.prod.js',
}).catch((e) => {
    console.error(e);
});
