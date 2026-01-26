/* ============================================================
   1. CONFIGURATION: Google Sheet URL & Admin Contact
   ============================================================ */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz6mKX2CczllDEFjz0YtpTYBH_i6zRjVNtv_zkUqXlout9K0q4zFE6gGBPwHbF8T05Zlw/exec";
const ADMIN_MOBILE = "919598183089";

const WORKSHOP_DATA = {
  xps: { title: "XPS Data Analysis", price: "₹ 2,999" },
  electro: { title: "Electrochemical Analysis", price: "₹ 2,999" },
  origin: { title: "OriginPro Training", price: "₹ 2,999" },
  xrd: { title: "XRD Data Analysis", price: "₹ 2,999" },
  chemdraw: { title: "ChemDraw Hands-on", price: "₹ 2,999" },
  dwsim: { title: "DWSIM Simulation", price: "₹ 2,999" }
};

/* ============================================================
   2. POPUP HANDLERS: Opening & Closing Logic
   ============================================================ */
function handleFormTrigger(key, type) {
  const ws = WORKSHOP_DATA[key];
  if (type === 'enquire') {
    document.getElementById('enq_workshop').value = ws.title;
    openPopup('enquirePopup');
  } else {
    // Registration Form Setup
    document.getElementById('reg_workshop').value = ws.title;
    document.getElementById('reg_fees').value = ws.price;
    document.getElementById('reg_ws_name').innerText = ws.title;
    document.getElementById('reg_ws_fee').innerText = ws.price;
    openPopup('registerPopup');
  }
}

function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Disable scroll
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = 'auto'; // Enable scroll
}

/* ============================================================
   3. DATA SUBMISSION: Google Sheet + WhatsApp Message
   ============================================================ */
async function handleFormSubmit(e, formId) {
  e.preventDefault();
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const submitBtn = form.querySelector('button[type="submit"]');

  // Loading UI
  submitBtn.disabled = true;
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Submitting...`;

  try {
    // A. Send Data to Google Sheet (Auto-Header logic in Apps Script)
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(data)
    });

    // B. Build WhatsApp Message for Admin
    let waMsg = `*🚀 New ${data.formType.toUpperCase()} Alert!*%0A%0A`;
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'formType') {
        waMsg += `*${key.replace('_', ' ').toUpperCase()}:* ${value}%0A`;
      }
    }

    // C. Open WhatsApp & Success Actions
    window.open(`https://wa.me/${ADMIN_MOBILE}?text=${waMsg}`, '_blank');
    
    showToast("Success! Admin Notified.");
    form.reset();
    closePopup(formId.replace('Form', 'Popup'));

  } catch (error) {
    console.error("Submission Error:", error);
    alert("Submission failed. Check your internet connection.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

// Attach listeners to forms
document.getElementById('enquiryForm').onsubmit = (e) => handleFormSubmit(e, 'enquiryForm');
document.getElementById('registerForm').onsubmit = (e) => handleFormSubmit(e, 'registerForm');

/* ============================================================
   4. UTILS: Toast & Search Functionality
   ============================================================ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// Search Workshops in Grid
document.getElementById('searchInput')?.addEventListener('keyup', function() {
  const term = this.value.toLowerCase();
  document.querySelectorAll('.workshop-card-item').forEach(card => {
    const title = card.querySelector('h4').innerText.toLowerCase();
    card.style.display = title.includes(term) ? "block" : "none";
  });
});
