const axios = require("axios");

async function getCountries(offset, maxresult) {
  try {
    const response = await axios.get("https://api.coindirect.com/api/country", {
      params: { offset: offset, max: maxresult, enabled: true },
    });
    let responseObject = {
      data: response.data,
      startIndex: response.headers["x-api-list-start"],
      totalCount: response.headers["x-api-list-total"],
    };
    return responseObject;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getCountries };