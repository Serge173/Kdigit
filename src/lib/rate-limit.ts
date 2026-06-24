const stores = new Map<string, Map<string, { count: number; resetAt: number }>>();

export function checkRateLimit(
  namespace: string,
  key: string,
  limit: number,
  windowMs = 3_600_000
): boolean {
  if (limit <= 0) return true;

  let bucket = stores.get(namespace);
  if (!bucket) {
    bucket = new Map();
    stores.set(namespace, bucket);
  }

  const now = Date.now();
  const entry = bucket.get(key);

  if (!entry || now > entry.resetAt) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export function getRateLimitFromEnv(name: string, fallback: number) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}
