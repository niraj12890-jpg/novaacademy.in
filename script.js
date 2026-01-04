/* ===============================
   GLOBAL WORKSHOP DATA
================================ */
const WORKSHOP_DATA = {
  xps: {
    title: "XPS Data Analysis",
    desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets.",
    img: "images/w1.png"
  },
  electro: {
    title: "Electrochemical Analysis",
    desc: "EIS, CV, LSV, GCD and Nyquist plot based training.",
    img: "images/w2.png"
  },
  origin: {
    title: "OriginPro Training",
    desc: "Publication quality graphing, curve fitting and statistics.",
    img: "images/w3.png"
  },
  xrd: {
    title: "XRD Data Analysis",
    desc: "Rietveld refinement, peak indexing and structure analysis.",
    img: "images/w4.png"
  },
  chemdraw: {
    title: "ChemDraw Hands-on",
    desc: "Professional chemical drawing and reaction schemes.",
    img: "images/w5.png"
  },
  dwsim: {
    title: "DWSIM Simulation",
    desc: "Chemical process simulation with reactors and distillation.",
    img: "images/w6.png"
  }
};

let selectedWorkshop = "";

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ---- Mouse Glow ---- */
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", e => {
    requestAnimationFrame(() => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  });

  /* ---- Search ---- */
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const val = e.target.value.toLowerCase();
      document.querySelectorAll(".workshop-card-item").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  /* ---- Counters ---- */
  const counters = document.querySelectorAll(".counter");
  if (counters.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;
        const step = target / 50;

        const update = () => {
          if (count < target) {
            count += step;
            el.innerText = Math.ceil(count) + "+";
            setTimeout(update, 20);
          } else {
            el.innerText = target + "+";
          }
        };
        update();
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }
});

/* ===============================
   POPUPS
================================ */
function openPopup(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closePopup(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

/* ===============================
   WORKSHOP DETAILS
================================ */
function openDetails(type) {
  const data = WORKSHOP_DATA[type];
  if (!data) return;

  document.getElementById("workshopTitle").innerText = data.title;
  document.getElementById("workshopDesc").innerText = data.desc;
  document.getElementById("workshopImg").src = data.img;

  openPopup("workshopDetailsPopup");
}

/* ===============================
   REGISTER FLOW
================================ */
function openRegister(workshopName) {
  selectedWorkshop = workshopName;
  openPopup("registerPopup");
}

/* ===============================
   UTR VALIDATION
================================ */
function validateUTR(input) {
  input.value = input.value.replace(/\D/g, "");
  input.classList.toggle("utr-valid", input.value.length === 12);
  input.classList.toggle("utr-invalid", input.value.length !== 12);
}

/* ===============================
   TOAST
================================ */
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* ===============================
   QR ZOOM
================================ */
function openQrZoom(src) {
  document.getElementById("qrOverlayImg").src = src;
  document.getElementById("qrOverlay").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeQrZoom() {
  document.getElementById("qrOverlay").style.display = "none";
  document.body.style.overflow = "auto";
}

/* ===============================
   SINGLE SMART SUBMIT
================================ */
function submitAndWhatsapp() {

  const name = document.querySelector('#registerPopup input[placeholder="Name"]').value.trim();
  const mobile = document.querySelector('#registerPopup input[placeholder="Number"]').value.trim();
  const email = document.querySelector('#registerPopup input[type="email"]').value.trim();
  const utr = document.getElementById("utrInput").value;

  if (!name || !mobile || !email || utr.length !== 12) {
    alert("कृपया सभी विवरण सही भरें (12 अंकों का UTR आवश्यक है)");
    return;
  }

  const data = { name, mobile, email, workshop: selectedWorkshop, utr };

  fetch("https://script.google.com/macros/s/AKfycbz6mKX2CczllDEFjz0YtpTYBH_i6zRjVNtv_zkUqXlout9K0q4zFE6gGBPwHbF8T05Zlw/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(r => r.json())
  .then(() => {
    const msg =
`Hello Nova Academy,%0A
Workshop: *${selectedWorkshop}*%0A
Name: ${name}%0A
Mobile: ${mobile}%0A
UTR: ${utr}`;

    window.open(`https://wa.me/919598183089?text=${msg}`, "_blank");
    showToast("Registration Completed ✔");
    closePopup("registerPopup");
  })
  .catch(() => alert("कुछ त्रुटि हुई, पुनः प्रयास करें"));
}
