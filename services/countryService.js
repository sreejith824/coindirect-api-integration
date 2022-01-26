const coinDirectAPIClient = require("../subscribres/coinDirectAPIClient");
const Country = require("../models/country");
const logger = require("../util/logger")

async function getCountries(queryParam) {
  try {
    let responseObject;
    if (queryParam.maxresult && queryParam.maxresult) {
      responseObject = await coinDirectAPIClient.getCountries(
        queryParam.offset,
        queryParam.maxresult
      );
    } else if (queryParam.maxresult == null) {
      responseObject = await coinDirectAPIClient.getCountries(queryParam.offset,1);
      responseObject = await coinDirectAPIClient.getCountries(
        queryParam.offset,
        responseObject.totalCount
      );
    }

    let countries = addCountriesOnQueryParams(responseObject.data);
    //TODO: invoke coinDirectAPIClient.getCountries() and addCountriesOnQueryParams(responseObject.data, countries) in a loop to support pagination;
    sortCountries(countries, queryParam);
    logger.log("info", "getCountries response", countries);
    return {
      "countries" : countries,
      "lastIndex": (responseObject.startIndex ? parseInt(responseObject.startIndex) : 0) + (queryParam.maxresult ? parseInt(queryParam.maxresult) : parseInt(responseObject.totalCount)),
      "totalCount" : responseObject.totalCount
    }  
  } catch (error) {
    logger.log("error", "error", error);
    throw new Error("Error in getting countries.")
  }

  function sortCountries(countries, queryParam) {
    if (queryParam.sortOrderOnName === "ASC") {
      countries.sort(sortOnNameAscending);
    } else if (queryParam.sortOrderOnName === "DSC") {
      countries.sort(sortOnNameDescending);
    }

    if (queryParam.sortOrderOnCurrency === "ASC") {
      countries.sort(sortOnCurrencyAscending);
    } else if (queryParam.sortOrderOnCurrency === "DSC") {
      countries.sort(sortOnCurrencyDescending);
    }
  }

  function addCountriesOnQueryParams(countryMasterObjects) {
    let countries = [];
    if (Object.keys(countryMasterObjects).length != 0) {
      countryMasterObjects.forEach((countryMasterObject) => {
        if (queryParam.name && queryParam.currency) {
          if (
            queryParam.name === countryMasterObject.name &&
            queryParam.currency === countryMasterObject.defaultCurrency
          ) {
            addCountry(countryMasterObject, countries);
          }
        } else if (queryParam.name) {
          if (queryParam.name === countryMasterObject.name) {
            addCountry(countryMasterObject, countries);
          }
        } else if (queryParam.currency) {
          if (queryParam.currency === countryMasterObject.defaultCurrency) {
            addCountry(countryMasterObject, countries);
          }
        } else {
          addCountry(countryMasterObject, countries);
        }
      });
    }
    return countries;
  }

  function addCountry(countryMasterObject, countries) {
    let maxWithdrawal = countryMasterObject.options
      ? countryMasterObject.options.withdrawalMaximum
      : null;
    countries.push(
      new Country(
        countryMasterObject.name,
        countryMasterObject.defaultCurrency,
        countryMasterObject.documents,
        maxWithdrawal
      )
    );
  }

  function sortOnNameAscending(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function sortOnNameDescending(a, b) {
    if (a.name < b.name) {
      return 1;
    }
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  }

  function sortOnCurrencyAscending(a, b) {
    if (a.defaultCurrency < b.defaultCurrency) {
      return -1;
    }
    if (a.defaultCurrency > b.defaultCurrency) {
      return 1;
    }
    return 0;
  }

  function sortOnCurrencyDescending(a, b) {
    if (a.defaultCurrency < b.defaultCurrency) {
      return 1;
    }
    if (a.defaultCurrency > b.defaultCurrency) {
      return -1;
    }
    return 0;
  }
}

module.exports = { getCountries };
