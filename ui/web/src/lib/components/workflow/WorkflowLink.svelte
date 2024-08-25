<script lang="ts">
    import {getContextSettings} from '$lib/stores/settings.js'
    import {get} from 'svelte/store'
    import temporalCloud from '$lib/images/temporal-cloud.png'
    import temporalLocal from '$lib/images/temporal-logo.png'

    export let workflowId: String
    export let label: String = 'Workflow'
    let settings = get(getContextSettings())
    let local = settings?.appInfo?.temporal?.namespace == 'default'
    let host = local ? 'http://localhost:8233' : 'https://cloud.temporal.io'
    let href = `${host}/namespaces/${settings?.appInfo?.temporal.namespace}/workflows/${workflowId}`
    let logo = local ? temporalLocal : temporalCloud
    let alt = local ? 'Temporal Local' : 'Temporal Cloud'
</script>

<a href={href}
   target='_blank'
   class='tooltip flex flex-row items-center link-primary'
   data-tip={alt}>
    <span class="flex h-12 w-12 items-center after:absolute after:left-[calc(100%_+_1.5rem)] after:top-0 after:hidden after:h-8 after:items-center after:rounded-md after:bg-slate-800 after:p-1 after:px-2 after:text-xs after:text-white after:content-[attr(data-tooltip)] group-data-[nav=closed]:hover:after:flex">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"
             aria-hidden="true"><title></title>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 3.16663C6.47715 3.16663 2 7.64377 2 13.1666H0C0 6.53919 5.37258 1.16663 12 1.16663C18.6274 1.16663 24 6.53919 24 13.1666H22C22 7.64377 17.5229 3.16663 12 3.16663ZM18.3333 13.1666C18.3333 9.66881 15.4978 6.83328 12 6.83328V4.83328C16.6024 4.83328 20.3333 8.56423 20.3333 13.1666C20.3333 17.769 16.6024 21.4999 12 21.4999C7.39763 21.4999 3.66667 17.769 3.66667 13.1666H5.66667C5.66667 16.6644 8.50219 19.4999 12 19.4999C15.4978 19.4999 18.3333 16.6644 18.3333 13.1666ZM12 10.4999C10.5272 10.4999 9.33333 11.6938 9.33333 13.1666C9.33333 14.6394 10.5272 15.8333 12 15.8333C13.4728 15.8333 14.6667 14.6394 14.6667 13.1666C14.6667 11.6938 13.4728 10.4999 12 10.4999ZM7.33333 13.1666C7.33333 10.5893 9.42267 8.49994 12 8.49994C14.5773 8.49994 16.6667 10.5893 16.6667 13.1666C16.6667 15.7439 14.5773 17.8333 12 17.8333C9.42267 17.8333 7.33333 15.7439 7.33333 13.1666Z"
                      fill="currentColor"></path>
        </svg>
    </span>
    <span>
        {label}
    </span>
</a>