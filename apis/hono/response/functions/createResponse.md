[@jderjs/hono](../../README.md) / [response](../README.md) / createResponse

# Function: createResponse()

## Call Signature

```ts
function createResponse<B>(options?): Response;
```

Defined in: [packages/hono/src/response/common/index.ts:51](https://github.com/jder-std/hono/blob/8c7789aedbc9936c4862cd649747186bca01fdb1/packages/hono/src/response/common/index.ts#L51)

Create a response.

### Examples

Example for creating a basic response:

```ts
import { createResponse } from "@jderjs/hono";

const route = (): Response => {
    return createResponse();
};
```

Example for creating a response with status, headers, and body:

```ts
import { createResponse } from "@jderjs/hono";

const route = (): Response => {
    return createResponse({
        status: 404,
        headers: [
            ["Content-Type", "text/plain"],
        ],
        body: "Not Found",
    });
};
```

### Type Parameters

#### B

`B` *extends* `BodyInit` = `BodyInit`

### Parameters

#### options?

##### body?

`B`

Body of the response.

##### headers?

`HeadersInit`

Additional headers of the response.

##### status?

`StatusCode`

Status code of the response.
By default, it is `200` for success and `400` for failure.

### Returns

`Response`

## Call Signature

```ts
function createResponse<B>(context?, options?): Response;
```

Defined in: [packages/hono/src/response/common/index.ts:90](https://github.com/jder-std/hono/blob/8c7789aedbc9936c4862cd649747186bca01fdb1/packages/hono/src/response/common/index.ts#L90)

Create a response with context.

### Examples

Example for creating a basic response:

```ts
import type { Context } from "hono";

import { createResponse } from "@jderjs/hono";

const route = (c: Context): Response => {
    return createResponse(c);
};
```

Example for creating a response with status, headers, and body:

```ts
import type { Context } from "hono";

import { createResponse } from "@jderjs/hono";

const route = (c: Context): Response => {
    return createResponse(c, {
        status: 404,
        headers: [
            ["Content-Type", "text/plain"],
        ],
        body: "Not Found",
    });
};
```

### Type Parameters

#### B

`B` *extends* `BodyInit` = `BodyInit`

### Parameters

#### context?

`Context`\<`any`, `any`, \{
\}\>

#### options?

##### body?

`B`

Body of the response.

##### headers?

`HeadersInit`

Additional headers of the response.

##### status?

`StatusCode`

Status code of the response.
By default, it is `200` for success and `400` for failure.

### Returns

`Response`
