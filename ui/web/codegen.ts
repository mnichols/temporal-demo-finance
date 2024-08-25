import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['../../graphql/diag.graphql', '../../graphql/app.graphql'],
    documents: ['./src/lib/operations/**/*.graphql', './src/**/*.svelte'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/index.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node', 'typescript-resolvers'],
            config: {
                useTypeImports: true,
            }
        }
    },
}
export default config
