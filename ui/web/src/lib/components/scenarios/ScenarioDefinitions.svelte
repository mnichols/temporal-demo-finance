<script lang="ts">

    import type {ScenarioDefinitions} from '$gql'

    export let definitions: ScenarioDefinitions
</script>

<div>
    {#each definitions.definitions as def}
        <ul>
            <li>{def.}</li>
        </ul>
</div>