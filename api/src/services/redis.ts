import { createClient, createCluster, RedisClientOptions } from "npm:redis";
import config from "../config/index.ts";

/* pulls the Redis URL from .env */
const nodes = config.redisUrls.map((url) => ({ url }));

/* create a connection to Redis with Node Redis */
const client = createCluster({
  rootNodes: nodes as RedisClientOptions[],
  defaults: {
    pingInterval: 1000,
  },
});

// deno-lint-ignore no-explicit-any
client.on("error", (error: any) => {
  console.error("Redis Error", error);
});

client.on("connect", () => {
  console.log("Redis Connection stablished");
});

client.on("ready", () => {
  console.log("Redis client ready");
});

client.on("end", () => {
  console.log("Redis client connection ended");
});

// Emits when an error occurs when connecting
// to a node when using Redis in Cluster mode
// deno-lint-ignore no-explicit-any
client.on("node error", (error: any, node: any) => {
  console.error(`Redis error in node ${node}`, error);
});

client.connect().then(() => {
  console.log("🚀 Redis client connected on", config.redisUrls);
});

//
// Client Facade
//

export function keys(pattern: string) {
  return new Promise<string[]>((resolve, reject) => {
    const results = new Set<string>();
    const nodes = client.masters;
    // iterate nodes
    nodes.forEach(async (node, index) => {
      const client = createClient({
        url: "redis://" + node.address,
        pingInterval: 1000,
      });

      try {
        await client.connect();

        // handle operation
        const result = (await client.keys(pattern)) as unknown as string[];
        result.forEach((key) => results.add(key));

        // resolve promise when processing last node
        if (index === nodes.length - 1) {
          resolve(Array.from(results));
        }
      } catch (error) {
        reject(error);
      } finally {
        client.disconnect();
      }
    });
  });
}

export async function hSet(key: string, value: Record<string, unknown>) {
  await client.hSet(key, value);
}

export async function hGet(key: string) {
  const exists = await client.exists(key);
  if (exists) {
    const hash = await client.hGetAll(key);
    return hash as unknown as (Record<string, unknown>);
  }
  return null;
}

export async function del(key: string) {
  const count = await client.del(key) as unknown as number;
  return count > 0;
}
