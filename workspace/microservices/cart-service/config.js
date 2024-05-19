const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  'resistry-service': {
    url: process.env.REGISTRY_SERVICE_URL || "http://localhost:3080",
  },
  redis: {
    options: {
      url: process.env.REDIS_URL || "redis://localhost:7379"
    },
    client: null
  }
};
