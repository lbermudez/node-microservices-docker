const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  mongodb: {
    url: process.env.MONGO_URL || "mongodb://localhost:37017/shopper"
  },
  "resistry-service": {
    url: process.env.REGISTRY_SERVICE_URL || "http://localhost:3080",
  }
};
