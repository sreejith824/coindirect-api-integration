module.exports = class Country {
  constructor(name, currency, requiredDocuments, maxWithdrawal) {
    this.name = name;
    this.currency = currency;
    this.requiredDocuments = requiredDocuments;
    this.maxWithdrawal = maxWithdrawal;
  }
}