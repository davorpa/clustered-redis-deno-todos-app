FROM denoland/deno:1.31.2

# The port that your application listens to.
EXPOSE 8000

# Prefer not to run as root.
USER deno

WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --unstable --importmap=import_map.json --lock=deno.lock --lock-write src/index.ts

CMD ["task", "start"]
