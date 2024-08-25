import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '../../graphql/diag.graphql',
    // documents: ['src/**/*.svelte', 'src/lib/operations/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './generated.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-resolvers', 'typed-document-node'],
            config: {
                useTypeImports: true,
            }
        }
    },
}
export default config
