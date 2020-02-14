# strapi-hook-redis-connection
[![npm version](https://img.shields.io/npm/v/strapi-hook-redis-connection.svg)](https://www.npmjs.org/package/strapi-hook-redis-connection)
[![npm downloads](https://img.shields.io/npm/dt/strapi-hook-redis-connection.svg)](https://www.npmjs.org/package/strapi-hook-redis-connection)

This hook connects to Redis and exposes the connection as a global service through strapi. It uses the [ioredis](https://github.com/luin/ioredis) package

## Installation

```shell
$ yarn add strapi-hook-redis-connection

# or

$ npm i strapi-hook-redis-connection --save
```

## Configuration

To configure the hook edit the `./config/hook.json` file in your Strapi app. The `config` object is passed to ioredis directly, consult ioredis docs for more info.

```javascript
{
  ...
  "redis-connection": {
    "enabled": true,
    "config": {
      "host": "${process.env.REDIS_HOST}", // Redis host
      "port": "${process.env.REDIS_PORT}",  // Redis port
      "password": "${process.env.REDIS_PASSWORD}",
      "family": "${process.env.REDIS_FAMILY}", // 4 (IPv4) or 6 (IPv6)
      "db": "${process.env.REDIS_DB}"
    }
  }
}

{
  ...
  "redis-connection": {
    "enabled": true,
    // Connect to 127.0.0.1:6380, using password "authpassword"
    "config": "redis://:authpassword@127.0.0.1:6380"
  }
}
```

## Usage

Example to publish messages in a controller

```javascript
module.exports = {
  index: async (ctx) => {
    const redis = strapi.services.redis;

    if (ctx.request.body.model && ctx.request.body.event) {
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

- [ioredis](https://github.com/luin/ioredis)
- [Strapi Documentation](https://strapi.io/documentation/3.0.0-beta.x/getting-started/introduction.html)
