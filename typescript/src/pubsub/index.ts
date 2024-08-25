import https from 'https';
import {createHandler} from 'graphql-sse/lib/use/http';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchemaSync} from '@graphql-tools/load'
import {cfg} from '../config/index.js'
import fs from 'fs'
import {makeExecutableSchema} from '@graphql-tools/schema/makeExecutableSchema'
import {createResolvers} from './resolvers.js'
import {createClient} from '../clients/temporal/index.js'


const resolvers = createResolvers(await createClient(cfg.Temporal))

const typeDefs = loadSchemaSync("../graphql/app.graphql", {
    loaders: [new GraphQLFileLoader()],
});
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

let options = {}
if (cfg.PubSub.mtls && cfg.PubSub.mtls.keyFile && cfg.PubSub.mtls.certChainFile) {
    options = {
        key: fs.readFileSync(cfg.PubSub.mtls.keyFile),
        cert: fs.readFileSync(cfg.PubSub.mtls.certChainFile),
    }
}
//Create the GraphQL over SSE handler
const sseHandler = createHandler({schema: schema});

// Create an HTTP server using the handler on `/sub`
const server = https.createServer(options, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    res.setHeader('Access-Control-Allow-Headers', 'content-type, accept'); // Might be helpful
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req?.url?.startsWith(cfg.PubSub.url.pathname)) {
        return await sseHandler(req, res);
    }
    res.writeHead(404).end();
});

server.listen(cfg.PubSub.url.port);
console.log(`Listening to ${cfg.PubSub.url.toString()}`)