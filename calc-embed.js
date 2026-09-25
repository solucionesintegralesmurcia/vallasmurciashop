// Calculadora incrustada en cada ficha de producto.
// Requiere que la pagina ya haya cargado products.js, cart.js, y defina
// window.GROUP_SLUG con el slug del grupo de producto antes de este script.
//
// 3 modos, segun el producto:
// - "rollo+postes": mallas que se venden por metros y llevan poste a juego.
// - "rollo": productos que se venden por metros pero no llevan poste propio
//   (alambres, kits, que ya incluyen sus propios postes en el kit).
// - "postes": paginas de poste, donde se calculan unidades a partir de los
//   metros del vallado (sin rollo de malla).
(function(){
  "use strict";

  var CON_POSTE_A_JUEGO = ['malla-ganadera','malla-cinegetica','valla-hercules','malla-simple-torsion','malla-electrosoldada','malla-gallinera'];
  var SOLO_POSTES = ['poste-hercules','poste-simple-torsion'];

  function metrosDeEtiqueta(label){
    var m = label.match(/(\d+)\s*m/);
    return m ? parseInt(m[1], 10) : null;
  }
  function euros(n){
    return n.toLocaleString('es-ES', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' €';
  }
  function cabecera(titulo, subtitulo){
    return '<div class="calc-box-head"><span class="calc-icon">📐</span><h3>' + titulo + '</h3></div>' +
      '<p class="calc-box-sub">' + subtitulo + '</p>';
  }

  function initCalcEmbed(){
    var mount = document.getElementById('calc-embed');
    if(!mount || typeof PRODUCT_GROUPS === 'undefined' || typeof GROUP_SLUG === 'undefined') return;
    var grupo = PRODUCT_GROUPS.find(function(g){ return g.slug === GROUP_SLUG; });
    if(!grupo) return;

    if (SOLO_POSTES.indexOf(GROUP_SLUG) !== -1) {
      initModoPostes(mount, grupo);
      return;
    }

    var conMetros = grupo.variants
      .map(function(v){ return { v: v, m: metrosDeEtiqueta(v.label) }; })
      .filter(function(x){ return x.m; });
    if(conMetros.length === 0) return; // producto que no se vende por metros (puertas, accesorios...)
    conMetros.sort(function(a,b){ return b.m - a.m; });
    var rolloGrande = conMetros[0];

    var conPosteAJuego = CON_POSTE_A_JUEGO.indexOf(GROUP_SLUG) !== -1;
    var posteGrupo = null, posteVariante = null;
    if (conPosteAJuego) {
      var posteSlug = (GROUP_SLUG === 'valla-hercules') ? 'poste-hercules' : 'poste-simple-torsion';
      posteGrupo = PRODUCT_GROUPS.find(function(g){ return g.slug === posteSlug; });
      posteVariante = posteGrupo ? posteGrupo.variants.slice().sort(function(a,b){ return a.price - b.price; })[0] : null;
    }

    mount.innerHTML =
      '<div class="calc-box" style="margin-top:24px;">' +
        cabecera('Calcula cuánto necesitas', 'Dinos los metros que necesitas y calculamos ' + (conPosteAJuego ? 'rollos y postes' : 'la cantidad') + ' al momento.') +
        '<div class="calc-field"><label for="ce-metros">¿Cuántos metros necesitas?</label>' +
          '<input type="number" id="ce-metros" min="1" step="1" value="50" inputmode="numeric"></div>' +
        (posteVariante ? '<div class="calc-field"><label class="calc-check"><input type="checkbox" id="ce-postes" checked> Incluir postes (aprox. cada 3 m)</label></div>' : '') +
        '<div class="calc-result" id="ce-result"></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">' +
          '<button type="button" class="btn btn-clay" id="ce-add-cart" style="flex:1 1 200px;justify-content:center;">🛒 Añadir todo al carrito</button>' +
          '<a href="#" target="_blank" class="btn btn-outline" id="ce-whatsapp" style="flex:1 1 200px;justify-content:center;">💬 Pedir por WhatsApp</a>' +
        '</div>' +
      '</div>';

    var metrosInput = document.getElementById('ce-metros');
    var postesCheck = document.getElementById('ce-postes');
    var resultBox = document.getElementById('ce-result');
    var addCartBtn = document.getElementById('ce-add-cart');
    var waLink = document.getElementById('ce-whatsapp');

    function calcular(){
      var longitud = parseFloat(metrosInput.value) || 0;
      var numRollos = Math.max(1, Math.ceil(longitud / rolloGrande.m));
      var costeMalla = numRollos * rolloGrande.v.price;

      var conPostes = postesCheck ? postesCheck.checked : false;
      var numPostes = Math.max(2, Math.ceil(longitud / 3) + 1);
      var costePostes = (conPostes && posteVariante) ? numPostes * posteVariante.price : 0;

      var total = costeMalla + costePostes;

      resultBox.innerHTML =
        '<div class="calc-line"><span>' + numRollos + ' × ' + rolloGrande.v.label + '</span><span>' + euros(costeMalla) + '</span></div>' +
        (conPostes && posteVariante ? '<div class="calc-line"><span>' + numPostes + ' × poste (' + posteVariante.label + ')</span><span>' + euros(costePostes) + '</span></div>' : '') +
        '<div class="calc-total"><span>Total estimado</span><span>' + euros(total) + '</span></div>' +
        '<p class="calc-note">Puede sobrar algo de material, para asegurar cubrir los ' + longitud + ' m sin quedarte corto. El pedido exacto se confirma sin compromiso.</p>';

      addCartBtn.onclick = function(){
        for (var i=0;i<numRollos;i++) addToCart(rolloGrande.v.id);
        if (conPostes && posteVariante) for (var j=0;j<numPostes;j++) addToCart(posteVariante.id);
        var original = addCartBtn.textContent;
        addCartBtn.textContent = '✓ Añadido al carrito';
        setTimeout(function(){ addCartBtn.textContent = original; }, 1500);
      };

      var texto = 'Hola, quiero pedir esto de ' + grupo.name + ':\n' +
        '- Longitud: ' + longitud + ' m\n' +
        '- ' + numRollos + ' x ' + rolloGrande.v.label + '\n' +
        (conPostes && posteVariante ? ('- ' + numPostes + ' x poste ' + posteVariante.label + '\n') : '') +
        '- Total estimado: ' + euros(total);
      waLink.href = 'https://wa.me/34639311161?text=' + encodeURIComponent(texto);
    }

    metrosInput.addEventListener('input', calcular);
    metrosInput.addEventListener('change', calcular);
    if (postesCheck) postesCheck.addEventListener('change', calcular);
    calcular();
  }

  function initModoPostes(mount, grupo){
    var variante = grupo.variants.slice().sort(function(a,b){ return a.price - b.price; })[0];

    mount.innerHTML =
      '<div class="calc-box" style="margin-top:24px;">' +
        cabecera('Calcula cuántos postes necesitas', 'Dinos los metros de tu vallado y calculamos las unidades al momento.') +
        '<div class="calc-field"><label for="ce-metros">¿Cuántos metros de vallado vas a hacer?</label>' +
          '<input type="number" id="ce-metros" min="1" step="1" value="50" inputmode="numeric"></div>' +
        '<div class="calc-result" id="ce-result"></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;">' +
          '<button type="button" class="btn btn-clay" id="ce-add-cart" style="flex:1 1 200px;justify-content:center;">🛒 Añadir todo al carrito</button>' +
          '<a href="#" target="_blank" class="btn btn-outline" id="ce-whatsapp" style="flex:1 1 200px;justify-content:center;">💬 Pedir por WhatsApp</a>' +
        '</div>' +
      '</div>';

    var metrosInput = document.getElementById('ce-metros');
    var resultBox = document.getElementById('ce-result');
    var addCartBtn = document.getElementById('ce-add-cart');
    var waLink = document.getElementById('ce-whatsapp');

    function calcular(){
      var longitud = parseFloat(metrosInput.value) || 0;
      var numPostes = Math.max(2, Math.ceil(longitud / 3) + 1);
      var total = numPostes * variante.price;

      resultBox.innerHTML =
        '<div class="calc-line"><span>' + numPostes + ' × poste (' + variante.label + ')</span><span>' + euros(total) + '</span></div>' +
        '<div class="calc-total"><span>Total estimado</span><span>' + euros(total) + '</span></div>' +
        '<p class="calc-note">Calculado a razón de un poste cada 3 m aprox., más uno de esquina/remate. El pedido exacto se confirma sin compromiso.</p>';

      addCartBtn.onclick = function(){
        for (var i=0;i<numPostes;i++) addToCart(variante.id);
        var original = addCartBtn.textContent;
        addCartBtn.textContent = '✓ Añadido al carrito';
        setTimeout(function(){ addCartBtn.textContent = original; }, 1500);
      };

      var texto = 'Hola, quiero pedir esto de ' + grupo.name + ':\n' +
        '- Vallado de: ' + longitud + ' m\n' +
        '- ' + numPostes + ' x poste ' + variante.label + '\n' +
        '- Total estimado: ' + euros(total);
      waLink.href = 'https://wa.me/34639311161?text=' + encodeURIComponent(texto);
    }

    metrosInput.addEventListener('input', calcular);
    metrosInput.addEventListener('change', calcular);
    calcular();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalcEmbed);
  } else {
    initCalcEmbed();
  }
})();
