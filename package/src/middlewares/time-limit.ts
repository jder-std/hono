/**
 * Time limit module
 * @module time-limit
 */

import type { Context, MiddlewareHandler } from "hono";

import { HTTPException } from "hono/http-exception";
import { timeout } from "hono/timeout";

import { createJsonResponse } from "#/response/json";

/** Options for `timeLimit` middleware. */
type TimeLimitOptions = {
    /** Maximum time in milliseconds. */
    max: number;
};

/**
 * Time limit middleware.
 *
 * For more information, please refer to
 * [Timeout](https://hono.dev/docs/middleware/builtin/timeout).
 *
 * ### Example
 *
 * ```ts
 * import { Hono } from "hono";
 * import { timeLimit } from "@jderjs/hono/time-limit";
 *
 * const app: Hono = new Hono();
 *
 * app.use(
 *     timeLimit({
 *         max: 10 * 1000, // 10s
 *     })
 * );
 * ```
 */
const timeLimit = (options: TimeLimitOptions): MiddlewareHandler => {
    return timeout(options.max, (context: Context): HTTPException => {
        return new HTTPException(408, {
            res: createJsonResponse({
                context,
                success: false,
                status: 408,
                error: {
                    code: "timeout",
                },
            }),
        });
    });
};

export type { TimeLimitOptions };
export { timeLimit };
