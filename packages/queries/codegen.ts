import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'packages/queries/schema.graphql',
  documents: 'packages/queries/src/graphql/**/*.graphql',
  generates: {
    'packages/queries/src/composables/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
      config: {
        enumsAsTypes: true,
        withCompositionFunctions: true,
        vueCompositionApiImportFrom: 'vue',
        vueApolloComposableImportFrom: '@vue/apollo-composable',
      },
    },
  },
}

export default config
