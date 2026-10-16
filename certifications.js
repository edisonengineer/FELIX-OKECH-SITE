/* =========================================================
   Felix Oketch — Certifications & training
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Certificates ----------
     HOW TO ADD A CERTIFICATE
     1. Save a picture of the certificate (JPG) in images/certificates/
        using a lowercase name with no spaces, e.g. "my-new-training.jpg".
     2. Optional: put the original PDF in the certificates/ folder.
     3. Copy one { ... } entry below (newest first) and update the details.

     Fields: title, issuer, date, detail, topics (list), image, pdf (optional),
             thumb (optional: a cropped picture for the card; `image` opens full screen) */
  const CERTIFICATES = [
    {
      title: "Solar Photovoltaic Technician License (Class T3)",
      issuer: "Energy and Petroleum Regulatory Authority (EPRA), Kenya",
      issuerShort: "EPRA",
      date: "October 2026",
      detail: "Licensed to install, test, inspect and commission solar PV systems, including grid-connected and hybrid systems. Valid until October 2027.",
      topics: ["Installation & testing", "Inspection & commissioning", "Grid-connected & hybrid PV"],
      image: "images/certificates/epra-solar-pv-t3-license.jpg",
      thumb: "images/certificates/epra-solar-pv-t3-license-front.jpg",
    },
    {
      title: "Regional Training on Microgrids",
      issuer: "East African Centre of Excellence for Renewable Energy and Efficiency (EACREEE)",
      issuerShort: "EACREEE",
      date: "August 2026",
      detail: "Regional training held virtually, 4–6 August 2026.",
      topics: ["Microgrids", "Mini-grid design", "Regional energy access"],
      image: "images/certificates/eacreee-microgrids.jpg",
      pdf: "certificates/eacreee-microgrids-training.pdf",
    },
    {
      title: "Energy Access Explorer Training",
      issuer: "World Resources Institute (WRI Africa), with AMDA and GOGLA",
      issuerShort: "WRI Africa",
      date: "October 2024",
      detail: "Training held in Nairobi, Kenya on 7 October 2024.",
      topics: ["Energy access planning", "GIS data", "Off-grid markets"],
      image: "images/certificates/energy-access-explorer.jpg",
    },
    {
      title: "Freedom Won LiFePO4 Solar Batteries Training",
      issuer: "Freedom Won & Gadgetronix",
      issuerShort: "Freedom Won",
      date: "June 2024",
      detail: "Products & solutions, system planning and installation. Held at Royal Tulip Canaan, Nairobi.",
      topics: ["Lithium (LiFePO4) batteries", "System planning", "Installation"],
      image: "images/certificates/freedom-won-lifepo4.jpg",
      pdf: "certificates/freedom-won-lifepo4-training.pdf",
    },
  ];

  const { escapeHTML } = window.FelixSite;
  const grid = document.getElementById("certGrid");
  if (!grid) return;

  grid.innerHTML = CERTIFICATES.map(
    (c, i) => `
    <article class="cert-card">
      <button type="button" class="cert-thumb" data-cert="${i}" aria-label="View certificate: ${escapeHTML(c.title)}">
        <img src="${escapeHTML(c.thumb || c.image)}" alt="Certificate: ${escapeHTML(c.title)}, ${escapeHTML(c.issuerShort)}" loading="lazy" />
        <span class="cert-zoom" aria-hidden="true">🔍 View</span>
      </button>
      <div class="cert-body">
        <div class="cert-meta">
          <span class="cert-issuer">${escapeHTML(c.issuerShort)}</span>
          <span class="cert-date">${escapeHTML(c.date)}</span>
        </div>
        <h3>${escapeHTML(c.title)}</h3>
        <p class="cert-org">${escapeHTML(c.issuer)}</p>
        <p class="cert-detail">${escapeHTML(c.detail)}</p>
        <ul class="cert-topics">${c.topics.map((t) => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
        <div class="cert-actions">
          <button type="button" class="btn btn-soft" data-cert="${i}">View certificate</button>
          ${
            c.pdf
              ? `<a class="btn btn-outline" href="${escapeHTML(c.pdf)}" target="_blank" rel="noopener noreferrer">Download PDF</a>`
              : ""
          }
        </div>
      </div>
    </article>`
  ).join("");

  // If a certificate image hasn't been uploaded yet, show a tidy placeholder
  grid.querySelectorAll(".cert-thumb img").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        const card = img.closest(".cert-card");
        img.closest(".cert-thumb").classList.add("is-missing");
        card.querySelectorAll("[data-cert]").forEach((el) => el.removeAttribute("data-cert"));
        const viewBtn = card.querySelector(".cert-actions .btn-soft");
        if (viewBtn) viewBtn.hidden = true;
      },
      { once: true }
    );
  });

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cert]");
    if (!btn || !window.FelixSite.openGallery) return;
    const c = CERTIFICATES[Number(btn.dataset.cert)];
    window.FelixSite.openGallery({
      photos: [c.image],
      label: `${c.title} · ${c.issuerShort} · ${c.date}`,
      alt: `Certificate: ${c.title}, awarded to Felix Oketch by ${c.issuerShort}`,
    });
  });

  const count = document.getElementById("certCount");
  if (count) count.textContent = CERTIFICATES.length;
})();
