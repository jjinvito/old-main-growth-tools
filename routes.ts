/**
 * The array of routes accessible to public
 */

export const publicRoutes = ["/", "/submit", "/api/stripe/checkout-session", "api/webhooks"];

/**
 * The array of routes used for authentication
 */

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API Authentication routes Routes that starts with this prefix are used for API authentication purposes
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default login path after login
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
