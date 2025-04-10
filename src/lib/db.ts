export async function getDB(env: CloudflareEnv) {
  return env.DB;
}