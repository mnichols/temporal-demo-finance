<script lang="ts">
    import {gql} from 'graphql-tag'

    // this file and query keep the `documents` node from silently failing AND
    // shows how to write GQL instructions inside a .svelte component/route
    const svelteFilesHaveQueriesToo = gql`
      query SveltePingTest($input: PingInput) {
            ping(input: $input) {
                value,
                timestamp,
            }
        }
  `
</script>