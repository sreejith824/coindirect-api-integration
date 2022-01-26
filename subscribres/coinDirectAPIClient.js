const axios = require("axios");
const logger = require("../util/logger")

const URL = process.env.URL || "https://api.coindirect.com";

async function getCountries(offset, maxresult) {
  try {
    const response = await axios.get(URL + "/api/country", {
      params: { offset: offset, max: maxresult, enabled: true },
    });
    let responseObject = {
      data: response.data,
      startIndex: response.headers["x-api-list-start"],
      totalCount: response.headers["x-api-list-total"],
    };
    return responseObject;
  } catch (error) {
    logger.log("error", "error", error);
    throw new Error("Error in Accessing API.")
  }
}

module.exports = { getCountries };
