import {writable} from 'svelte/store'
import {beforeAll, describe, expect} from 'vitest'
import {createTestClient} from '$lib/http/urql/index.js'
import {createSettings, themes} from '$lib/stores/settings.js'
import {waitForResponse} from '$lib/http/testhelper.js'
import type {Client} from '@urql/core'
import {graphqlLink, use} from '$lib/http/mock-server/index.js'
import {HttpResponse} from 'msw'

describe('createSettings', async () => {
    const simpleAppInfoResult = {
        appInfo: {
            name: 'mytemporalapp',
            temporal: {
                namespace: 'mytemporalnamespace',
            }
        }
    }
    let client: Client
    beforeAll(async () => {
        client = createTestClient()
    })
    beforeEach(async () => {
        vi.mock('@urql/svelte', async () => {
            let mod = await vi.importActual('@urql/svelte')
            return {
                ...mod,
                subscriptionStore: vi.fn(() => writable(42)),
            }
        })
    })
    afterEach(async () => {
        vi.clearAllMocks()
    })
    describe('given temporal settings', async () => {

        it('should init with app info and ui settings', async () => {
            use(graphqlLink.query('AppInfo', async () => {
                return HttpResponse.json({data: simpleAppInfoResult})
            }, {once: true}))
            let sut = createSettings(client)
            let expectationsAsserted = false
            await waitForResponse(10)
            sut.subscribe(actual => {
                expect(actual.ui.theme).eq(themes[0])
                expect(actual.appInfo).eql(simpleAppInfoResult.appInfo)
                expectationsAsserted = true
            })
            expect(expectationsAsserted).to.be.true
        })
    })
})