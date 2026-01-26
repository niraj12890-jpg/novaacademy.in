/* =========================
   GLOBAL VARIABLES
========================= */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwGDvI7rEHYqzbLplXq36yiZcE_7P7qyE8N0Wddc73QoMzt3uV5L399vW7-XDATC6cI/exec";
const ADMIN_MOBILE = "9598183089";

/* =========================
   POPUP OPEN / CLOSE
========================= */
function openEnquiry(workshopName) {
  document.getElementById("enquiryWorkshop").value = workshopName;
  document.getElementById("enquiryPopup").style.display = "flex";
}

function openRegister(workshopName, fees) {
  document.getElementById("registerWorkshop").value = workshopName;
  document.getElementById("registerFees").value = fees;
  document.getElementById("registerPopup").style.display = "flex";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

/* =========================
   TOAST MESSAGE
========================= */
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* =========================
   UTR VALIDATION
========================= */
function validateUTR(input) {
  input.value = input.value.replace(/[^a-zA-Z0-9]/g, "");
}

/* =========================
   ENQUIRY FORM SUBMIT
========================= */
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  formData.append("Type", "Enquiry");

  sendToGoogleSheet(formData, () => {
    sendWhatsApp(formData);
    closePopup("enquiryPopup");
    showToast("Enquiry Submitted Successfully");
    this.reset();
  });
});

/* =========================
   REGISTRATION SUBMIT
========================= */
function submitAndWhatsapp() {
  const form = document.getElementById("registerForm");
  const formData = new FormData(form);
  formData.append("Type", "Registration");

  sendToGoogleSheet(formData, () => {
    sendWhatsApp(formData);
    closePopup("registerPopup");
    showToast("Registration Completed Successfully");
    form.reset();
  });
}

/* =========================
   GOOGLE SHEET SAVE
========================= */
function sendToGoogleSheet(formData, callback) {
  fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(() => {
      if (callback) callback();
    })
    .catch(() => {
      alert("डेटा सेव नहीं हो पाया, कृपया पुनः प्रयास करें");
    });
}

/* =========================
   WHATSAPP MESSAGE
========================= */
function sendWhatsApp(formData) {
  let message = "📌 *New Form Submission* \n\n";

  for (let pair of formData.entries()) {
    message += `*${pair[0]}*: ${pair[1]}\n`;
  }

  const url =
    "https://wa.me/91" +
    ADMIN_MOBILE +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank");
}

/* =========================
   QR IMAGE ZOOM
========================= */
function zoomQr(src) {
  document.getElementById("qrOverlayImg").src = src;
  document.getElementById("qrOverlay").style.display = "flex";
}

function closeQrZoom() {
  document.getElementById("qrOverlay").style.display = "none";
}
