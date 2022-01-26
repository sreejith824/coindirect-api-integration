const app = require("../index");
const supertest = require("supertest");
const { response } = require("../index");

test("GET /currencies", async () => {
  await supertest(app).get("/currencies")
    .expect(200).then((response) => {
      expect(response.body).toEqual(expect.any(Object));
    });
});

test("GET /countries?name=Norway", async () => {
  await supertest(app).get("/countries?name=Norway")
    .expect(200).then((response) => {
      expect(response.body).toEqual(expect.any(Object));
    });
});

test("GET /countries?name=Norway", async () => {
  await supertest(app).get("/countries?name=Norway")
    .expect(200).then((response) => {
      expect(response.body.countries[0].name).toEqual("Norway");
    });
});

test("GET /countries?currency=NOK", async () => {
  await supertest(app).get("/countries?currency=NOK")
    .expect(200).then((response) => {
      expect(response.body.countries[0].name).not.toEqual("Sweden");
    });
});

test("GET /countries?currency=ABC", async () => {
  await supertest(app).get("/countries?currency=ABC")
    .expect(200).then((response) => {
      expect(response.body.countries).toHaveLength(0);
    });
});