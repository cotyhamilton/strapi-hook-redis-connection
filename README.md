# strapi-hook-redis-connection
[![npm version](https://img.shields.io/npm/v/strapi-hook-redis-connection.svg)](https://www.npmjs.org/package/strapi-hook-redis-connection)
[![npm downloads](https://img.shields.io/npm/dt/strapi-hook-redis-connection.svg)](https://www.npmjs.org/package/strapi-hook-redis-connection)

This hook connects to Redis and exposes the connection as a global service through strapi. It uses the [ioredis](https://github.com/luin/ioredis) package

This hook is compatible with the stable version (3.x) of Strapi only.

## Installation

```shell
$ yarn add strapi-hook-redis-connection

# or

$ npm i strapi-hook-redis-connection --save
```

## Configuration

To configure the hook edit or add the `./config/hook.js` file in your Strapi app. The `config` object is passed to ioredis directly, consult ioredis docs for more info.

```javascript

module.exports = ({ env }) => ({
    timeout: 2000,
    settings: {
        'redis-connection': {
            enabled: false,
            config: {
                host: env('REDIS_HOST', '127.0.0.1'), // Redis host
                port: env.int('REDIS_PORT', 6379), // Redis port
                password: env('REDIS_PASSWORD', '')
            }
        }
    },
});
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
- [Strapi Documentation](https://strapi.io/documentation/v3.x/getting-started/introduction.html)
