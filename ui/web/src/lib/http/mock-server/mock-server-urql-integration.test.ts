import {graphqlLink, type GraphQLResolver, mockServer} from "./index.js";
import {formatISO, parseISO} from 'date-fns'
import {queryStore} from "@urql/svelte";
import {createTestClient} from "../urql/index.js";
import type {PingInput,} from '$gql'
import {PingTestDocument} from "$gql"
import type {Client} from "@urql/core";
import {beforeAll, expect} from "vitest";
import {HttpResponse} from 'msw'
import {waitForResponse} from '$lib/http/testhelper.js'

describe('given mock server', async () => {
    let client: Client
    beforeAll(async () => {
        client = createTestClient()
    })
    it('should init', async () => {
        mockServer.use(graphqlLink.query('PingTest',
            async (res: GraphQLResolver<PingInput>) => {
                const {input} = res.variables

                return HttpResponse.json({
                    data: {
                        ping: {
                            value: input?.value + ' to you',
                            timestamp: parseISO(input?.timestamp)
                        }
                    }
                })
            },
            {
                once: true,

            }))
        let input: PingInput = {value: 'hello', timestamp: new Date(1970, 3, 5)}
        let sut = queryStore({
            client,
            query: PingTestDocument,
            variables: {input},
            requestPolicy: 'network-only',
        })
        let requestVariablesEvaluated = false
        let resultEvaluated = false
        sut.subscribe(arg => {
            console.log('arg', arg)
            if (arg.error) {
                expect.fail(arg.error.message)
            } else if (arg.fetching) {
                const {input: received} = arg.operation.variables
                console.log('evaluating input', received.timestamp instanceof Date)
                expect(received).not.to.be.undefined
                expect(received.value).to.eq(input?.value)
                expect(formatISO(received.timestamp)).to.contain('1970-04-05')
                requestVariablesEvaluated = true
            } else {
                expect(arg.data?.ping?.value).eq(`${input?.value} to you`)
                resultEvaluated = true
            }
        })
        await waitForResponse()
        expect(requestVariablesEvaluated).to.be.true
        expect(resultEvaluated).to.be.true
        //
        // sut.subscribe(arg => responses.push(arg))
        // // first response is waiting for server reply, so fetching is true
        // expect(responses).length(1)
        // expect(responses[0].fetching).to.be.true
        //
        // console.log('here is data', get(sut).data)
        //
        // // after tick we get the value from the server so fetching is false and we have data
        // expect(receivedVariables).to.not.be.undefined
        // expect(receivedVariables?.input?.value).to.eq(input?.value)
        // expect(receivedVariables?.input?.timestamp).to.include('1970-04-05')
        // expect(responses).length(2)
        // expect(responses[1].fetching).to.be.false
        // expect(responses[1]?.data?.ping?.value).to.eq(`${input?.value} to you`)
    })
})