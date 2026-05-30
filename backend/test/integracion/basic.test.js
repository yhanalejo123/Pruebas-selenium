const expect = require('chai').expect;

describe('Tests básicos', () => {
  it('debería pasar', () => {
    expect(true).to.equal(true);
  });

  it('debería sumar correctamente', () => {
    expect(1 + 1).to.equal(2);
  });
});
