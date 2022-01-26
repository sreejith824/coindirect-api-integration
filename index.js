const express = require("express");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const coutriesRoutes = require("./routes/coutriesRoutes");
const currenciesRoutes = require("./routes/currenciesRoutes");
const logger = require("./util/logger")

const app = express();
const port = process.env.PORT || 3000;

app.use("/countries", coutriesRoutes);
app.use("/currencies", currenciesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  logger.log("info", "Application listening on port %s", port);
});

module.exports = app;
