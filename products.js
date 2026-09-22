// Catálogo de productos — versión para el navegador.
// IMPORTANTE: si cambias precios o añades productos aquí, actualiza también
// el mismo catálogo en /api/_products.js (el servidor no confía en este archivo,
// solo lo usa para pintar la tienda; el precio real que se cobra sale del servidor).
const PRODUCTS = [
  { id: 'malla-ganadera',        name: 'Malla ganadera galvanizada',       desc: 'Rollo de 50 m. Para fincas y control de ganado.',        price: 58.08, icon: '🐄' },
  { id: 'malla-cinegetica',      name: 'Malla cinegética galvanizada',     desc: 'Rollo de 50 m. Cumple normativa de paso de fauna.',      price: 62.50, icon: '🦌' },
  { id: 'valla-hercules',        name: 'Valla Hércules galvanizada',       desc: 'Rollo de 25 m. Panel soldado de alta resistencia.',      price: 74.90, icon: '🛡️' },
  { id: 'malla-simple-torsion',  name: 'Malla simple torsión galvanizada', desc: 'Rollo de 25 m. La opción más económica.',                price: 43.56, icon: '🔗' },
  { id: 'malla-electrosoldada',  name: 'Malla electrosoldada galvanizada', desc: 'Rollo de 25 m. Rígida y estable.',                       price: 41.38, icon: '⬛' },
  { id: 'malla-gallinera',       name: 'Malla gallinera galvanizada',      desc: 'Rollo de 25 m. Para gallineros y corrales.',             price: 27.30, icon: '🐔' },
];
