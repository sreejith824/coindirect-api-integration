const coinDirectAPIClient = require("../subscribres/coinDirectAPIClient");

async function getCurrencies(queryParam) {
  try {
    let responseObject = await coinDirectAPIClient.getCountries(0, 1);
    responseObject = await coinDirectAPIClient.getCountries(
      0,
      responseObject.totalCount
    );
    let countryMasterObjects = responseObject.data;
    let currencies = {};
    if (Object.keys(countryMasterObjects).length != 0) {
      countryMasterObjects.forEach((countryMasterObject) => {
        if (countryMasterObject.defaultCurrency) {
          if (currencies[countryMasterObject.defaultCurrency] == null) {
            currencies[countryMasterObject.defaultCurrency] = [];
          }
          currencies[countryMasterObject.defaultCurrency].push(
            countryMasterObject.name
          );
        }
      });
    }
    return currencies;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getCurrencies };
