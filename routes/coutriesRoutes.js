const express = require("express");

const countryService = require("../services/countryService");
const router = express.Router();

router.get("/", async (req, res) => {
  let queryParam = {};
  queryParam.name = req.query.name;
  queryParam.currency = req.query.currency;
  queryParam.sortOrderOnName = req.query.sortOrderOnName;
  queryParam.sortOrderOnCurrency = req.query.sortOrderOnCurrency;
  queryParam.offset = req.query.offset;
  queryParam.maxresult = req.query.maxresult;
  console.log(queryParam);
  res.send(await countryService.getCountries(queryParam));
});

module.exports = router;
