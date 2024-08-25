import {graphql, GraphQLVariables, http as rest, HttpResponse, RequestHandler} from "msw";
import {setupServer} from "msw/node";
import {PUBLIC_GRAPHQL_URL} from "$env/static/public";

export const graphqlLink = graphql.link(PUBLIC_GRAPHQL_URL)

const handlers = [
    rest.post('http://testing.com/sub', ({request}) => {
        return HttpResponse.json({ok: true})
    })
]
export const createMockServer = (...handlers: Array<RequestHandler>) => {
    return setupServer(...handlers)
}
export const mockServer = createMockServer()
export const use = (...handlers: Array<RequestHandler>) => {
    mockServer.use(...handlers)
}

export type GraphQLResolver<Variables extends GraphQLVariables> = {
    query: string
    operationName: string
    variables: Variables
    cookies: Record<string, string>
}