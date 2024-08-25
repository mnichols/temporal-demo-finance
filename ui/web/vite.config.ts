import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vitest/config';
import fs from 'fs'
import dotenv from 'dotenv-extended'

const envCfg = dotenv.load()

/** @type {import('vite').UserConfig} */


// https://vitejs.dev/config/
// https://github.com/sveltejs/kit/issues/11365
export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {
    let webhost = process.env['PUBLIC_WEB_URL']
    if (!webhost) {
        console.warn('PUBLIC_WEB_URL not provided, falling back to default')
        webhost = 'https://localhost:5173'
    }
    let https = {}

    const webhostUrl = new URL(webhost)
    if (webhostUrl.protocol.includes('https')) {
        console.log('https cert file at ', process.env['WEB_CONNECTION_MTLS_CERT_CHAIN_FILE'])
        https = {
            key: fs.readFileSync(process.env['WEB_CONNECTION_MTLS_KEY_FILE'] || ''),
            cert: fs.readFileSync(process.env['WEB_CONNECTION_MTLS_CERT_CHAIN_FILE'] || '')
        }
    }
    return {
        base: '/viteconfignotused',
        plugins: [sveltekit()],
        test: {
            include: ['src/**/*.{test,spec}.{js,ts}']
        },
        resolve: {
            alias: {
                $lib: './src/lib',
                $gql: './src/gql/index.js'
            }
        },
        build: {
            sourcemap: true
        },
        optimizeDeps: {
            exclude: ['@urql/svelte']
        },
        server: {
            https,
            host: webhostUrl.hostname,
            //  without the proxy does NOT work.
            proxy: {},
            port: parseInt(webhostUrl.port, 10),
        }
    }
});
