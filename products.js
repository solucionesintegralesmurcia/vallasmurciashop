// Catálogo de productos — versión para el navegador.
// IMPORTANTE: si cambias precios o añades productos aquí, actualiza también
// el mismo catálogo en /api/_products.js (el servidor no confía en este archivo,
// solo lo usa para pintar la tienda; el precio real que se cobra sale del servidor).
//
// Cada producto tiene "category" (para agrupar en la tienda) e "img" (imagen
// de muestra en /img/products/). Las imágenes actuales son ilustraciones
// genéricas para ver cómo queda la tienda — sustitúyelas por fotos reales de
// tu material o instalaciones cuando las tengas.
const CATEGORIES = [
  { id: 'mallas',     name: 'Mallas metálicas' },
  { id: 'postes',     name: 'Postes metálicos' },
  { id: 'puertas',    name: 'Puertas para vallado' },
  { id: 'alambres',   name: 'Alambres' },
  { id: 'kits',       name: 'Kits de vallado' },
  { id: 'accesorios', name: 'Accesorios' },
  { id: 'jardineria', name: 'Jardinería' },
];

const PRODUCTS = [
  // Mallas metálicas
  { id: 'malla-ganadera',       name: 'Malla ganadera galvanizada',       desc: 'Rollo de 50 m. Para fincas y control de ganado.',                 price: 58.08,  category: 'mallas',     img: '/img/products/malla-ganadera.svg' },
  { id: 'malla-cinegetica',     name: 'Malla cinegética galvanizada',     desc: 'Rollo de 50 m. Cumple normativa de paso de fauna.',               price: 62.50,  category: 'mallas',     img: '/img/products/malla-cinegetica.svg' },
  { id: 'valla-hercules',       name: 'Valla Hércules galvanizada',       desc: 'Rollo de 25 m. Panel soldado de alta resistencia.',               price: 74.90,  category: 'mallas',     img: '/img/products/malla-hercules.svg' },
  { id: 'malla-simple-torsion', name: 'Malla simple torsión galvanizada', desc: 'Rollo de 25 m. La opción más económica.',                         price: 43.56,  category: 'mallas',     img: '/img/products/malla-simple-torsion.svg' },
  { id: 'malla-electrosoldada', name: 'Malla electrosoldada galvanizada', desc: 'Rollo de 25 m. Rígida y estable.',                                price: 41.38,  category: 'mallas',     img: '/img/products/malla-electrosoldada.svg' },
  { id: 'malla-gallinera',      name: 'Malla gallinera galvanizada',      desc: 'Rollo de 25 m. Para gallineros y corrales.',                      price: 27.30,  category: 'mallas',     img: '/img/products/malla-gallinera.svg' },

  // Postes metálicos
  { id: 'poste-hercules',       name: 'Poste para valla Hércules',        desc: 'Poste galvanizado de 2 m, para malla Hércules.',                  price: 9.90,   category: 'postes',     img: '/img/products/poste.svg' },
  { id: 'poste-simple-torsion', name: 'Poste para simple torsión',        desc: 'Poste galvanizado de 2 m, para simple torsión y electrosoldada.', price: 6.50,   category: 'postes',     img: '/img/products/poste.svg' },

  // Puertas para vallado
  { id: 'puerta-peatonal',      name: 'Puerta peatonal galvanizada',      desc: 'Ancho 1 m. Puerta de acceso a juego con el cercado.',             price: 89.00,  category: 'puertas',    img: '/img/products/puerta-peatonal.svg' },
  { id: 'puerta-abatible',      name: 'Puerta abatible de dos hojas',     desc: 'Ancho 4 m. Para acceso de vehículos a la finca.',                 price: 249.00, category: 'puertas',    img: '/img/products/puerta-abatible.svg' },

  // Alambres
  { id: 'alambre-espino',       name: 'Alambre de espino galvanizado',    desc: 'Rollo de 500 m. Refuerzo disuasorio para el cercado.',            price: 34.90,  category: 'alambres',   img: '/img/products/alambre-espino.svg' },
  { id: 'alambre-liso',         name: 'Alambre liso galvanizado',         desc: 'Rollo de 100 m, calibre 2,5 mm. Para tensar el vallado.',         price: 19.90,  category: 'alambres',   img: '/img/products/alambre-liso.svg' },

  // Kits de vallado
  { id: 'kit-basico-25m',       name: 'Kit de vallado básico (25 m)',     desc: 'Malla simple torsión + postes + tensores para 25 m lineales.',   price: 189.00, category: 'kits',       img: '/img/products/kit-vallado.svg' },

  // Accesorios
  { id: 'grapa-malla-h',        name: 'Grapa de fijación malla H',        desc: 'Bolsa de 100 unidades.',                                          price: 7.90,   category: 'accesorios', img: '/img/products/accesorio.svg' },
  { id: 'tensor-galvanizado',   name: 'Tensor galvanizado',               desc: 'Unidad, para tensar alambre y malla.',                            price: 3.20,   category: 'accesorios', img: '/img/products/accesorio.svg' },

  // Jardinería
  { id: 'malla-ocultacion',     name: 'Malla de ocultación verde',        desc: 'Rollo de 1 x 25 m, 70 g/m². Para vallados de jardín.',            price: 29.90,  category: 'jardineria', img: '/img/products/malla-ocultacion.svg' },
];
