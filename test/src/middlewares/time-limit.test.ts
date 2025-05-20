import { createJsonResponse } from "@jderjs/hono/response";
import { timeLimit } from "@jderjs/hono/time-limit";
import { Hono } from "hono";
import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";

const app = new Hono()
    .use(
        timeLimit({
            max: 500,
        }),
    )
    .get("/ok", (): Response => {
        return createJsonResponse();
    })
    .get("/timeout", async (): Promise<Response> => {
        await new Promise((r) => setTimeout(r, 1000));
        return createJsonResponse();
    });

const client = testClient(app);

describe("Time limit test", (): void => {
    it("should work", async (): Promise<void> => {
        const res = await client.ok.$get();

        expect(res.status).toBe(200);

        expect(await res.json()).toStrictEqual({
            success: true,
        });
    });

    it("should timeout", async (): Promise<void> => {
        const res = await client.timeout.$get();

        expect(res.status).toBe(408);

        expect(await res.json()).toStrictEqual({
            success: false,
            error: {
                code: "timeout",
            },
        });
    });
});
