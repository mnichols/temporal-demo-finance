import express from 'express'
import {createHandler} from 'graphql-http/lib/use/express'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchemaSync} from '@graphql-tools/load'
import {makeExecutableSchema} from '@graphql-tools/schema/makeExecutableSchema'
import {createResolvers} from './resolvers.js'
import {ruruHTML} from "ruru/server";
import {createClient} from '../clients/temporal/index.js'
import {cfg} from '../config/index.js'
import fs from 'fs'
import https from 'https'
import cors from 'cors'

const resolvers = createResolvers(await createClient(cfg.Temporal))
/*
https://graphql.org/graphql-js/running-an-express-graphql-server/
 */
const typeDefs = loadSchemaSync("../graphql/app.graphql", {
    loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})


// console.log(printSchema(typeDefs));

var app = express()
app.use(cors())

// Create and use the GraphQL handler.
app.use(
    cfg.BFF.url.pathname,
    createHandler({
        schema,
        //rootValue: {...resolvers.Query, ...resolvers.Mutation},
    })
)

// Serve the GraphiQL IDE.
app.get("/", (_req: any, res: any) => {
    res.type("html")
    res.end(ruruHTML({endpoint: "/graphql"}))
})

let options = {}
if (cfg.BFF.mtls && cfg.BFF.mtls.certChainFile && cfg.BFF.mtls.keyFile) {
// Start the server at port
    options = {
        key: fs.readFileSync(cfg.BFF.mtls?.keyFile),
        cert: fs.readFileSync(cfg.BFF.mtls?.certChainFile),
    };
}
const httpsServer = https.createServer(options, app)
httpsServer.listen(cfg.BFF.url.port, () => {
    console.log(`Running a GraphQL API server at https://localhost:${cfg.BFF.url.port}/graphql`)
})
