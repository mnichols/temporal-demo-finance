# create-temporal-app

## Setup

Let's assume you are using `localhost` for your local services.

### HTTPS everything

1. Install [mkcert](https://github.com/FiloSottile/mkcert).
1. `mkcert -install` (this just installs the CA to your system)
1. `mkcert -client localhost` (this makes all our `localhost` servers ok for HTTPS)
    1. Note that it creates `localhost-client.pem` and `localhost-client-key.pem` files in our root dir
    2. We will use these from our different servers to serve over https where needed

## UI

## Overview

**App**

The UI is all in on [SvelteKit](https://kit.svelte.dev/).

**Data**

The UI is all in on [GraphQL](https://graphql.org/):

- CodeGen: [codegen](https://the-guild.dev/graphql/codegen)
- Client: [urql](https://commerce.nearform.com/open-source/urql/docs/api/svelte/)
- Subscriptions: [graphql-sse](https://the-guild.dev/graphql/sse/recipes#with-urql).

**Style**

The UI is all in on

- [TailwindCSS](https://tailwindcss.com/)
- With some help from [DaisyUI](https://daisyui.com/)

**References**

- https://svelte.dev/
- https://the-guild.dev/graphql/tools/docs/introduction
- https://the-guild.dev/graphql/sse/get-started

**Logging**

The UI is all in on [roarr](https://github.com/gajus/roarr).

### Running The UI

You can `just run_web` and open `https://localhost:{.env/WEB_PORT}`.

Or you want to isolate this:

1. Set environment variables with `.env` in the `ui/web` root.
2. `npm run dev` starts an HTTPS dev server.

### Testing The UI

We use `vitest` to test our UI.
The `describe`, `beforeEach`, etc are globally available because we drop the `types`
to `vitest/globals` [here](ui/web/tsconfig.json).
Be sure you have the `global:true` in your `test.globals` set up in
your `vitest.config.ts` [also](ui/web/vitest.config.ts).

Note we are using the [msw](https://mswjs.io/) package for mock server testing.

#### Example

Check out the [mock-server-urql-integration](ui/web/src/lib/http/mock-server/mock-server-urql-integration.test.ts) to
see
how to stub out requests to your GraphQL API.

### Diagnostics

#### GraphQL Subscriptions

The **urql** client in the UI uses GraphQL subscriptions backed by Server-Side events (SSE).
You can learn how to leverage GraphQL Subscriptions by visiting the [diag pages](ui/web/src/routes/(public)/diag) pages.

Support for a [simple "ping pong" subscription](ui/web/src/lib/operations/subscriptions/pingsub.graphql) can be done by:

1. `cd <ROOT>/ui/server`
1. `npm start`
    1. Starts a SSE Server that emits current time prepended by subscription input args
1. `cd <ROOT>/ui/web`
1. `npm run dev`

Visit the page at `https://localhost:<port>/diag`.

##### How It Works

The `urql` client instance in this UI delegates to a `graphql-sse` client instance for handling GraphQL Subscriptions.
You must provide a `PUBLIC_SUBSCRIPTIONS_URL` environment variable to point to your SSE Server.

**References**

- [urql SubscriptionStore docs](https://commerce.nearform.com/open-source/urql/docs/advanced/subscriptions/)
- [urql Subscriptions with Svelte docs](https://commerce.nearform.com/open-source/urql/docs/advanced/subscriptions/#svelte)
- [GraphQL-SSE client and server package](https://the-guild.dev/graphql/sse)
- Putting urql and graphql-sse all together [here](https://the-guild.dev/graphql/sse/recipes#with-urql)

