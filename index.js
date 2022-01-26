const express = require("express");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const coutriesRoutes = require("./routes/coutriesRoutes");
const currenciesRoutes = require("./routes/currenciesRoutes");

const app = express();
const port = 3000;

app.use("/countries", coutriesRoutes);
app.use("/currencies", currenciesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});

module.exports = app;
