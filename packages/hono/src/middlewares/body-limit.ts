/**
 * Body limit module
 * @module middlewares/body-limit
 */

import type { Context, MiddlewareHandler } from "hono";

import { bodyLimit as _bodyLimit } from "hono/body-limit";

import { createJsonResponse } from "#/response/json";

/** Options for `bodyLimit` middleware. */
type BodyLimitOptions = {
    /** Maximum body size in bytes. */
    max: number;
};

/**
 * Body limit middleware.
 *
 * Following error will be returned if the body size is over the limit:
 *
 * ```jsonc
 * // Status: 413
 * {
 *     "success": false,
 *     "error": {
 *         "code": "too_large",
 *         "field": "body"
 *     }
 * }
 * ```
 *
 * For more information, please refer to
 * [Body Limit](https://hono.dev/docs/middleware/builtin/body-limit).
 *
 * ### Example
 *
 * ```ts
 * import { Hono } from "hono";
 * import { bodyLimit } from "@jderjs/hono/body-limit";
 *
 * const app: Hono = new Hono();
 *
 * app.use(
 *     bodyLimit({
 *         max: 10 * 1024 * 1024, // 10MiB
 *     })
 * );
 * ```
 */
const bodyLimit = (options: BodyLimitOptions): MiddlewareHandler => {
    return _bodyLimit({
        maxSize: options.max,
        onError: (c: Context): Response => {
            return createJsonResponse(c, {
                success: false,
                status: 413,
                error: {
                    code: "too_large",
                    field: "body",
                },
            });
        },
    });
};

export type { BodyLimitOptions };
export { bodyLimit };
