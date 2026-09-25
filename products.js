// Catálogo de productos — versión para el navegador.
// IMPORTANTE: si cambias precios o añades productos aquí, actualiza también
// el mismo catálogo en /api/_products.js (el servidor no confía en este archivo,
// solo lo usa para pintar la tienda; el precio real que se cobra sale del servidor).
//
// PRODUCT_GROUPS = una página de producto por grupo, con sus variantes (opciones).
// PRODUCTS = todas las variantes "aplanadas", una por cada combinación comprable
// (esto es lo que usa el carrito: cada variante tiene su propio id y precio).
const CATEGORIES = [
  { id: 'mallas', name: 'Mallas metálicas' },
  { id: 'postes', name: 'Postes metálicos' },
  { id: 'puertas', name: 'Puertas para vallado' },
  { id: 'alambres', name: 'Alambres' },
  { id: 'kits', name: 'Kits de vallado' },
  { id: 'accesorios', name: 'Accesorios' },
  { id: 'jardineria', name: 'Jardinería' }
];

const PRODUCT_GROUPS = [
    {
    slug: 'malla-ganadera',
    name: 'Malla ganadera galvanizada',
    category: 'mallas',
    img: '/img/products/malla-ganadera.webp',
    shortDesc: 'Malla de alambre galvanizado pensada para contener ganado y delimitar fincas rústicas.',
    variantLabel: 'Rollo y altura',
    variants: [
      { id: 'malla-ganadera-25m-h100', label: 'Rollo 25 m — Altura 1,00 m', price: 19.36, length: 25, height: 1.0 },
      { id: 'malla-ganadera-25m-h125', label: 'Rollo 25 m — Altura 1,25 m', price: 24.2, length: 25, height: 1.25 },
      { id: 'malla-ganadera-25m', label: 'Rollo 25 m — Altura 1,50 m', price: 29.04, length: 25, height: 1.5 },
      { id: 'malla-ganadera-25m-h200', label: 'Rollo 25 m — Altura 2,00 m', price: 38.72, length: 25, height: 2.0 },
      { id: 'malla-ganadera-50m-h100', label: 'Rollo 50 m — Altura 1,00 m', price: 38.72, length: 50, height: 1.0 },
      { id: 'malla-ganadera-50m-h125', label: 'Rollo 50 m — Altura 1,25 m', price: 48.4, length: 50, height: 1.25 },
      { id: 'malla-ganadera-50m', label: 'Rollo 50 m — Altura 1,50 m', price: 58.08, length: 50, height: 1.5 },
      { id: 'malla-ganadera-50m-h200', label: 'Rollo 50 m — Altura 2,00 m', price: 77.44, length: 50, height: 2.0 }
    ]
  },
  {
    slug: 'malla-cinegetica',
    name: 'Malla cinegética galvanizada',
    category: 'mallas',
    img: '/img/products/malla-cinegetica.webp',
    shortDesc: 'Malla con separación de alambres regulada por normativa, que permite el paso de fauna silvestre.',
    variantLabel: 'Rollo y altura',
    variants: [
      { id: 'malla-cinegetica-25m-h100', label: 'Rollo 25 m — Altura 1,00 m', price: 20.83, length: 25, height: 1.0 },
      { id: 'malla-cinegetica-25m-h125', label: 'Rollo 25 m — Altura 1,25 m', price: 26.04, length: 25, height: 1.25 },
      { id: 'malla-cinegetica-25m', label: 'Rollo 25 m — Altura 1,50 m', price: 31.25, length: 25, height: 1.5 },
      { id: 'malla-cinegetica-25m-h200', label: 'Rollo 25 m — Altura 2,00 m', price: 41.67, length: 25, height: 2.0 },
      { id: 'malla-cinegetica-50m-h100', label: 'Rollo 50 m — Altura 1,00 m', price: 41.67, length: 50, height: 1.0 },
      { id: 'malla-cinegetica-50m-h125', label: 'Rollo 50 m — Altura 1,25 m', price: 52.08, length: 50, height: 1.25 },
      { id: 'malla-cinegetica-50m', label: 'Rollo 50 m — Altura 1,50 m', price: 62.5, length: 50, height: 1.5 },
      { id: 'malla-cinegetica-50m-h200', label: 'Rollo 50 m — Altura 2,00 m', price: 83.33, length: 50, height: 2.0 }
    ]
  },
  {
    slug: 'valla-hercules',
    name: 'Valla Hércules galvanizada',
    category: 'mallas',
    img: '/img/products/malla-hercules.webp',
    shortDesc: 'Panel de malla soldada de gran resistencia, uno de los sistemas de vallado más utilizados en España.',
    variantLabel: 'Rollo y altura',
    variants: [
      { id: 'valla-hercules-25m-h100', label: 'Rollo 25 m — Altura 1,00 m', price: 49.93, length: 25, height: 1.0 },
      { id: 'valla-hercules-25m-h125', label: 'Rollo 25 m — Altura 1,25 m', price: 62.42, length: 25, height: 1.25 },
      { id: 'valla-hercules-25m', label: 'Rollo 25 m — Altura 1,50 m', price: 74.9, length: 25, height: 1.5 },
      { id: 'valla-hercules-25m-h200', label: 'Rollo 25 m — Altura 2,00 m', price: 99.87, length: 25, height: 2.0 },
      { id: 'valla-hercules-50m-h100', label: 'Rollo 50 m — Altura 1,00 m', price: 99.87, length: 50, height: 1.0 },
      { id: 'valla-hercules-50m-h125', label: 'Rollo 50 m — Altura 1,25 m', price: 124.83, length: 50, height: 1.25 },
      { id: 'valla-hercules-50m', label: 'Rollo 50 m — Altura 1,50 m', price: 149.8, length: 50, height: 1.5 },
      { id: 'valla-hercules-50m-h200', label: 'Rollo 50 m — Altura 2,00 m', price: 199.73, length: 50, height: 2.0 }
    ]
  },
  {
    slug: 'malla-simple-torsion',
    name: 'Malla simple torsión galvanizada',
    category: 'mallas',
    img: '/img/products/malla-simple-torsion.webp',
    shortDesc: 'La solución más extendida y económica para delimitar parcelas, jardines y terrenos.',
    variantLabel: 'Rollo y altura',
    variants: [
      { id: 'malla-simple-torsion-25m-h100', label: 'Rollo 25 m — Altura 1,00 m', price: 29.04, length: 25, height: 1.0 },
      { id: 'malla-simple-torsion-25m-h125', label: 'Rollo 25 m — Altura 1,25 m', price: 36.3, length: 25, height: 1.25 },
      { id: 'malla-simple-torsion-25m', label: 'Rollo 25 m — Altura 1,50 m', price: 43.56, length: 25, height: 1.5 },
      { id: 'malla-simple-torsion-25m-h200', label: 'Rollo 25 m — Altura 2,00 m', price: 58.08, length: 25, height: 2.0 },
      { id: 'malla-simple-torsion-50m-h100', label: 'Rollo 50 m — Altura 1,00 m', price: 58.08, length: 50, height: 1.0 },
      { id: 'malla-simple-torsion-50m-h125', label: 'Rollo 50 m — Altura 1,25 m', price: 72.6, length: 50, height: 1.25 },
      { id: 'malla-simple-torsion-50m', label: 'Rollo 50 m — Altura 1,50 m', price: 87.12, length: 50, height: 1.5 },
      { id: 'malla-simple-torsion-50m-h200', label: 'Rollo 50 m — Altura 2,00 m', price: 116.16, length: 50, height: 2.0 }
    ]
  },
  {
    slug: 'malla-electrosoldada',
    name: 'Malla electrosoldada galvanizada',
    category: 'mallas',
    img: '/img/products/malla-electrosoldada.webp',
    shortDesc: 'Malla rígida de cuadrícula soldada, estable y fácil de manejar, para agricultura, ganadería e industria.',
    variantLabel: 'Rollo y altura',
    variants: [
      { id: 'malla-electrosoldada-25m-h100', label: 'Rollo 25 m — Altura 1,00 m', price: 27.59, length: 25, height: 1.0 },
      { id: 'malla-electrosoldada-25m-h125', label: 'Rollo 25 m — Altura 1,25 m', price: 34.48, length: 25, height: 1.25 },
      { id: 'malla-electrosoldada-25m', label: 'Rollo 25 m — Altura 1,50 m', price: 41.38, length: 25, height: 1.5 },
      { id: 'malla-electrosoldada-25m-h200', label: 'Rollo 25 m — Altura 2,00 m', price: 55.17, length: 25, height: 2.0 },
      { id: 'malla-electrosoldada-50m-h100', label: 'Rollo 50 m — Altura 1,00 m', price: 55.17, length: 50, height: 1.0 },
      { id: 'malla-electrosoldada-50m-h125', label: 'Rollo 50 m — Altura 1,25 m', price: 68.97, length: 50, height: 1.25 },
      { id: 'malla-electrosoldada-50m', label: 'Rollo 50 m — Altura 1,50 m', price: 82.76, length: 50, height: 1.5 },
      { id: 'malla-electrosoldada-50m-h200', label: 'Rollo 50 m — Altura 2,00 m', price: 110.35, length: 50, height: 2.0 }
    ]
  },
  {
    slug: 'malla-gallinera',
    name: 'Malla gallinera galvanizada',
    category: 'mallas',
    img: '/img/products/malla-gallinera.webp',
    shortDesc: 'Malla hexagonal ligera, la opción más económica para gallineros, corrales y conejeras.',
    variantLabel: 'Rollo y altura',
    variants: [
      { id: 'malla-gallinera-25m-h100', label: 'Rollo 25 m — Altura 1,00 m', price: 18.2, length: 25, height: 1.0 },
      { id: 'malla-gallinera-25m-h125', label: 'Rollo 25 m — Altura 1,25 m', price: 22.75, length: 25, height: 1.25 },
      { id: 'malla-gallinera-25m', label: 'Rollo 25 m — Altura 1,50 m', price: 27.3, length: 25, height: 1.5 },
      { id: 'malla-gallinera-25m-h200', label: 'Rollo 25 m — Altura 2,00 m', price: 36.4, length: 25, height: 2.0 },
      { id: 'malla-gallinera-50m-h100', label: 'Rollo 50 m — Altura 1,00 m', price: 36.4, length: 50, height: 1.0 },
      { id: 'malla-gallinera-50m-h125', label: 'Rollo 50 m — Altura 1,25 m', price: 45.5, length: 50, height: 1.25 },
      { id: 'malla-gallinera-50m', label: 'Rollo 50 m — Altura 1,50 m', price: 54.6, length: 50, height: 1.5 },
      { id: 'malla-gallinera-50m-h200', label: 'Rollo 50 m — Altura 2,00 m', price: 72.8, length: 50, height: 2.0 }
    ]
  },
  {
    slug: 'poste-hercules',
    name: 'Poste para valla Hércules',
    category: 'postes',
    img: '/img/products/poste.svg',
    shortDesc: 'Poste metálico galvanizado a juego con la valla Hércules, para fijar y tensar el cercado.',
    variantLabel: 'Altura del poste',
    variants: [
      { id: 'poste-hercules-150', label: '1,50 m', price: 8.2 },
      { id: 'poste-hercules-200', label: '2,00 m', price: 9.9 },
      { id: 'poste-hercules-250', label: '2,50 m', price: 12.4 }
    ]
  },
  {
    slug: 'poste-simple-torsion',
    name: 'Poste para simple torsión',
    category: 'postes',
    img: '/img/products/poste.svg',
    shortDesc: 'Poste metálico galvanizado para malla simple torsión y electrosoldada.',
    variantLabel: 'Altura del poste',
    variants: [
      { id: 'poste-simple-torsion-150', label: '1,50 m', price: 5.4 },
      { id: 'poste-simple-torsion-200', label: '2,00 m', price: 6.5 },
      { id: 'poste-simple-torsion-250', label: '2,50 m', price: 8.1 }
    ]
  },
  {
    slug: 'puerta-peatonal',
    name: 'Puerta peatonal galvanizada',
    category: 'puertas',
    img: '/img/products/puerta-peatonal.svg',
    shortDesc: 'Puerta de acceso peatonal galvanizada, a juego con cualquiera de nuestros cercados.',
    variantLabel: 'Ancho de paso',
    variants: [
      { id: 'puerta-peatonal-100', label: '1,00 m', price: 89.0 },
      { id: 'puerta-peatonal-120', label: '1,20 m', price: 104.0 }
    ]
  },
  {
    slug: 'puerta-abatible',
    name: 'Puerta abatible de dos hojas',
    category: 'puertas',
    img: '/img/products/puerta-abatible.svg',
    shortDesc: 'Puerta de dos hojas para acceso de vehículos y maquinaria a la finca.',
    variantLabel: 'Ancho total',
    variants: [
      { id: 'puerta-abatible-300', label: '3,00 m', price: 199.0 },
      { id: 'puerta-abatible-400', label: '4,00 m', price: 249.0 },
      { id: 'puerta-abatible-500', label: '5,00 m', price: 299.0 }
    ]
  },
  {
    slug: 'alambre-espino',
    name: 'Alambre de espino galvanizado',
    category: 'alambres',
    img: '/img/products/alambre-espino.svg',
    shortDesc: 'Alambre con púas galvanizado, refuerzo disuasorio en la parte superior del cercado.',
    variantLabel: 'Longitud del rollo',
    variants: [
      { id: 'alambre-espino-250', label: 'Rollo 250 m', price: 19.9 },
      { id: 'alambre-espino-500', label: 'Rollo 500 m', price: 34.9 }
    ]
  },
  {
    slug: 'alambre-liso',
    name: 'Alambre liso galvanizado',
    category: 'alambres',
    img: '/img/products/alambre-liso.svg',
    shortDesc: 'Alambre liso galvanizado para tensar mallas y rematar vallados.',
    variantLabel: 'Longitud del rollo',
    variants: [
      { id: 'alambre-liso-50', label: 'Rollo 50 m', price: 11.9 },
      { id: 'alambre-liso-100', label: 'Rollo 100 m', price: 19.9 }
    ]
  },
  {
    slug: 'kit-vallado-basico',
    name: 'Kit de vallado básico',
    category: 'kits',
    img: '/img/products/kit-vallado.svg',
    shortDesc: 'Todo lo necesario para vallar tu parcela: malla, postes y tensores en un solo pedido.',
    variantLabel: 'Longitud del kit',
    variants: [
      { id: 'kit-vallado-basico-25', label: 'Para 25 m lineales', price: 189.0 },
      { id: 'kit-vallado-basico-50', label: 'Para 50 m lineales', price: 349.0 }
    ]
  },
  {
    slug: 'grapa-malla-h',
    name: 'Grapa de fijación malla H',
    category: 'accesorios',
    img: '/img/products/accesorio.svg',
    shortDesc: 'Grapas para fijar malla electrosoldada y valla Hércules a los postes.',
    variantLabel: 'Formato',
    variants: [
      { id: 'grapa-malla-h-50', label: 'Bolsa 50 uds.', price: 4.5 },
      { id: 'grapa-malla-h-100', label: 'Bolsa 100 uds.', price: 7.9 }
    ]
  },
  {
    slug: 'tensor-galvanizado',
    name: 'Tensor galvanizado',
    category: 'accesorios',
    img: '/img/products/accesorio.svg',
    shortDesc: 'Tensor galvanizado para tensar alambre y malla en el vallado.',
    variantLabel: 'Formato',
    variants: [
      { id: 'tensor-galvanizado-1', label: 'Unidad', price: 3.2 },
      { id: 'tensor-galvanizado-10', label: 'Pack 10 uds.', price: 27.9 }
    ]
  },
  {
    slug: 'malla-ocultacion',
    name: 'Malla de ocultación verde',
    category: 'jardineria',
    img: '/img/products/malla-ocultacion.svg',
    shortDesc: 'Malla de tejido verde para dar privacidad y protección al vallado de tu jardín.',
    variantLabel: 'Altura',
    variants: [
      { id: 'malla-ocultacion-100', label: '1,00 m', price: 24.9 },
      { id: 'malla-ocultacion-150', label: '1,50 m', price: 34.9 }
    ]
  }
];

const PRODUCTS = PRODUCT_GROUPS.reduce(function(list, g) {
  g.variants.forEach(function(v) {
    list.push({
      id: v.id,
      name: g.name + ' — ' + v.label,
      price: v.price,
      category: g.category,
      img: g.img,
    });
  });
  return list;
}, []);
