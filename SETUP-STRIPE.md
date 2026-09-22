# Poner en marcha el cobro con Stripe

## 1. Cuenta de Stripe
1. Crea una cuenta en https://dashboard.stripe.com/register (o usa la que ya tengas).
2. Completa el "onboarding" de Stripe con los datos de tu negocio para poder cobrar de verdad
   (mientras no lo completes, puedes probar todo en modo test).

## 2. Claves de API
1. En el Dashboard de Stripe: **Developers → API keys**.
2. Copia:
   - **Secret key** (`sk_test_...` en pruebas, `sk_live_...` en producción).
3. Esta clave NUNCA va en el código ni en GitHub. Va solo como variable de entorno.

## 3. Añadir la clave en Vercel
1. En tu proyecto de Vercel: **Settings → Environment Variables**.
2. Añade:
   - Nombre: `STRIPE_SECRET_KEY`
   - Valor: tu `sk_test_...` (para probar) o `sk_live_...` (para cobrar de verdad)
   - Entornos: marca Production, Preview y Development.
3. Vuelve a desplegar el proyecto (un nuevo commit o "Redeploy") para que la variable se aplique.

## 4. Archivos que se han añadido
- `/products.js` — catálogo que ve la tienda (nombres, precios, iconos).
- `/api/_products.js` — el mismo catálogo pero en el servidor: **esta es la fuente real del precio que se cobra**.
- `/api/create-checkout-session.js` — función serverless que crea la sesión de pago de Stripe.
- `/cart.js` — el carrito (guardado en el navegador del cliente, con `localStorage`).
- `/catalogo.html` — la tienda, con botones de "Añadir al carrito".
- `/carrito.html` — el carrito, con el botón "Pagar con tarjeta".
- `/pedido-confirmado.html` — página a la que Stripe redirige tras un pago correcto.
- `/package.json` — declara la dependencia `stripe` (Vercel la instala sola al desplegar).

Si cambias un precio, cámbialo en **los dos sitios**: `/products.js` (lo que se ve) y
`/api/_products.js` (lo que realmente se cobra). Si solo lo cambias en uno, el precio
mostrado y el cobrado no coincidirán.

## 5. Probar el pago (modo test)
Con la clave `sk_test_...` puesta, usa esta tarjeta de prueba de Stripe en el checkout:
- Número: `4242 4242 4242 4242`
- Fecha: cualquier fecha futura
- CVC: cualquier 3 dígitos
- Código postal: cualquiera

No se cobra dinero real en modo test.

## 6. Pasar a producción
1. Completa el onboarding de Stripe (datos fiscales, cuenta bancaria).
2. Cambia la variable `STRIPE_SECRET_KEY` en Vercel por tu clave `sk_live_...`.
3. Vuelve a desplegar.

## 7. Qué falta para tenerlo "100% redondo" (opcional, para más adelante)
- **Webhook de Stripe** para guardar los pedidos en una base de datos y avisarte
  automáticamente (por email/WhatsApp) cuando entra un pedido nuevo, en vez de
  depender solo del email que Stripe envía por defecto.
- **Gestión de stock** si algún día vendes con unidades limitadas.
- **Facturación** (Stripe no genera facturas con IVA desglosado por defecto en España;
  para eso conviene activar "Stripe Tax" o usar tu propio programa de facturación).
