const request = require('supertest');
const app = require('../../server');
const expect = require('chai').expect;

describe('API de integración', () => {
  it('GET /api/user debe responder 404', async () => {
    const respuesta = await request(app).get("/api/user");
    expect(respuesta.status).to.equal(404);
  });
});

describe("API crear productos", () => {
  it("POST /product.create debe responder", async () => {
    const respuesta = await request(app).post("/product.create");
    expect(respuesta.status).to.be.a('number');
  });
});



)
