// Datos de la carta - edita aquí y se actualiza en todas las páginas
const CARTA_DATA = {
    val: {
        title: "La Nostra Carta",
        categories: [
            {
                name: "Entrepans 2.0",
                items: [
                    { name: "Barranquet", desc: "Entrecuixa pollastre, formatge, creilles, bacon, salsa secreta" },
                    { name: "Madrid", desc: "Calamars rebozats" },
                    { name: "Serranito", desc: "Secreto iberic, pernil, pimentó i tomata refregada" },
                    { name: "Chivito", desc: "Llom, formatge, bacon, lletuga, tomata, maionesa, ou fregit" },
                    { name: "Brascada", desc: "Ternera, pernil, ceba pochada" },
                    { name: "Almussafes", desc: "Sobrasada, formatge i ceba pochada" },
                    { name: "Figatell", desc: "Figatells, albergina, pimentó i ceba pochada" },
                    { name: "De la Casa", desc: "Llom, formatge, maionesa, creilles, xampinyo i salsa mery" },
                    { name: "El Nou", desc: "Llom, ou fregit trencat, pimentó encurtit, botifarra semi-picant" }
                ],
                note: { text: "Entrepa, una beguda i café", extra: "(olives i cacau)", price: "9,00€" }
            },
            {
                name: "Cavall",
                items: [
                    { name: "Cavall", desc: "Carn de potro, creilles i allets tendres" }
                ],
                note: { text: "Entrepa, una beguda i café", extra: "(olives i cacau)", price: "10,00€" }
            }
        ],
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
        categories: [
            {
                name: "Bocadillos 2.0",
                items: [
                    { name: "Barranquet", desc: "Contramuslo de pollo, queso, patatas, bacon, salsa secreta" },
                    { name: "Madrid", desc: "Calamares rebozados" },
                    { name: "Serranito", desc: "Secreto ibérico, jamón, pimiento y tomate restregado" },
                    { name: "Chivito", desc: "Lomo, queso, bacon, lechuga, tomate, mayonesa, huevo frito" },
                    { name: "Brascada", desc: "Ternera, jamón, cebolla pochada" },
                    { name: "Almussafes", desc: "Sobrasada, queso y cebolla pochada" },
                    { name: "Figatell", desc: "Figatells, berenjena, pimiento y cebolla pochada" },
                    { name: "De la Casa", desc: "Lomo, queso, mayonesa, patatas, champiñón y salsa mery" },
                    { name: "El Nou", desc: "Lomo, huevo frito roto, pimiento encurtido, butifarra semi-picante" }
                ],
                note: { text: "Bocadillo, una bebida y café", extra: "(aceitunas y cacahuetes)", price: "9,00€" }
            },
            {
                name: "Caballo",
                items: [
                    { name: "Caballo", desc: "Carne de potro, patatas y ajetes tiernos" }
                ],
                note: { text: "Bocadillo, una bebida y café", extra: "(aceitunas y cacahuetes)", price: "10,00€" }
            }
        ],
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

function renderCarta(lang) {
    const data = CARTA_DATA[lang];
    let html = `<h1 class="section-title">${data.title}</h1><div class="carta-container">`;

    // Categories
    data.categories.forEach(cat => {
        html += `<div class="carta-category"><h2 class="carta-category-title">${cat.name}</h2>`;
        cat.items.forEach(item => {
            html += `<div class="carta-item"><div class="carta-item-info"><h3 class="carta-item-name">${item.name}</h3><p class="carta-item-desc">${item.desc}</p></div></div>`;
        });
        if (cat.note) {
            html += `<div class="carta-note"><strong>${cat.note.text}</strong> ${cat.note.extra} — <strong style="color: var(--color-wine)">${cat.note.price}</strong></div>`;
        }
        html += `</div>`;
    });

    // Extras
    html += `<div class="carta-extras"><h3 class="carta-extras-title">${data.extras.title}</h3><ul style="list-style:none;font-size:0.95rem;color:var(--color-black-soft);">`;
    data.extras.items.forEach(item => {
        html += `<li style="margin-bottom:0.5rem;">• ${item}</li>`;
    });
    html += `</ul></div>`;

    // Fora de carta
    html += `<div class="carta-category" style="margin-top:var(--spacing-lg)"><h2 class="carta-category-title">${data.foradecarta.title}</h2>`;
    html += `<p class="carta-item-desc" style="margin-bottom:var(--spacing-sm)">${data.foradecarta.subtitle}</p>`;
    html += `<ul class="carta-extras-list" style="list-style:none;display:flex;flex-direction:column;gap:0.5rem;">`;
    data.foradecarta.items.forEach(item => {
        html += `<li><span>${item}</span></li>`;
    });
    html += `</ul>`;
    html += `<p class="carta-item-desc" style="margin-top:var(--spacing-sm);font-style:italic;">${data.foradecarta.footer}</p></div>`;

    html += `</div>`;
    return html;
}
