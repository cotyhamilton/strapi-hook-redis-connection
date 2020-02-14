'use strict';

/**
 * Module dependencies
 */

// Public
const Redis = require('ioredis');

/**
 * Redis hook
 */

module.exports = function(strapi) {
  const hook = {

    /**
     * Initialize the hook
     */

    async initialize() {

      const { config } = strapi.config.hook['redis-connection'];

      strapi.services.redis = new Redis(config);

      strapi.services.redis.on('connect', function(){
        strapi.log.info('Redis connection successful');
      });

      strapi.services.redis.on('error', err => {
        strapi.log.error('Redis ' + err);
      });

    },
  };

  return hook;
};
