let currentWorkshopKey = null;

/* ===============================
   GLOBAL WORKSHOP DATA
================================ */let currentWorkshopKey = null;

/* ===============================
   GLOBAL WORKSHOP DATA
================================ */
const WORKSHOP_DATA = {
  xps: {
    title: "XPS Data Analysis",
    desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets.",
    price: "₹2,999",
    img: "images/w1.png"
  },
  electro: {
    title: "Electrochemical Analysis",
    desc: "EIS, CV, LSV, GCD and Nyquist plot based training.",
    price: "₹2,999",
    img: "images/w2.png"
  },
  origin: {
    title: "OriginPro Training",
    desc: "Publication quality graphing, curve fitting and statistics.",
    price: "₹2,999",
    img: "images/w3.png"
  },
  xrd: {
    title: "XRD Data Analysis",
    desc: "Rietveld refinement, peak indexing and structure analysis.",
    price: "₹2,999",
    img: "images/w4.png"
  },
  chemdraw: {
    title: "ChemDraw Hands-on",
    desc: "Professional chemical drawing and reaction schemes.",
    price: "₹2,999", // [REPLACEMENT] Pehle yahan price missing thi
    img: "images/w5.png"
  },
  dwsim: {
    title: "DWSIM Simulation",
    desc: "Chemical process simulation with reactors and distillation.",
    price: "₹2,999",
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
function openRegister(workshopKey) {
  const data = WORKSHOP_DATA[workshopKey];
  if (!data) return;

  selectedWorkshop = data.title; // Global variable update

  // In IDs ko ensure karein ki HTML mein sirf ek hi baar hon
  document.getElementById("workshopDisplay").value = data.title;
  document.getElementById("workshopInput").value = data.title;
  document.getElementById("priceDisplay").value = data.price;
  document.getElementById("priceInput").value = data.price;

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
  const name = document.getElementById("nameInput").value.trim();
  const mobile = document.getElementById("mobileInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const utr = document.getElementById("utrInput").value;

  if (!name || !mobile || !email || utr.length !== 12) {
    alert("कृपया सभी विवरण सही भरें (12 अंकों का UTR आवश्यक है)");
    return;
  }

  const workshop = document.getElementById("workshopInput").value;
  const price = document.getElementById("priceInput").value;
  
  const data = { name, mobile, email, workshop, price, utr };

  // Button ko disable karein loading ke liye
  const submitBtn = document.querySelector(".btn-success");
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  fetch("https://script.google.com/macros/s/AKfycbz6mKX2CczllDEFjz0YtpTYBH_i6zRjVNtv_zkUqXlout9K0q4zFE6gGBPwHbF8T05Zlw/exec", {
    method: "POST",
    mode: "no-cors", // CORS issues se bachne ke liye
    body: JSON.stringify(data)
  })
  .then(() => {
    // Note: no-cors mode mein response read nahi ho sakta, 
    // isliye hum sidhe WhatsApp par bhej rahe hain
    const msg = `Hello Nova Academy,%0A%0AWorkshop: *${selectedWorkshop}*%0AName: ${name}%0AMobile: ${mobile}%0AUTR: ${utr}`;
    
    window.open(`https://wa.me/919598183089?text=${msg}`, "_blank");
    showToast("Registration Sent ✔");
    closePopup("registerPopup");
    submitBtn.innerText = "Complete Registration";
    submitBtn.disabled = false;
  })
  .catch((err) => {
    console.error(err);
    alert("कुछ त्रुटi हुई, पुनः प्रयास करें");
    submitBtn.innerText = "Complete Registration";
    submitBtn.disabled = false;
  });
}

document.getElementById("enrollBtn")?.addEventListener("click", () => {
  closePopup("workshopDetailsPopup");
  if (currentWorkshopKey) {
    openRegister(currentWorkshopKey);
  }
});
const WORKSHOP_DATA = {
  xps: {
    title: "XPS Data Analysis",
    desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets.",
    price: "₹2,999",
    img: "images/w1.png"
  },
  electro: {
    title: "Electrochemical Analysis",
    desc: "EIS, CV, LSV, GCD and Nyquist plot based training.",
    price: "₹2,999",
    img: "images/w2.png"
  },
  origin: {
    title: "OriginPro Training",
    desc: "Publication quality graphing, curve fitting and statistics.",
    price: "₹2,999",
    img: "images/w3.png"
  },
  xrd: {
    title: "XRD Data Analysis",
    desc: "Rietveld refinement, peak indexing and structure analysis.",
    price: "₹2,999",
    img: "images/w4.png"
  },
  chemdraw: {
    title: "ChemDraw Hands-on",
    desc: "Professional chemical drawing and reaction schemes.",
    price: "₹2,999", // [REPLACEMENT] Pehle yahan price missing thi
    img: "images/w5.png"
  },
  dwsim: {
    title: "DWSIM Simulation",
    desc: "Chemical process simulation with reactors and distillation.",
    price: "₹2,999",
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
function openRegister(workshopKey) {
  const data = WORKSHOP_DATA[workshopKey];
  if (!data) return;

  selectedWorkshop = data.title;

  document.getElementById("workshopDisplay").value = data.title;
  document.getElementById("workshopInput").value = data.title;

  document.getElementById("priceDisplay").value = data.price;
  document.getElementById("priceInput").value = data.price;

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
  const name = document.getElementById("nameInput").value.trim();
  const mobile = document.getElementById("mobileInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const utr = document.getElementById("utrInput").value;

  if (!name || !mobile || !email || utr.length !== 12) {
    alert("कृपया सभी विवरण सही भरें (12 अंकों का UTR आवश्यक है)");
    return;
  }

  const workshop = document.getElementById("workshopInput").value;
  const price = document.getElementById("priceInput").value;
  
  const data = { name, mobile, email, workshop, price, utr };

  // Button ko disable karein loading ke liye
  const submitBtn = document.querySelector(".btn-success");
  submitBtn.innerText = "Processing...";
  submitBtn.disabled = true;

  fetch("https://script.google.com/macros/s/AKfycbz6mKX2CczllDEFjz0YtpTYBH_i6zRjVNtv_zkUqXlout9K0q4zFE6gGBPwHbF8T05Zlw/exec", {
    method: "POST",
    mode: "no-cors", // CORS issues se bachne ke liye
    body: JSON.stringify(data)
  })
  .then(() => {
    // Note: no-cors mode mein response read nahi ho sakta, 
    // isliye hum sidhe WhatsApp par bhej rahe hain
    const msg = `Hello Nova Academy,%0A%0AWorkshop: *${selectedWorkshop}*%0AName: ${name}%0AMobile: ${mobile}%0AUTR: ${utr}`;
    
    window.open(`https://wa.me/919598183089?text=${msg}`, "_blank");
    showToast("Registration Sent ✔");
    closePopup("registerPopup");
    submitBtn.innerText = "Complete Registration";
    submitBtn.disabled = false;
  })
  .catch((err) => {
    console.error(err);
    alert("कुछ त्रुटi हुई, पुनः प्रयास करें");
    submitBtn.innerText = "Complete Registration";
    submitBtn.disabled = false;
  });
}

document.getElementById("enrollBtn")?.addEventListener("click", () => {
  closePopup("workshopDetailsPopup");
  if (currentWorkshopKey) {
    openRegister(currentWorkshopKey);
  }
});
