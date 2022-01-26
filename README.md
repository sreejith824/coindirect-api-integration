# coindirect-api-integration

Integrating with API https://coindirect.docs.stoplight.io/geo/geo-api/countries/listcountries to get,
- A list of all countries
    - With the following attributes:
        - Name
        - Currency
        - Required documentation
        - Max withdrawal
    - Filtering (Ascending - Descending) on Name and Currency
- A list of all currencies with information on which countries use the currency.

# How to test
Please follow below steps to start the app. Prerequesite is to have Nodejs 14 or above.
```shell
$git clone https://github.com/sreejith824/coindirect-api-integration.git
$cd coindirect-api-integration
$npm ci
$node index.js
````
Successfull completion of above steps will start node server. Node server exposes a swagger documentation at http://localhost:3000/api-docs/, which could use for testing. 