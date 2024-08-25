# typescript

This has two applications, `bff` and `domain` for serving the application.

### GraphQL support

```bash
cd typescript
npm run codegen # update with latest app.graphql spec
npm start # starts the bff/index.ts graphql server
open http://localhost:4000
```

You can very a mutation works with the resolvers in Graphiql using:

```text
mutation ExecuteWorkflow($input:ExecuteWorkflowRequest!) {
  executeWorkflow(input:$input){
    value
  }
}
```

with variables

```text
{
  "input":{
    "value": "someuniquevalue"
  }
}
```