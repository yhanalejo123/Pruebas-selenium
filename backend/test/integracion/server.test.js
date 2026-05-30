const request = require('supertest');
const app = require('../../server');
const expect = require('chai').expect;

describe('API de integración', () => {
  it('GET /api/products debe responder 404 y devolver un array JSON', async () => {
            const respuesta = await request(app).get("/api/user");
    expect(respuesta.status).to.equal(404)
  }
    )
  })


describe("API crear productos", () =>
  it("POST /product.create testear si corre el microservicio ", async () => {


    
  })







)
