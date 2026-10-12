/* =========================================================
   Felix Oketch — Free Energy Assessment form
   Multi-step form, live solar sizing estimate, and submission
   by email (Web3Forms) with a WhatsApp copy.
   ========================================================= */

(() => {
  "use strict";

  const { waLink, showToast, sendForm, escapeHTML } = window.FelixSite;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Sizing assumptions ---------- */
  const SIZING = {
    peakSunHours: 5, // typical for most of Kenya
    systemEfficiency: 0.75, // wiring, inverter, heat and dust losses
    panelWatts: 550,
    nightShare: 0.5, // share of daily energy used when there is no sun
    batteryDoD: 0.8, // usable depth of discharge (lithium)
    inverterSizesKVA: [1, 1.5, 3, 5, 8, 10, 15, 20, 30],
  };

  /* ---------- Appliance list: typical watts and hours of use per day ---------- */
  const APPLIANCES = [
    { key: "bulb", label: "LED bulbs", icon: "💡", watts: 10, hours: 6 },
    { key: "tv", label: "Television", icon: "📺", watts: 80, hours: 5 },
    { key: "fridge", label: "Fridge", icon: "🧊", watts: 150, hours: 8 },
    { key: "freezer", label: "Freezer", icon: "❄️", watts: 200, hours: 10 },
    { key: "laptop", label: "Laptop", icon: "💻", watts: 60, hours: 6 },
    { key: "desktop", label: "Desktop computer", icon: "🖥️", watts: 200, hours: 6 },
    { key: "phone", label: "Phone charging", icon: "📱", watts: 10, hours: 3 },
    { key: "router", label: "Wi-Fi router", icon: "📶", watts: 15, hours: 24 },
    { key: "fan", label: "Fan", icon: "🌀", watts: 50, hours: 6 },
    { key: "sound", label: "Sound system", icon: "🔊", watts: 100, hours: 3 },
    { key: "cctv", label: "CCTV cameras", icon: "📹", watts: 10, hours: 24 },
    { key: "pump", label: "Water pump", icon: "🚰", watts: 750, hours: 1 },
    { key: "iron", label: "Electric iron", icon: "👔", watts: 1000, hours: 0.5 },
    { key: "microwave", label: "Microwave", icon: "🍲", watts: 1000, hours: 0.25 },
    { key: "washer", label: "Washing machine", icon: "🧺", watts: 500, hours: 1 },
    { key: "shower", label: "Electric shower / heater", icon: "🚿", watts: 3000, hours: 0.5 },
  ];

  const qty = Object.fromEntries(APPLIANCES.map((a) => [a.key, 0]));

  /* ---------- Elements ---------- */
  const form = $("#assessForm");
  if (!form) return;
  const steps = $$(".step", form);
  const stepDots = $$("#assessSteps li");
  const bar = $("#assessBar");
  const btnBack = $("#assessBack");
  const btnNext = $("#assessNext");
  const btnSubmit = $("#assessSubmit");
  const errorEl = $("#assessError");
  const doneEl = $("#assessDone");
  const grid = $("#applianceGrid");
  let current = 0;

  /* ---------- Appliance steppers ---------- */
  grid.innerHTML = APPLIANCES.map(
    (a) => `
    <div class="appliance" data-key="${a.key}">
      <span class="app-icon" aria-hidden="true">${a.icon}</span>
      <span class="app-text">
        <span class="app-name" id="app-${a.key}">${a.label}</span>
        <small>~${a.watts >= 1000 ? a.watts / 1000 + " kW" : a.watts + " W"} · ${a.hours} h/day</small>
      </span>
      <span class="stepper">
        <button type="button" data-step="-1" aria-label="Fewer ${a.label}">−</button>
        <input type="number" min="0" max="99" value="0" inputmode="numeric" aria-labelledby="app-${a.key}" />
        <button type="button" data-step="1" aria-label="More ${a.label}">+</button>
      </span>
    </div>`
  ).join("");

  function setQty(key, value) {
    const v = Math.max(0, Math.min(99, Math.round(Number(value) || 0)));
    qty[key] = v;
    const row = $(`.appliance[data-key="${key}"]`, grid);
    $("input", row).value = v;
    row.classList.toggle("selected", v > 0);
    updateEstimate();
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-step]");
    if (!btn) return;
    const key = btn.closest(".appliance").dataset.key;
    setQty(key, qty[key] + Number(btn.dataset.step));
  });
  grid.addEventListener("input", (e) => {
    if (e.target.matches("input")) setQty(e.target.closest(".appliance").dataset.key, e.target.value);
  });

  /* ---------- Live estimate ---------- */
  let estimate = {};

  function updateEstimate() {
    let dailyWh = 0;
    let loadW = 0;
    APPLIANCES.forEach((a) => {
      dailyWh += qty[a.key] * a.watts * a.hours;
      loadW += qty[a.key] * a.watts;
    });

    let daily = dailyWh / 1000;
    let basis = "appliances";
    const billKwh = Number($("#f-kwh").value) || 0;
    if (daily === 0 && billKwh > 0) {
      daily = billKwh / 30;
      loadW = (daily * 1000) / 6; // rough peak from bill when no appliances are listed
      basis = "bill";
    }

    const pvKw = daily / (SIZING.peakSunHours * SIZING.systemEfficiency);
    const panels = Math.ceil((pvKw * 1000) / SIZING.panelWatts);
    const batteryKwh = (daily * SIZING.nightShare) / SIZING.batteryDoD;
    const neededKVA = (loadW * 1.25) / 1000;
    const inv = SIZING.inverterSizesKVA.find((s) => s >= neededKVA);

    estimate = {
      basis,
      daily,
      monthly: daily * 30,
      loadW,
      pv: daily > 0 ? `${(panels * SIZING.panelWatts / 1000).toFixed(2)} kWp (${panels} × ${SIZING.panelWatts}W)` : "—",
      inverter: loadW > 0 ? (inv ? `${inv} kVA` : "30+ kVA (custom design)") : "—",
      battery: daily > 0 ? `≈ ${batteryKwh.toFixed(1)} kWh` : "—",
    };

    $("#estDaily").textContent = daily.toFixed(1);
    $("#estMonthly").textContent = `${Math.round(estimate.monthly).toLocaleString("en-KE")} kWh`;
    $("#estLoad").textContent = `${Math.round(loadW).toLocaleString("en-KE")} W`;
    $("#estPV").textContent = estimate.pv;
    $("#estInv").textContent = estimate.inverter;
    $("#estBatt").textContent = estimate.battery;
    $("#estimate").classList.toggle("has-data", daily > 0);
    $("#miniEst").textContent = `${daily.toFixed(1)} kWh/day`;
    $("#miniEstPV").textContent = daily > 0 ? `· ${estimate.pv.split(" (")[0]} panels` : "";
  }

  $("#f-kwh").addEventListener("input", updateEstimate);

  /* ---------- Step navigation ---------- */
  function showStep(i, { scroll = true } = {}) {
    current = i;
    steps.forEach((s, n) => s.classList.toggle("active", n === i));
    stepDots.forEach((d, n) => {
      d.classList.toggle("active", n === i);
      d.classList.toggle("done", n < i);
    });
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    btnBack.hidden = i === 0;
    btnNext.hidden = i === steps.length - 1;
    btnSubmit.hidden = i !== steps.length - 1;
    clearError();
    if (scroll && form.getBoundingClientRect().top < 0) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  btnNext.addEventListener("click", () => {
    if (validateStep(current)) showStep(current + 1);
  });
  btnBack.addEventListener("click", () => showStep(current - 1));

  // Enter in a text field moves to the next step instead of submitting early
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches("input:not([type=checkbox]):not([type=radio])") && current < steps.length - 1) {
      e.preventDefault();
      btnNext.click();
    }
  });

  /* ---------- Validation ---------- */
  function clearError() {
    errorEl.textContent = "";
    errorEl.classList.remove("show");
    $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
    $$(".chips.invalid", form).forEach((el) => el.classList.remove("invalid"));
  }

  function fail(el, message) {
    errorEl.textContent = message;
    errorEl.classList.add("show");
    if (el.classList.contains("chips")) {
      el.classList.add("invalid");
      $("input", el).focus();
    } else {
      el.setAttribute("aria-invalid", "true");
      el.focus();
    }
    return false;
  }

  function validateStep(i) {
    clearError();
    const step = steps[i];

    for (const el of $$("input[required]:not([type=radio]):not([type=checkbox]), select[required]", step)) {
      if (!el.value.trim()) {
        const label = $(`label[for="${el.id}"]`, step);
        return fail(el, `Please fill in: ${label ? label.textContent.replace("*", "").trim() : "this field"}.`);
      }
    }

    const phone = $("#f-phone", step);
    if (phone && !/^\+?[0-9][0-9\s-]{8,15}$/.test(phone.value.trim())) {
      return fail(phone, "Please enter a valid phone number, e.g. 0712 345 678 or +254 712 345 678.");
    }

    const email = $("#f-email", step);
    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      return fail(email, "Please enter a valid email address, or leave it blank.");
    }

    const radioGroup = $("input[type=radio][required]", step);
    if (radioGroup && !$(`input[name="${radioGroup.name}"]:checked`, step)) {
      return fail(radioGroup.closest(".chips"), "Please choose who the system is for.");
    }

    for (const group of $$("[data-require-one]", step)) {
      if (!$("input:checked", group)) return fail(group, "Please select at least one option.");
    }

    const consent = $("#f-consent", step);
    if (consent && !consent.checked) {
      return fail(consent, "Please tick the box to agree to be contacted.");
    }
    return true;
  }

  /* ---------- Collect answers ---------- */
  function collect() {
    const data = {};
    $$("input[name], select[name], textarea[name]", form).forEach((el) => {
      if (el.name.startsWith("_")) return;
      if (el.type === "checkbox" || el.type === "radio") {
        if (!el.checked) return;
        data[el.name] = data[el.name] ? `${data[el.name]}, ${el.value}` : el.value;
      } else if (el.value.trim()) {
        data[el.name] = el.value.trim();
      }
    });

    const apps = APPLIANCES.filter((a) => qty[a.key] > 0).map((a) => `${qty[a.key]} × ${a.label}`);
    data["Appliances"] = apps.length ? apps.join(", ") : "None listed";

    updateEstimate();
    if (estimate.daily > 0) {
      data["Estimated daily use"] = `${estimate.daily.toFixed(1)} kWh/day (from ${estimate.basis === "bill" ? "monthly bill" : "appliance list"})`;
      data["Estimated connected load"] = `${Math.round(estimate.loadW)} W`;
      data["Suggested solar panels"] = estimate.pv;
      data["Suggested inverter"] = estimate.inverter;
      data["Suggested battery"] = estimate.battery;
    }
    return data;
  }

  function whatsappSummary(data) {
    const lines = Object.entries(data).map(([k, v]) => `*${k}:* ${v}`);
    return `Hello Felix, here is my solar energy assessment:\n\n${lines.join("\n")}`;
  }

  /* ---------- Submit ---------- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateStep(current)) return;

    // Spam bots fill the hidden field; quietly ignore them
    if (form.elements._honey.value) return;

    const data = collect();
    $("#assessWhatsApp").href = waLink(whatsappSummary(data));

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Sending…";

    try {
      await sendForm({
        ...data,
        subject: `New solar assessment: ${data["Full name"]} (${data["Location"]})`,
        ...(data.Email ? { replyto: data.Email } : {}),
      });

      steps.forEach((s) => s.classList.remove("active"));
      $(".step-nav", form).hidden = true;
      $("#assessSteps").hidden = true;
      $(".progress", form).hidden = true;
      doneEl.hidden = false;
      doneEl.focus();
      showToast("Assessment sent successfully");
    } catch (err) {
      errorEl.innerHTML = `${escapeHTML(err.message)} <a href="${waLink(whatsappSummary(data))}" target="_blank" rel="noopener noreferrer">Or send your answers on WhatsApp now</a>.`;
      errorEl.classList.add("show");
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Submit Assessment";
    }
  });

  $("#assessRestart").addEventListener("click", () => {
    form.reset();
    APPLIANCES.forEach((a) => setQty(a.key, 0));
    doneEl.hidden = true;
    $(".step-nav", form).hidden = false;
    $("#assessSteps").hidden = false;
    $(".progress", form).hidden = false;
    showStep(0);
  });

  showStep(0, { scroll: false });
  updateEstimate();
})();
