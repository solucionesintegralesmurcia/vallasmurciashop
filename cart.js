const CART_KEY = 'vallasmurcia_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function findProduct(id) {
  return (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === id) : null;
}
function addToCart(id) {
  const product = findProduct(id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, img: product.img });
  saveCart(cart);
  flashAdded(id);
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  if (typeof renderCartPage === 'function') renderCartPage();
}
function setQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) { item.qty = Math.max(1, parseInt(qty, 10) || 1); saveCart(cart); }
  if (typeof renderCartPage === 'function') renderCartPage();
}
function stepCartQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) { item.qty = Math.max(1, item.qty + delta); saveCart(cart); }
  if (typeof renderCartPage === 'function') renderCartPage();
}
function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? 'inline-flex' : 'none';
  });
}
function flashAdded(id) {
  const btn = document.querySelector('[data-add="' + id + '"]');
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = '✓ Añadido';
  setTimeout(() => { btn.textContent = original; }, 1200);
}

async function goToCheckout() {
  const cart = getCart();
  if (cart.length === 0) return;
  const btn = document.getElementById('checkout-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Redirigiendo a pago seguro…'; }
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart.map(i => ({ id: i.id, qty: i.qty })) }),
    });
    const data = await res.json();
    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || 'No se pudo iniciar el pago. Inténtalo de nuevo.');
      if (btn) { btn.disabled = false; btn.textContent = 'Pagar con tarjeta'; }
    }
  } catch (e) {
    alert('Error de conexión. Inténtalo de nuevo.');
    if (btn) { btn.disabled = false; btn.textContent = 'Pagar con tarjeta'; }
  }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
