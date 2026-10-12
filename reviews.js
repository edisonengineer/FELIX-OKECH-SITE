/* =========================================================
   Felix Oketch — Client reviews / testimonials
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Reviews ----------
     HOW TO ADD OR UPDATE A REVIEW
     • Photos go in the images/reviews/ folder. Use lowercase names with no
       spaces, e.g. "images/reviews/jane-1.jpg", "images/reviews/jane-2.jpg".
     • `text` and `rating` must be the client's OWN words and rating.
       Leave them out until the client sends them: the card then shows as a
       "Verified installation" with photos and system details, no stars.
     • Sample entries (`sample: true`) show a "Sample" tag and are never
       counted in the star-rating summary. Delete them once replaced.

     Fields: name, location, service, system (list), photos (list),
             rating (1–5, optional), text (optional), date ("Mon YYYY") */
  const REVIEWS = [
    {
      name: "Lawrence G.",
      location: "Malaa, Kangundo Road",
      service: "Hybrid solar system with lithium storage",
      system: ["12kW hybrid inverter", "11.67kWh lithium battery (LVTS-512228)", "6 × 610W solar panels (3.66kWp)"],
      photos: ["images/reviews/lawrence-3.jpg", "images/reviews/lawrence-1.jpg", "images/reviews/lawrence-2.jpg"],
      // rating: 5,          ← add when Lawrence sends his rating
      // text: "…",          ← add Lawrence's own words here
    },
    {
      name: "Christopher",
      location: "Tala",
      service: "Hybrid solar system with lithium storage",
      system: ["3kW hybrid inverter", "5.12kWh lithium battery", "4 × 610W solar panels (2.44kWp)"],
      photos: ["images/reviews/christopher-2.jpg", "images/reviews/christopher-1.jpg"],
      // rating: 5,          ← add when Christopher sends his rating
      // text: "…",          ← add Christopher's own words here
    },
    {
      sample: true,
      name: "Sample Homeowner",
      location: "Kasarani, Nairobi",
      service: "Hybrid inverter & lithium battery",
      rating: 5,
      text: "Replace this with a real client review. Example: Felix assessed our home, explained the options clearly and installed a system that keeps our lights, TV and fridge running during outages.",
      date: "Sample",
    },
  ];

  const { showToast, sendForm, escapeHTML } = window.FelixSite;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const track = $("#reviewTrack");
  if (!track) return;

  const stars = (n) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
  const initials = (name) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");

  /* ---------- Render cards ---------- */
  track.innerHTML = REVIEWS.map((r, i) => {
    const photos = r.photos || [];
    const hasReview = Boolean(r.text);
    return `
    <figure class="review-card${r.sample ? " is-sample" : ""}${photos.length ? " has-photo" : ""}">
      ${r.sample ? '<span class="sample-tag" title="Placeholder — replace with a real client review">Sample</span>' : ""}
      ${
        photos.length
          ? `<button type="button" class="review-photo" data-review="${i}" aria-label="View ${photos.length} installation photo${photos.length === 1 ? "" : "s"} for ${escapeHTML(r.name)}">
               <img src="${escapeHTML(photos[0])}" alt="Solar installation for ${escapeHTML(r.name)}, ${escapeHTML(r.location)}" loading="lazy" />
               <span class="photo-count">📷 ${photos.length} photo${photos.length === 1 ? "" : "s"}</span>
             </button>`
          : ""
      }
      ${!r.sample && !hasReview ? '<span class="verified-tag">✓ Verified installation</span>' : ""}
      ${r.rating ? `<div class="review-stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>` : ""}
      ${hasReview ? `<blockquote>“${escapeHTML(r.text)}”</blockquote>` : ""}
      ${
        r.system && r.system.length
          ? `<ul class="review-system">${r.system.map((x) => `<li>${escapeHTML(x)}</li>`).join("")}</ul>`
          : ""
      }
      <figcaption>
        <span class="review-avatar" aria-hidden="true">${escapeHTML(initials(r.name))}</span>
        <span class="review-who">
          <strong>${escapeHTML(r.name)}</strong>
          <small>${escapeHTML(r.location)}${r.date && !r.sample ? ` · ${escapeHTML(r.date)}` : ""}</small>
        </span>
      </figcaption>
      ${r.service ? `<span class="review-service">☀️ ${escapeHTML(r.service)}</span>` : ""}
    </figure>`;
  }).join("");

  /* ---------- Rating summary (real, rated reviews only) ---------- */
  const real = REVIEWS.filter((r) => !r.sample && r.rating);
  if (real.length) {
    const avg = real.reduce((s, r) => s + r.rating, 0) / real.length;
    $("#rsScore").textContent = avg.toFixed(1);
    $("#rsStars").textContent = stars(Math.round(avg));
    $("#rsCount").textContent = `from ${real.length} client review${real.length === 1 ? "" : "s"}`;
    $("#ratingSummary").hidden = false;
  }

  /* ---------- Photo lightbox ---------- */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Installation photos");
  lightbox.innerHTML = `
    <button type="button" class="lb-close" aria-label="Close photos">✕</button>
    <button type="button" class="lb-nav lb-prev" aria-label="Previous photo">‹</button>
    <figure class="lb-figure"><img alt="" /><figcaption></figcaption></figure>
    <button type="button" class="lb-nav lb-next" aria-label="Next photo">›</button>`;
  document.body.appendChild(lightbox);
  const lbImg = $("img", lightbox);
  const lbCap = $("figcaption", lightbox);
  let lbReview = null;
  let lbIndex = 0;
  let lbReturn = null;

  function showPhoto(n) {
    const photos = lbReview.photos;
    lbIndex = (n + photos.length) % photos.length;
    lbImg.src = photos[lbIndex];
    lbImg.alt = `Solar installation for ${lbReview.name}, ${lbReview.location} (photo ${lbIndex + 1} of ${photos.length})`;
    lbCap.textContent = `${lbReview.name} · ${lbReview.location} — ${lbIndex + 1} / ${photos.length}`;
    $$(".lb-nav", lightbox).forEach((b) => (b.hidden = photos.length < 2));
  }
  function openLightbox(i) {
    lbReview = REVIEWS[i];
    lbReturn = document.activeElement;
    showPhoto(0);
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    $(".lb-close", lightbox).focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lbReturn) lbReturn.focus();
  }
  track.addEventListener("click", (e) => {
    const btn = e.target.closest(".review-photo");
    if (btn) openLightbox(Number(btn.dataset.review));
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) showPhoto(lbIndex - 1);
    else if (e.target.closest(".lb-next")) showPhoto(lbIndex + 1);
    else if (e.target.closest(".lb-close") || e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
    if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
    if (e.key === "Tab") {
      const f = $$("button:not([hidden])", lightbox);
      const at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });

  /* ---------- Carousel arrows ---------- */
  const prev = $("#reviewPrev");
  const next = $("#reviewNext");
  const step = () => {
    const card = $(".review-card", track);
    return card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
  };
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    const scrollable = max > 0;
    prev.hidden = next.hidden = !scrollable;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  /* ---------- Leave-a-review modal ---------- */
  const modal = $("#reviewModal");
  const form = $("#reviewForm");
  const done = $("#reviewDone");
  const errorEl = $("#reviewError");
  const submitBtn = $("#reviewSubmit");
  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    form.hidden = false;
    done.hidden = true;
    modal.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => $("#star5").focus());
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  $("#openReview").addEventListener("click", openModal);
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-review]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      const f = $$("a[href], button:not([disabled]), input:not(.hp), select, textarea", modal).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    }
  });

  function showError(msg, el) {
    errorEl.textContent = msg;
    errorEl.classList.add("show");
    if (el) {
      el.setAttribute("aria-invalid", "true");
      el.focus();
    }
  }

  // Clear the error highlight as soon as the visitor fixes a field
  form.addEventListener("input", (e) => {
    const target = e.target.name === "Rating" ? $("#star5") : e.target;
    target.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.classList.remove("show");
    $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
    if (form.elements._honey.value) return;

    const rating = $("input[name=Rating]:checked", form);
    if (!rating) return showError("Please choose a star rating.", $("#star5"));
    for (const id of ["r-name", "r-location", "r-text"]) {
      const el = $(`#${id}`);
      if (!el.value.trim()) return showError(`Please fill in: ${$(`label[for=${id}]`).textContent.replace("*", "").trim()}.`, el);
    }
    if (!$("#r-consent").checked) return showError("Please tick the box to allow your review to be shown.", $("#r-consent"));

    const data = {};
    $$("input[name], select[name], textarea[name]", form).forEach((el) => {
      if (el.name.startsWith("_") || ((el.type === "radio" || el.type === "checkbox") && !el.checked)) return;
      if (el.value.trim()) data[el.name] = el.value.trim();
    });
    data.Rating = `${data.Rating} / 5 ${stars(Number(data.Rating))}`;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";
    try {
      await sendForm({ ...data, subject: `New website review: ${data.Name} (${data.Rating})` });
      form.reset();
      form.hidden = true;
      done.hidden = false;
      done.focus();
      showToast("Review sent — thank you!");
    } catch (err) {
      showError(err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Review";
    }
  });
})();
