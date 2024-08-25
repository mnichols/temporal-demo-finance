<script lang="ts">
    import type {ScenarioDefinition} from '../../../gql/index.js'

    export let definition: ScenarioDefinition
</script>

<div>
    <ul>
        <li class="collapse">
            <input type="radio" name="scenarios" checked="checked"/>
            <div class="collapse-title text-xl font-medium">{definition.title}</div>
            <div class="collapse-content">
                <ul>
                    <li><span>Id</span><span>{definition.id}</span></li>
                    {#if !!definition.applicationFailure}
                        <li>
                            <input name='application_failure' value={definition.applicationFailure}/>
                        </li>
                    {/if}
                </ul>
                <p>hello</p>
            </div>
        </li>
        <li>{definition.id}</li>
        <li>{definition.title}</li>
    </ul>
</div>