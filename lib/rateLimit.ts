// Basic in-memory sliding window rate limiter
const ipRequests = new Map<string, number[]>();

// Periodically clean up extremely stale IPs to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    for (const [ip, timestamps] of ipRequests.entries()) {
      const active = timestamps.filter((time) => now - time < oneHour);
      if (active.length === 0) {
        ipRequests.delete(ip);
      } else {
        ipRequests.set(ip, active);
      }
    }
  }, 10 * 60 * 1000); // run every 10 minutes
}

/**
 * Checks if a given IP has exceeded its request limit.
 * @param ip Client IP address
 * @param limit Max number of requests allowed in the window
 * @param windowMs Time window in milliseconds (default 1 minute)
 * @returns boolean true if allowed, false if rate-limited
 */
export function isAllowed(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, [now]);
    return true;
  }
  
  const timestamps = ipRequests.get(ip) || [];
  
  // Filter timestamps within the window
  const recentTimestamps = timestamps.filter((time) => now - time < windowMs);
  
  if (recentTimestamps.length >= limit) {
    // Exceeded limit
    ipRequests.set(ip, recentTimestamps);
    return false;
  }
  
  recentTimestamps.push(now);
  ipRequests.set(ip, recentTimestamps);
  return true;
}
