const express = require("express");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const countryService = require("./services/countryService");
const currencyService = require("./services/currencyService");

const app = express();
const port = 3000;

app.get("/countries", async (req, res) => {
  let queryParam = {};
  queryParam.name = req.query.name;
  queryParam.currency = req.query.currency;
  queryParam.sortOrderOnName = req.query.sortOrderOnName;
  queryParam.sortOrderOnCurrency = req.query.sortOrderOnCurrency;
  queryParam.offset = req.query.offset;
  queryParam.maxresult = req.query.maxresult;
  console.log(queryParam)
  res.send(await countryService.getCountries(queryParam));
});

app.get("/currencies", async (req, res) => {
  res.send(await currencyService.getCurrencies());
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
