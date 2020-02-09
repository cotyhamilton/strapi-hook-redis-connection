# strapi-hook-redis-connection
[![npm version](https://img.shields.io/npm/v/strapi-hook-redis-connection.svg)](https://www.npmjs.org/package/strapi-hook-redis-connection)

This hook connects to Redis and exposes the connection as a global service

## Installation

```shell
$ yarn add strapi-hook-redis-connection

# or

$ npm i strapi-hook-redis-connection --save
```

## Configuration

To configure your hook with custom options, you need to edit your `./config/hook.json` file in your Strapi app.

```javascript
{
  ...
  "redis-connection": {
    "enabled": true,
    "host": "${process.env.REDIS_HOST || 'localhost'}",
    "port": "${process.env.REDIS_PORT || 6379}",
    "password": "${process.env.REDIS_PASSWORD || 'hunter42'}"
  }
}
```

## Usage

Example to publish messages in a controller

```javascript
module.exports = {
  index: async (ctx) => {
    const redis = strapi.services.redis;

    if (ctx.request.body.model) {
      redis.publish(ctx.request.body.model, ctx.request.body.event);
    }

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
};
```

## Resources

- [Strapi Documentation](https://strapi.io/documentation/3.0.0-beta.x/getting-started/introduction.html)
