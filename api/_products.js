// Catálogo de productos — versión SERVIDOR.
// Esta es la fuente de verdad de los precios: el checkout SIEMPRE cobra
// el precio de aquí, nunca el que venga del navegador. Si cambias algo,
// cambia también /products.js para que la tienda lo muestre igual.
module.exports = {
  // Mallas metálicas
  'malla-ganadera':       { name: 'Malla ganadera galvanizada (rollo 50 m)',       price: 58.08 },
  'malla-cinegetica':     { name: 'Malla cinegética galvanizada (rollo 50 m)',     price: 62.50 },
  'valla-hercules':       { name: 'Valla Hércules galvanizada (rollo 25 m)',       price: 74.90 },
  'malla-simple-torsion': { name: 'Malla simple torsión galvanizada (rollo 25 m)', price: 43.56 },
  'malla-electrosoldada': { name: 'Malla electrosoldada galvanizada (rollo 25 m)', price: 41.38 },
  'malla-gallinera':      { name: 'Malla gallinera galvanizada (rollo 25 m)',      price: 27.30 },

  // Postes metálicos
  'poste-hercules':       { name: 'Poste para valla Hércules (2 m)',               price: 9.90 },
  'poste-simple-torsion': { name: 'Poste para simple torsión (2 m)',               price: 6.50 },

  // Puertas para vallado
  'puerta-peatonal':      { name: 'Puerta peatonal galvanizada (1 m)',             price: 89.00 },
  'puerta-abatible':      { name: 'Puerta abatible de dos hojas (4 m)',            price: 249.00 },

  // Alambres
  'alambre-espino':       { name: 'Alambre de espino galvanizado (rollo 500 m)',   price: 34.90 },
  'alambre-liso':         { name: 'Alambre liso galvanizado (rollo 100 m)',        price: 19.90 },

  // Kits de vallado
  'kit-basico-25m':       { name: 'Kit de vallado básico (25 m)',                  price: 189.00 },

  // Accesorios
  'grapa-malla-h':        { name: 'Grapa de fijación malla H (bolsa 100 uds)',     price: 7.90 },
  'tensor-galvanizado':   { name: 'Tensor galvanizado (unidad)',                   price: 3.20 },

  // Jardinería
  'malla-ocultacion':     { name: 'Malla de ocultación verde (rollo 1x25 m)',      price: 29.90 },
};
