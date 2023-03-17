# TODO Tasks API package

This project is bootstrapped using following technologies:

- [Deno](https://deno.land): as TypeScript programming language runtime
- [Hono](https://hono.dev/getting-started/deno): as web framework ready for the
  Edge
- [Redis](https://redis.io): as No-SQL clustered database engine

## First Steps

To begin serving this project in development mode copy `.env.example` as `.env`
and fill accordingly...

```properties
# .env
PORT=8000
REDIS_URL=redis://172.19.0.11:6379,redis://172.19.0.12:6379,redis://172.19.0.13:6379,redis://172.19.0.14:6379,redis://172.19.0.15:6379,redis://172.19.0.16:6379
```

and then run this commands:

```shell
# Start Redis cluster
docker compose --file "../redis/docker-compose.yml" up -d
# Start API server
deno task dev
```

## Available Scripts

In a project where Deno is installed, you can use the `deno` binary in your
`deno` scripts, or run it directly with `deno run`. Here are the default deno
tasks defined in this API project:

### `deno task dev`

Runs the app in the development mode. By default in
[http://localhost:8000](http://localhost:8000) to access to REST API endpoints.

The app will reload automatically when you make changes into sources.

### `deno task start`

Runs the app in the production mode. By default in
[http://localhost:8000](http://localhost:8000) to access to REST API endpoints.

## License

The content of this project itself and the underlying source code used to format
and display that content is licensed under the
[The GNU Affero General Public License Version 3](../LICENSE).
