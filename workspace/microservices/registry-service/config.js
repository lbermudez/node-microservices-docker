const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
};
