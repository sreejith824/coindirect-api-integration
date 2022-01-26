const express = require("express");

const currencyService = require("../services/currencyService");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send(await currencyService.getCurrencies());
});

module.exports = router;
