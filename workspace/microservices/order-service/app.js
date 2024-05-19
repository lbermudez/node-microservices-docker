const express = require("express");

const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const config = require("./config");
const OrderService = require("./lib/OrderService");

const { connectToRabbitMQ } = require("./lib/rabbitMQConnection");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("tiny"));

// Mount the router
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // You can also log the error to a file or console
  console.error(err);

  res.status(status).json({
    error: {
      message,
      status
    }
  });
}); 

connectToRabbitMQ(config.rabbitmq.url, "orders", {retries: 0, maxRetries: 6, retryTime: 5000})

module.exports = app;
