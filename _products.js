// Catálogo de productos — versión SERVIDOR.
// Esta es la fuente de verdad de los precios: el checkout SIEMPRE cobra
// el precio de aquí, nunca el que venga del navegador. Si cambias algo,
// cambia también /products.js para que la tienda lo muestre igual.
module.exports = {
  'malla-ganadera':       { name: 'Malla ganadera galvanizada (rollo 50 m)',       price: 58.08 },
  'malla-cinegetica':     { name: 'Malla cinegética galvanizada (rollo 50 m)',     price: 62.50 },
  'valla-hercules':       { name: 'Valla Hércules galvanizada (rollo 25 m)',       price: 74.90 },
  'malla-simple-torsion': { name: 'Malla simple torsión galvanizada (rollo 25 m)', price: 43.56 },
  'malla-electrosoldada': { name: 'Malla electrosoldada galvanizada (rollo 25 m)', price: 41.38 },
  'malla-gallinera':      { name: 'Malla gallinera galvanizada (rollo 25 m)',      price: 27.30 },
};
