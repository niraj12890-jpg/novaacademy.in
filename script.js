/* ============================================
   NOVA ACADEMY - PRODUCTION READY JAVASCRIPT
   Clean, Optimized, No Duplicates
   ============================================ */

/* ===============================
   GLOBAL VARIABLES
================================ */
let currentWorkshopKey = null;
let selectedWorkshop = "";

/* ===============================
   GLOBAL WORKSHOP DATA
================================ */
const WORKSHOP_DATA = {
  xps: {
    title: "XPS Data Analysis",
    desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets.",
    price: "₹2,999",
    priceValue: 2999,
    img: "images/w1.png"
  },
  electro: {
    title: "Electrochemical Analysis",
    desc: "EIS, CV, LSV, GCD and Nyquist plot based training.",
    price: "Live Sessions",
    priceValue: 2999,
    img: "images/w2.png"
  },
  origin: {
    title: "OriginPro Graphing",
    desc: "Publication quality graphing, curve fitting and statistics.",
    price: "₹2,499",
    priceValue: 2499,
    img: "images/w3.png"
  },
  xrd: {
    title: "XRD Data Analysis",
    desc: "Rietveld refinement, peak indexing and structure analysis.",
    price: "₹2,799",
    priceValue: 2799,
    img: "images/w4.png"
  },
  chemdraw: {
    title: "ChemDraw Hands-on",
    desc: "Professional chemical drawing and reaction schemes.",
    price: "₹1,999",
    priceValue: 1999,
    img: "images/w5.png"
  },
  dwsim: {
    title: "DWSIM Chemical Simulation",
    desc: "Chemical process simulation with reactors and distillation.",
    price: "₹3,499",
    priceValue: 3499,
    img: "images/w6.png"
  }
};

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ---- Mouse Glow Effect ---- */
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", e => {
    requestAnimationFrame(() => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  });

  /* ---- Search Functionality ---- */
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const val = e.target.value.toLowerCase();
      document.querySelectorAll(".workshop-card-item").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(val) ? "" : "none";
      });
    });
  }

  /* ---- Counter Animation ---- */
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

  /* ---- Enroll Button Event Listener ---- */
  const enrollBtn = document.getElementById("enrollBtn");
  if (enrollBtn) {
    enrollBtn.addEventListener("click", () => {
      closePopup("workshopDetailsPopup");
      if (currentWorkshopKey) {
        openRegister(currentWorkshopKey);
      }
    });
  }
});

/* ===============================
   POPUP CONTROLS
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
   OPEN ENQUIRY WITH WORKSHOP
================================ */
function openEnquiryWithWorkshop(workshopKey) {
  const data = WORKSHOP_DATA[workshopKey];
  if (!data) {
    console.error("Workshop data not found for:", workshopKey);
    openPopup('enquirePopup');
    return;
  }
  
  // Set workshop in dropdown
  const workshopSelect = document.getElementById('enq_workshop');
  if (workshopSelect) {
    workshopSelect.value = data.title;
  }
  
  // Open enquiry popup
  openPopup('enquirePopup');
}

/* ===============================
   WORKSHOP DETAILS
================================ */
function openDetails(type) {
  const data = WORKSHOP_DATA[type];
  if (!data) {
    console.error("Workshop data not found for:", type);
    return;
  }
  
  currentWorkshopKey = type;
  
  const titleEl = document.getElementById("workshopTitle");
  const descEl = document.getElementById("workshopDesc");
  const priceEl = document.getElementById("workshopPrice");
  const imgEl = document.getElementById("workshopImg");
  
  if (titleEl) titleEl.innerText = data.title;
  if (descEl) descEl.innerText = data.desc;
  if (priceEl) priceEl.innerText = data.price;
  if (imgEl) imgEl.src = data.img;

  openPopup("workshopDetailsPopup");
}

/* ===============================
   REGISTER FLOW
================================ */
function openRegister(workshopKey) {
  const data = WORKSHOP_DATA[workshopKey];
  if (!data) {
    console.error("Workshop data not found for:", workshopKey);
    return;
  }

  selectedWorkshop = data.title;

  const workshopDisplayEl = document.getElementById("workshopDisplay");
  const workshopInputEl = document.getElementById("workshopInput");
  const priceDisplayEl = document.getElementById("priceDisplay");
  const priceInputEl = document.getElementById("priceInput");
  
  if (workshopDisplayEl) workshopDisplayEl.value = data.title;
  if (workshopInputEl) workshopInputEl.value = data.title;
  if (priceDisplayEl) priceDisplayEl.value = data.price;
  if (priceInputEl) priceInputEl.value = data.price;

  openPopup("registerPopup");
}

/* ===============================
   UTR VALIDATION
================================ */
function validateUTR(input) {
  // Remove all non-numeric characters
  input.value = input.value.replace(/\D/g, "");
  
  // Add/remove validation classes
  input.classList.toggle("utr-valid", input.value.length === 12);
  input.classList.toggle("utr-invalid", input.value.length > 0 && input.value.length !== 12);
}

