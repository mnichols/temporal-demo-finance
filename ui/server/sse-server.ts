import https from 'https';
import {createHandler} from 'graphql-sse/lib/use/http';
import {printSchema} from 'graphql'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchemaSync} from '@graphql-tools/load'

import fs from 'fs'
import {makeExecutableSchema} from '@graphql-tools/schema/makeExecutableSchema'
import {resolvers} from './resolvers.js'

const typeDefs = loadSchemaSync("../../graphql/diag.graphql", {
    loaders: [new GraphQLFileLoader()],
});
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})
console.log(printSchema(typeDefs));

const options = {
    key: fs.readFileSync('../../localhost-client-key.pem'),
    cert: fs.readFileSync('../../localhost-client.pem'),
};

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

    if (req?.url?.startsWith('/sub')) {
        return await sseHandler(req, res);
    }
    res.writeHead(404).end();
});

server.listen(4000);
console.log('Listening to port 4000');