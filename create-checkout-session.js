// Función serverless (Vercel). Crea una sesión de Stripe Checkout con los
// precios verificados en el servidor (catálogo en ./_products.js), nunca
// con los precios que envíe el navegador — así nadie puede pagar menos
// manipulando el carrito desde el cliente.
//
// Requiere la variable de entorno STRIPE_SECRET_KEY configurada en Vercel
// (Project Settings → Environment Variables). Usa tu clave "sk_live_..." en
// producción o "sk_test_..." mientras pruebas.

const Stripe = require('stripe');
const PRODUCTS = require('./_products');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Falta STRIPE_SECRET_KEY en las variables de entorno de Vercel');
    return res.status(500).json({ error: 'Configuración de pago incompleta' });
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    const line_items = [];
    for (const item of items) {
      const product = PRODUCTS[item.id];
      if (!product) {
        return res.status(400).json({ error: `Producto no válido: ${item.id}` });
      }
      const qty = Math.max(1, Math.min(200, parseInt(item.qty, 10) || 1));
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: qty,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${origin}/pedido-confirmado.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/carrito.html`,
      shipping_address_collection: { allowed_countries: ['ES'] },
      locale: 'es',
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Error creando sesión de Stripe:', err);
    return res.status(500).json({ error: 'No se pudo iniciar el pago' });
  }
};