/* ===============================
   TOAST NOTIFICATION
================================ */
function showToast(msg) {
  let toast = document.getElementById("toast");
  
  // Create toast if doesn't exist
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ===============================
   QR CODE ZOOM
================================ */
function openQrZoom(src) {
  let overlay = document.getElementById("qrOverlay");
  
  // Create QR overlay if doesn't exist
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "qrOverlay";
    overlay.className = "qr-overlay";
    overlay.onclick = closeQrZoom;
    
    const img = document.createElement("img");
    img.id = "qrOverlayImg";
    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }
  
  const img = document.getElementById("qrOverlayImg");
  if (img) img.src = src;
  
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeQrZoom() {
  const overlay = document.getElementById("qrOverlay");
  if (overlay) {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

/* ===============================
   UPI ID COPY
================================ */
function copyUpiId(upiId) {
  navigator.clipboard.writeText(upiId).then(() => {
    showToast("UPI ID Copied! ✓");
  }).catch(err => {
    console.error("Copy failed:", err);
    showToast("Failed to copy");
  });
}

/* ===============================
   ENQUIRY FORM SUBMISSION
================================ */
function submitEnquiry(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const data = {
    type: 'enquiry',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: formData.get('name'),
    email: formData.get('email'),
    mobile: formData.get('mobile'),
    institute: formData.get('institute'),
    department: formData.get('department') || 'N/A',
    designation: formData.get('designation') || 'N/A',
    level: formData.get('level'),
    workshop: formData.get('workshop')
  };

  // Validation
  if (!data.name || !data.email || !data.mobile || !data.level || !data.workshop) {
    alert("कृपया सभी आवश्यक (*) फील्ड भरें");
    return;
  }

  // Show loading
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Submitting...';
  submitBtn.disabled = true;

  // Google Sheets URL - REPLACE WITH YOUR URL
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbw3cbCmypdM_iy4gHYYcC1Lc1Ce_PA0mraSzYKKWld3htZH_5zOw7SbhYM4cFVsZDe6/exec";

  // Send to Google Sheets
  fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    // Send WhatsApp message to admin (without WhatsApp Business API)
    const adminPhone = "919598183089"; // Admin number
    const message = `🔔 *New Enquiry Received*%0A%0A` +
      `👤 Name: ${data.name}%0A` +
      `📧 Email: ${data.email}%0A` +
      `📱 Mobile: ${data.mobile}%0A` +
      `🏢 Institute: ${data.institute}%0A` +
      `🔬 Department: ${data.department}%0A` +
      `💼 Designation: ${data.designation}%0A` +
      `🎓 Level: ${data.level}%0A` +
      `📚 Workshop: ${data.workshop}%0A%0A` +
      `⏰ Time: ${data.timestamp}`;

    // Open WhatsApp in new tab
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');

    showToast("✅ Enquiry Submitted Successfully!");
    form.reset();
    setTimeout(() => closePopup('enquirePopup'), 1500);
  })
  .catch(err => {
    console.error("Submission error:", err);
    alert("कुछ त्रुटि हुई, पुनः प्रयास करें");
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

/* ===============================
   REGISTRATION FORM SUBMISSION
================================ */
function submitAndWhatsapp(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  const data = {
    type: 'registration',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: formData.get('name'),
    email: formData.get('email'),
    mobile: formData.get('mobile'),
    institute: formData.get('institute'),
    department: formData.get('department') || 'N/A',
    designation: formData.get('designation') || 'N/A',
    level: formData.get('level'),
    workshop: formData.get('workshop'),
    price: formData.get('price'),
    utr: formData.get('utr')
  };

  // Validation
  if (!data.name || !data.email || !data.mobile || !data.institute || !data.level || !data.utr) {
    alert("कृपया सभी आवश्यक (*) फील्ड भरें");
    return;
  }

  if (data.utr.length !== 12) {
    alert("कृपया 12 अंकों का सही UTR नंबर दर्ज करें");
    return;
  }

  // Show loading
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
  submitBtn.disabled = true;

  // Google Sheets URL - REPLACE WITH YOUR URL
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbw3cbCmypdM_iy4gHYYcC1Lc1Ce_PA0mraSzYKKWld3htZH_5zOw7SbhYM4cFVsZDe6/exec";

  // Send to Google Sheets
  fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    // Send WhatsApp message to admin (without WhatsApp Business API)
    const adminPhone = "919598183089"; // Admin number
    const message = `💰 *New Registration Received*%0A%0A` +
      `👤 Name: ${data.name}%0A` +
      `📧 Email: ${data.email}%0A` +
      `📱 Mobile: ${data.mobile}%0A` +
      `🏢 Institute: ${data.institute}%0A` +
      `🔬 Department: ${data.department}%0A` +
      `💼 Designation: ${data.designation}%0A` +
      `🎓 Level: ${data.level}%0A` +
      `📚 Workshop: ${data.workshop}%0A` +
      `💵 Price: ${data.price}%0A` +
      `🔢 UTR: ${data.utr}%0A%0A` +
      `⏰ Time: ${data.timestamp}`;

    // Open WhatsApp in new tab
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');

    showToast("✅ Registration Successful!");
    form.reset();
    setTimeout(() => closePopup('registerPopup'), 2000);
  })
  .catch(err => {
    console.error("Submission error:", err);
    alert("कुछ त्रुटि हुई, पुनः प्रयास करें");
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

/* ===============================
   TRAINER PROFILE (OPTIONAL)
================================ */
function openTrainerProfile(trainerId) {
  // Future implementation for trainer profiles
  console.log("Opening trainer profile:", trainerId);
  showToast("Trainer profile coming soon!");
}

/* ===============================
   SMOOTH SCROLL (OPTIONAL)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== 'javascript:void(0)') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
