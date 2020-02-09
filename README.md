# strapi-hook-redis-connection
[![npm version](https://img.shields.io/npm/v/strapi-hook-redis-connection.svg)](https://www.npmjs.org/package/strapi-hook-redis-connection)

This hook connects to Redis and exposes the connection as a global service

## Configuration

To configure your hook with custom options, you need to edit your `./config/hook.json` file in your Strapi app.

```javascript
{
  ...
  "redis": {
    "enabled": true,
    "host": "localhost",
    "port": 6379,
    "password": 'hunter42',
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
