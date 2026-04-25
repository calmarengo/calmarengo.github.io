// Textos fijos de la carta (títulos, Extres, Fora de Carta).
// Las CATEGORIAS y PLATOS se cargan desde js/carta-data.json,
// que a su vez lo genera una GitHub Action a partir de una Google Sheet.
const CARTA_STATIC = {
    val: {
        title: "La Nostra Carta",
        extras: {
            title: "Extres",
            items: [
                "Tot entrepa que continga carn de potro tindrà un extra de <strong>1,00€</strong>",
                "En cremaet increment <strong>0,50€</strong>",
                "Sols entra una beguda, la resta es paga apart"
            ]
        },
        foradecarta: {
            title: "Fora de Carta",
            subtitle: "Consulta al cambrer que hi ha hui:",
            items: ["Tortilles.", "Abadejo.", "All i pebre.", "Magre en tomata.", "Embutit de carnisseria.", "Manetes de porc.", "Carrilleres."],
            footer: "Algunes d'aquestes coses segur que estan"
        }
    },
    es: {
        title: "Nuestra Carta",
        extras: {
            title: "Extras",
            items: [
                "Todo bocadillo que contenga carne de potro tendrá un extra de <strong>1,00€</strong>",
                "Con cremaet incremento <strong>0,50€</strong>",
                "Solo entra una bebida, el resto se paga aparte"
            ]
        },
        foradecarta: {
            title: "Fuera de Carta",
            subtitle: "Consulta al camarero qué hay hoy:",
            items: ["Tortillas.", "Abadejo.", "All i pebre.", "Magro con tomate.", "Embutido de carnicería.", "Manitas de cerdo.", "Carrilleras."],
            footer: "Algunas de estas cosas seguro que están"
        }
    }
};

// Resuelve la ruta al JSON relativa a la página actual.
// carta.html (raíz) -> "js/carta-data.json"
// es/carta.html    -> "../js/carta-data.json"
function cartaDataUrl() {
    const inSubdir = window.location.pathname.split("/").filter(Boolean).length > 1;
    return (inSubdir ? "../" : "") + "js/carta-data.json?v=" + Date.now();
}

function loadCarta() {
    return fetch(cartaDataUrl(), { cache: "no-cache" })
        .then(r => {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.json();
        });
}

function renderCarta(lang, dynamicData) {
    const staticData = CARTA_STATIC[lang];
    const categories = (dynamicData && dynamicData[lang] && dynamicData[lang].categories) || [];
    let html = `<h1 class="section-title">${staticData.title}</h1><div class="carta-container">`;

    // Categories
    categories.forEach(cat => {
        html += `<div class="carta-category"><h2 class="carta-category-title">${cat.name}</h2>`;
        cat.items.forEach(item => {
            html += `<div class="carta-item"><div class="carta-item-info"><h3 class="carta-item-name">${item.name}</h3><p class="carta-item-desc">${item.desc}</p></div></div>`;
        });
        if (cat.note && cat.note.text) {
            html += `<div class="carta-note"><strong>${cat.note.text}</strong> ${cat.note.extra} — <strong style="color: var(--color-wine)">${cat.note.price}</strong></div>`;
        }
        html += `</div>`;
    });

    // Extras
    html += `<div class="carta-extras"><h3 class="carta-extras-title">${staticData.extras.title}</h3><ul style="list-style:none;font-size:0.95rem;color:var(--color-black-soft);">`;
    staticData.extras.items.forEach(item => {
        html += `<li style="margin-bottom:0.5rem;">• ${item}</li>`;
    });
    html += `</ul></div>`;

    // Fora de carta
    html += `<div class="carta-category" style="margin-top:var(--spacing-lg)"><h2 class="carta-category-title">${staticData.foradecarta.title}</h2>`;
    html += `<p class="carta-item-desc" style="margin-bottom:var(--spacing-sm)">${staticData.foradecarta.subtitle}</p>`;
    html += `<ul class="carta-extras-list" style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;">`;
    staticData.foradecarta.items.forEach(item => {
        html += `<li><span>${item}</span></li>`;
    });
    html += `</ul>`;
    html += `<p class="carta-item-desc" style="margin-top:var(--spacing-sm);font-style:italic;">${staticData.foradecarta.footer}</p></div>`;

    html += `</div>`;
    return html;
}

function renderCartaError(lang) {
    const msg = lang === "es"
        ? "No hemos podido cargar la carta. Prueba a recargar la página."
        : "No hem pogut carregar la carta. Prova a recarregar la pàgina.";
    return `<div style="padding:var(--spacing-md);text-align:center;color:var(--color-black-soft);">${msg}</div>`;
}

function mountCarta(lang) {
    const target = document.getElementById("carta-content");
    loadCarta()
        .then(data => { target.innerHTML = renderCarta(lang, data); })
        .catch(() => { target.innerHTML = renderCartaError(lang); });
}
