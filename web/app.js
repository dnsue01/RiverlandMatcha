const SLOT_COUNT = 8;
const STORAGE_KEY = "riverland-dream-table-v2";

const state = {
  slots: new Array(SLOT_COUNT).fill(null),
  dayFilter: "all",
  search: ""
};

const rosterEl = document.getElementById("roster");
const tableEl = document.getElementById("table");
const searchEl = document.getElementById("search");
const searchClearBtn = document.getElementById("searchClear");
const filtersEl = document.getElementById("filters");
const slotsIndicatorEl = document.getElementById("slotsIndicator");

function normalize(str){
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’.!/\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toast(msg){
  let el = document.getElementById("toast");
  if (!el){
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("is-visible");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("is-visible"), 2400);
}

function hueFromName(name){
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

function initials(name){
  return name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function createPlaceholderEl(name){
  const hue1 = hueFromName(name);
  const hue2 = (hue1 + 55) % 360;
  const init = initials(name);
  const div = document.createElement("div");
  div.className = "placeholder";
  div.style.background = `linear-gradient(135deg, hsl(${hue1}, 70%, 25%) 0%, hsl(${hue2}, 75%, 15%) 100%)`;
  div.style.border = "1px solid rgba(255,255,255,0.12)";
  div.textContent = init;
  return div;
}

function buildSlots(){
  tableEl.querySelectorAll(".slot").forEach(el => el.remove());
  for (let i = 0; i < SLOT_COUNT; i++){
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = i;
    slot.innerHTML = `<span class="slot-num">${i + 1}</span>`;
    
    slot.addEventListener("dragover", e => {
      e.preventDefault();
      slot.classList.add("drag-over");
    });
    slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
    slot.addEventListener("drop", e => {
      e.preventDefault();
      slot.classList.remove("drag-over");
      const slug = e.dataTransfer.getData("text/plain");
      placeArtist(slug, i);
    });
    slot.addEventListener("click", () => {
      if (state.slots[i]) {
        const removed = state.slots[i];
        releaseSlot(i);
        toast(`QUITADO: ${removed.name}`);
      }
    });
    tableEl.appendChild(slot);
  }
}

function firstEmptySlot(){
  return state.slots.findIndex(s => s === null);
}

function isPlaced(slug){
  return state.slots.some(s => s && s.slug === slug);
}

function placeArtist(slug, index){
  const artist = ARTISTS.find(a => a.slug === slug);
  if (!artist) return;

  const currentIndex = state.slots.findIndex(s => s && s.slug === slug);
  
  if (index === undefined || index === null){
    if (currentIndex !== -1){
      toast(`${artist.name} YA ESTÁ EN EL HUECO #${currentIndex + 1}`);
      return;
    }
    index = firstEmptySlot();
    if (index === -1){
      toast("TU MESA ESTÁ LLENA (8/8) — HAZ CLIC EN UN HUECO PARA QUITARLO");
      return;
    }
  } else {
    if (currentIndex !== -1 && currentIndex !== index){
      state.slots[currentIndex] = null;
    }
  }

  state.slots[index] = artist;
  save();
  render();
  toast(`AÑADIDO: ${artist.name} (#${index + 1})`);
}

function releaseSlot(index){
  state.slots[index] = null;
  save();
  render();
}

function renderTable(){
  const slotEls = tableEl.querySelectorAll(".slot");
  let occupiedCount = 0;

  slotEls.forEach((el, i) => {
    const artist = state.slots[i];
    if (!artist){
      el.className = "slot";
      el.innerHTML = `<span class="slot-num">${i + 1}</span>`;
      return;
    }
    occupiedCount++;
    el.className = "slot filled" + (artist.special ? " special" : "");
    el.innerHTML = "";

    const mediaDiv = document.createElement("div");
    mediaDiv.className = "slot-media";

    const img = document.createElement("img");
    img.src = `img/${artist.slug}.jpg`;
    img.alt = artist.name;
    img.loading = "lazy";
    img.onerror = () => {
      img.replaceWith(createPlaceholderEl(artist.name));
    };
    mediaDiv.appendChild(img);

    const hint = document.createElement("div");
    hint.className = "slot-remove-hint";
    hint.textContent = "QUITAR ✕";
    mediaDiv.appendChild(hint);

    const footer = document.createElement("div");
    footer.className = "slot-footer";
    const nameSpan = document.createElement("span");
    nameSpan.className = "slot-name";
    nameSpan.title = artist.name;
    nameSpan.textContent = artist.name;
    footer.appendChild(nameSpan);

    el.appendChild(mediaDiv);
    el.appendChild(footer);
  });

  if (slotsIndicatorEl){
    slotsIndicatorEl.textContent = `${occupiedCount} / ${SLOT_COUNT} OCUPADOS`;
  }
}

function updateFilterCounts(){
  const countAll = ARTISTS.length;
  const countVie = ARTISTS.filter(a => a.day === "VIE").length;
  const countSab = ARTISTS.filter(a => a.day === "SAB").length;
  const countDom = ARTISTS.filter(a => a.day === "DOM").length;

  const elAll = document.getElementById("count-all");
  const elVie = document.getElementById("count-vie");
  const elSab = document.getElementById("count-sab");
  const elDom = document.getElementById("count-dom");

  if (elAll) elAll.textContent = countAll;
  if (elVie) elVie.textContent = countVie;
  if (elSab) elSab.textContent = countSab;
  if (elDom) elDom.textContent = countDom;
}

function renderRoster(){
  const q = normalize(state.search);
  const filtered = ARTISTS.filter(a => {
    const dayOk = state.dayFilter === "all" || a.day === state.dayFilter;
    const nameNorm = normalize(a.name);
    const stageNorm = normalize(a.stage);
    const searchOk = !q || nameNorm.includes(q) || stageNorm.includes(q);
    return dayOk && searchOk;
  });

  const countEl = document.getElementById("count");
  if (countEl) countEl.textContent = `${filtered.length}`;

  rosterEl.innerHTML = "";
  if (!filtered.length){
    const empty = document.createElement("div");
    empty.className = "grid-empty";
    empty.textContent = "NINGÚN ARTISTA COINCIDE";
    rosterEl.appendChild(empty);
    return;
  }

  filtered.forEach(artist => {
    const used = isPlaced(artist.slug);
    const card = document.createElement("div");
    card.className = "card" + (used ? " used" : "") + (artist.special ? " special" : "");
    card.draggable = !used;
    card.dataset.slug = artist.slug;

    const dayClass = artist.special ? "day-esp"
      : (artist.day === "VIE" ? "day-vie" : (artist.day === "SAB" ? "day-sab" : "day-dom"));

    const media = document.createElement("div");
    media.className = "card-media";

    const img = document.createElement("img");
    img.src = `img/${artist.slug}.jpg`;
    img.alt = artist.name;
    img.loading = "lazy";
    img.onerror = () => {
      img.replaceWith(createPlaceholderEl(artist.name));
    };
    media.appendChild(img);

    const badge = document.createElement("span");
    badge.className = `card-day-badge ${dayClass}`;
    badge.textContent = artist.special ? "★ ESPECIAL" : artist.day;
    media.appendChild(badge);

    if (used){
      const placedBadge = document.createElement("div");
      placedBadge.className = "card-placed-badge";
      placedBadge.innerHTML = "<span>✓ EN MESA</span>";
      media.appendChild(placedBadge);
    }

    const info = document.createElement("div");
    info.className = "card-info";

    const name = document.createElement("div");
    name.className = "card-name";
    name.title = artist.name;
    name.textContent = artist.name;
    info.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "card-meta";
    
    const stage = document.createElement("span");
    stage.className = "card-stage";
    stage.textContent = artist.stage;
    meta.appendChild(stage);

    const time = document.createElement("span");
    time.className = "card-time";
    time.textContent = artist.time;
    meta.appendChild(time);

    info.appendChild(meta);

    card.appendChild(media);
    card.appendChild(info);

    card.addEventListener("dragstart", e => {
      if (used) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", artist.slug);
    });

    card.addEventListener("click", () => {
      if (!used){
        placeArtist(artist.slug);
      } else {
        const slotIdx = state.slots.findIndex(s => s && s.slug === artist.slug);
        if (slotIdx !== -1) {
          releaseSlot(slotIdx);
          toast(`QUITADO: ${artist.name}`);
        }
      }
    });

    rosterEl.appendChild(card);
  });
}

function render(){
  renderTable();
  renderRoster();
}

function save(){
  const slugs = state.slots.map(s => s ? s.slug : null);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

function load(){
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(raw)) throw new Error("bad state");
    const seen = new Set();
    state.slots = raw.slice(0, SLOT_COUNT).map(slug => {
      if (typeof slug !== "string" || seen.has(slug)) return null;
      const artist = ARTISTS.find(a => a.slug === slug);
      if (!artist) return null;
      seen.add(slug);
      return artist;
    });
    while (state.slots.length < SLOT_COUNT) state.slots.push(null);
  } catch(e){
    state.slots = new Array(SLOT_COUNT).fill(null);
  }
}

// Controls
document.getElementById("shuffle").addEventListener("click", () => {
  const pool = [...ARTISTS].sort(() => Math.random() - 0.5);
  const picked = [];
  for (const a of pool){
    if (picked.length >= SLOT_COUNT) break;
    picked.push(a);
  }
  state.slots = picked;
  while (state.slots.length < SLOT_COUNT) state.slots.push(null);
  save();
  render();
  toast("MESA RELLENADA ALEATORIAMENTE");
});

document.getElementById("clear").addEventListener("click", () => {
  state.slots = new Array(SLOT_COUNT).fill(null);
  save();
  render();
  toast("MESA VACIADA");
});

document.getElementById("share").addEventListener("click", async () => {
  const lines = state.slots.map((a, i) => {
    if (!a) return `${i + 1}. [Vacío]`;
    return `${i + 1}. ${a.name} (${a.day} · ${a.stage} · ${a.time})`;
  });
  const text = "🍵 MI DREAM MATCHA ROTATION · RIVERLAND 2026 🍵\n\n" + lines.join("\n") + "\n\n#Riverland2026 #DreamMatcha";
  const btn = document.getElementById("share");
  const original = btn.textContent;
  const done = () => {
    btn.textContent = "COPIADO!";
    toast("LINEUP COPIADO AL PORTAPAPELES");
    setTimeout(() => btn.textContent = original, 1800);
  };
  try {
    if (navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    done();
  } catch(e){
    toast("NO SE PUDO COPIAR AUTOMÁTICAMENTE");
  }
});

searchEl.addEventListener("input", () => {
  state.search = searchEl.value;
  if (searchClearBtn){
    searchClearBtn.style.display = searchEl.value ? "block" : "none";
  }
  renderRoster();
});

if (searchClearBtn){
  searchClearBtn.addEventListener("click", () => {
    searchEl.value = "";
    state.search = "";
    searchClearBtn.style.display = "none";
    renderRoster();
    searchEl.focus();
  });
}

filtersEl.addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  filtersEl.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
  btn.classList.add("is-active");
  state.dayFilter = btn.dataset.day;
  renderRoster();
});

// Initialization
load();
buildSlots();
updateFilterCounts();
render();

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader){
    setTimeout(() => {
      loader.classList.add("is-hidden");
    }, 1200);
  }
});
