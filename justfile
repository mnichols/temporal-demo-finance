set dotenv-load := true

codegen:
    npm run codegen --prefix ui/web
    npm run codegen --prefix typescript

kill_temporal:
    -@killall temporal

local_temporal:
    if test ! -n "$(lsof -i :7233)"; then $(temporal server start-dev); fi

run_web:
    @echo "Starting ui/web at $PUBLIC_WEB_URL"
    npm run dev --prefix ui/web

run_ts_bff:
    @echo "Starting TypeScript BFF at $PUBLIC_GRAPHQL_URL"
    npm run bff --prefix typescript
run_ts_pubsub:
    @echo "Starting TypeScript PubSub at $PUBLIC_SUBSCRIPTIONS_URL"
    npm run pubsub --prefix typescript

run_ts_domain:
    @echo "Starting TypeScript Domain $TEMPORAL_CONNECTION_MTLS_KEY_FILE"
    npm start --prefix typescript