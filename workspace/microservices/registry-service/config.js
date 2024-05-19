const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  "open-telemetry-collector": {
    url: process.env.OPENTELEMETRY_URL || "http://localhost:4318/v1/traces"
  }
};
