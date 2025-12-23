// ---------- Search ----------
document.getElementById('searchBtn').addEventListener('click', searchAll);
document.getElementById('searchInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') searchAll();
});

function searchAll() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
}

// ---------- Popup ----------
function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}
function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// ---------- Workshop Data ----------
const workshopData = {
  xps: {
    title: "XPS Data Analysis Workshop",
    img: "XPSIMAGE.png",
    pdf: "#",
    desc: `Complete hands-on XPS training with peak fitting and real datasets.`
  },
  electro: {
    title: "Electrochemical Data Analysis",
    img: "images/w2.png",
    pdf: "#",
    desc: `CV, EIS, LSV, Nyquist & real case studies.`
  },
  origin: {
    title: "OriginPro Training",
    img: "images/w3.png",
    pdf: "#",
    desc: `Graphing, curve fitting & publication-ready plots.`
  }
};

// ---------- Workshop Details ----------
function openDetails(key) {
  const d = workshopData[key];
  if (!d) return;

  document.getElementById('workshopTitle').innerText = d.title;
  document.getElementById('workshopImg').src = d.img;
  document.getElementById('workshopDesc').innerText = d.desc;
  document.getElementById('workshopInfo').style.display = 'flex';

  document.body.style.overflow = 'hidden';
}

function closeDetails() {
  document.getElementById('workshopInfo').style.display = 'none';
  document.body.style.overflow = '';
}

// ---------- Counters ----------
document.querySelectorAll('.counter').forEach(counter => {
  const target = +counter.dataset.target;
  let count = 0;
  const step = target / 200;

  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      counter.innerText = target;
      clearInterval(interval);
    } else {
      counter.innerText = Math.ceil(count);
    }
  }, 20);
});

// ---------- Escape ----------
document.addEventListener('keydown', e => {
  if (e.key === "Escape") closeDetails();
});
