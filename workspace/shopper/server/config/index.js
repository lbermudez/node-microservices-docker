// Import the package.json file to grab the package name and the version
const pkg = require("../../package.json");

// Export a configuration object
module.exports = {
  // Use the name field from package.json as the application name
  serviceName: pkg.name,
  serviceVersion: pkg.version,

  registry: {
    url: process.env.REGISTRY_SERVICE_URL || "http://localhost:3080",
    version: "*"
  },
  // Redis configuration
  redis: {
    // Connection options for the Redis server
    options: {
      // Connection URL for the Redis server
      url: process.env.REDIS_URL || "redis://localhost:7379"
    },
    // Placeholder for the Redis client, to be connected elsewhere
    client: null
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://localhost:5672"
  },
  "open-telemetry-collector": {
    url: process.env.OPENTELEMETRY_URL || "http://localhost:4318/v1/traces"
  }
};
