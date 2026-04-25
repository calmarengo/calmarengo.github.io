// Banner de consentimiento de cookies + carga condicional de Google Analytics.
// Solo se inyecta GA si el visitante acepta. La decisión se guarda en una
// cookie con Path=/ para que se comparta entre /, /es/, /carta y /es/carta.
(function () {
    var GA_ID = "G-J310B3615C";
    var STORAGE_KEY = "cm_consent_v1";

    var htmlLang = (document.documentElement.lang || "").toLowerCase();
    var lang = htmlLang.indexOf("es") === 0 ? "es" : "val";
    var TEXTS = {
        val: {
            msg: "Utilitzem cookies de Google Analytics per saber com es navega per la web.",
            accept: "Acceptar",
            reject: "Rebutjar",
        },
        es: {
            msg: "Usamos cookies de Google Analytics para saber cómo se navega por la web.",
            accept: "Aceptar",
            reject: "Rechazar",
        },
    };
    var t = TEXTS[lang];

    function loadGA() {
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", GA_ID);
    }

    function setConsent(value) {
        try {
            var maxAge = 60 * 60 * 24 * 365; // 1 año
            document.cookie =
                STORAGE_KEY + "=" + encodeURIComponent(value) +
                ";path=/;max-age=" + maxAge + ";SameSite=Lax";
        } catch (_) {}
    }

    function getConsent() {
        try {
            var match = document.cookie.match(
                new RegExp("(?:^|; )" + STORAGE_KEY + "=([^;]*)")
            );
            return match ? decodeURIComponent(match[1]) : null;
        } catch (_) {
            return null;
        }
    }

    function hideBanner() {
        var el = document.getElementById("cm-consent");
        if (el) el.parentNode.removeChild(el);
    }

    function showBanner() {
        var el = document.createElement("div");
        el.id = "cm-consent";
        el.setAttribute("role", "dialog");
        el.setAttribute("aria-live", "polite");
        el.innerHTML =
            '<p>' + t.msg + '</p>' +
            '<div class="cm-consent-actions">' +
                '<button type="button" class="cm-consent-reject">' + t.reject + '</button>' +
                '<button type="button" class="cm-consent-accept">' + t.accept + '</button>' +
            '</div>';
        document.body.appendChild(el);
        el.querySelector(".cm-consent-accept").addEventListener("click", function () {
            setConsent("accepted");
            hideBanner();
            loadGA();
        });
        el.querySelector(".cm-consent-reject").addEventListener("click", function () {
            setConsent("rejected");
            hideBanner();
        });
    }

    var consent = getConsent();
    if (consent === "accepted") {
        loadGA();
        return;
    }
    if (consent === "rejected") {
        return;
    }
    if (document.body) {
        showBanner();
    } else {
        document.addEventListener("DOMContentLoaded", showBanner);
    }
})();
