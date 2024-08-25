import {configDefaults, defineConfig} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'
// @ts-ignore
import path from 'path'

export default defineConfig({
    plugins: [svelte({hot: !process.env.VITEST})],
    resolve: {
        alias: {
            $lib: path.resolve(__dirname, './src/lib'),
            $gql: path.resolve(__dirname, './src/gql'),
            $types: path.resolve(__dirname, './src/types'),
            $log: path.resolve(__dirname, './src/lib/log'),
            $components: path.resolve(__dirname, './src/lib/components/'),
            $app: path.resolve(__dirname, './src/lib/svelte-mocks/app/'),
            $fixtures: path.resolve(__dirname, './src/fixtures/'),
            $env: path.resolve(__dirname, './src/lib/svelte-mocks/env/'),
        },
    },
    build: {
        sourcemap: true
    },
    test: {
        globals: true,
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                ...configDefaults.exclude,
                'src/lib/svelte-mocks/**/*',
                '**/*.test.ts',
            ],
            provider: 'istanbul'
        },
        environment: 'jsdom',
        setupFiles: ['./vitest-setup.ts'],
        server: {
            deps: {
                inline: ['date-fns'],
            },
        }
    },
})
