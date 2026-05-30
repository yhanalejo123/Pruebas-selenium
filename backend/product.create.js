const db = require('./database');

function createProduct(productData, callback, dbInstance = db) {
  const { name, description, price, stock, image_url } = productData;

  // Validaciones básicas
  if (!name || typeof price !== 'number' || price <= 0) {
    return callback({ message: 'Nombre y precio son requeridos, y el precio debe ser mayor a 0' });
  }

  if (stock < 0) {
    return callback({ message: 'El stock no puede ser negativo' });
  }

  // Insertar en la base de datos
  dbInstance.run(
    `INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)`,
    [name, description || '', price, stock || 0, image_url || ''],
    function(err) {
      if (err) {
        return callback(err);
      }
      // Retornar el ID del nuevo producto
      callback(null, { id: this.lastID, ...productData });
    }
  );
}

module.exports = { createProduct };