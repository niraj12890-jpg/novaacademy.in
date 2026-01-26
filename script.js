let currentWorkshopKey = null;
let selectedWorkshop = "";

/* ===============================
   GLOBAL WORKSHOP DATA
================================ */
const WORKSHOP_DATA = {
  xps: { title: "XPS Data Analysis", desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting.", price: "₹2,999", img: "images/w1.png" },
  electro: { title: "Electrochemical Analysis", desc: "EIS, CV, LSV, GCD and Nyquist plot based training.", price: "₹2,999", img: "images/w2.png" },
  origin: { title: "OriginPro Training", desc: "Publication quality graphing, curve fitting and statistics.", price: "₹2,999", img: "images/w3.png" },
  xrd: { title: "XRD Data Analysis", desc: "Rietveld refinement and structure analysis.", price: "₹2,999", img: "images/w4.png" },
  chemdraw: { title: "ChemDraw Hands-on", desc: "Professional chemical drawing and reactions.", price: "₹2,999", img: "images/w5.png" },
  dwsim: { title: "DWSIM Simulation", desc: "Chemical process simulation training.", price: "₹2,999", img: "images/w6.png" }
};

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* Mouse Glow */
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });

  /* Search */
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const val = e.target.value.toLowerCase();
      document.querySelectorAll(".workshop-card-item").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  /* Enroll Button */
  const enrollBtn = document.getElementById("enrollBtn");
  if (enrollBtn) {
    enrollBtn.addEventListener("click", () => {
      closePopup("workshopDetailsPopup");
      if (currentWorkshopKey) openRegister(currentWorkshopKey);
    });
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

  currentWorkshopKey = type;
  document.getElementById("workshopTitle").innerText = data.title;
  document.getElementById("workshopDesc").innerText = data.desc;
  document.getElementById("workshopPrice").innerText = data.price;
  document.getElementById("workshopImg").src = data.img;

  openPopup("workshopDetailsPopup");
}

/* ===============================
   REGISTER FLOW
================================ */
/* --- UTR Verification Logic --- */
function validateUTR(input) {
  const utrValue = input.value.trim();
  const tickElement = document.getElementById('utrTick');
  
  // UTR आमतौर पर 12 अंकों का होता है
  if (utrValue.length === 12) {
    input.classList.add('utr-valid');
    tickElement.style.display = 'block'; // ग्रीन टिक दिखाओ
  } else {
    input.classList.remove('utr-valid');
    tickElement.style.display = 'none'; // टिक छुपाओ
  }
}

// openRegister फंक्शन को अपडेट करें ताकि इसमें validation जुड़ सके
function openRegister(key) {
  const data = WORKSHOP_DATA[key];
  if (!data) return;

  document.getElementById("workshopDisplay").value = data.title;
  document.getElementById("workshopInput").value = data.title;
  document.getElementById("priceDisplay").innerText = data.price;
  
  // फॉर्म साफ़ करें
  document.getElementById("utrInput").value = "";
  document.getElementById("utrTick").style.display = "none";
  document.getElementById("utrInput").classList.remove('utr-valid');

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
}

function closeQrZoom() {
  document.getElementById("qrOverlay").style.display = "none";
}

/* ===============================
   SUBMIT
================================ */
function submitAndWhatsapp() {
  const name = document.getElementById("nameInput").value.trim();
  const mobile = document.getElementById("mobileInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const utr = document.getElementById("utrInput").value;

  if (!name || !mobile || !email || utr.length !== 12) {
    alert("कृपया सभी विवरण सही भरें (12 अंकों का UTR आवश्यक है)");
    return;
  }

  const workshop = document.getElementById("workshopInput").value;
  const msg = `Hello Nova Academy,%0AWorkshop: ${workshop}%0AName: ${name}%0AMobile: ${mobile}%0AUTR: ${utr}`;

  window.open(`https://wa.me/919598183089?text=${msg}`, "_blank");

  showToast("Registration Sent ✔");
  closePopup("registerPopup");
}
