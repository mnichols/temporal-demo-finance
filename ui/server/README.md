# ui/server

This package is for testing the UI integration, _not_ for supporting the UI with an actual
API.

### Subscriptions

There are two demonstrations of how to wire up GraphQL Subscriptions. The implementation here uses Server-Side events (
SSE).

Verify GraphQL Subscriptions by:

1. `npm run sse-server`: This starts a SSE Server that publishes the time every second
2. `cd $ROOT/ui/web && npm run dev`
3. `open https://localhost:5733/diag`
    1. Alternate implementation is `https://localhost:5733/diag/simple`
