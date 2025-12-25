// -------------------- Popup Functions --------------------
function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}
function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

// -------------------- Workshop Details --------------------
const workshops = {
  xps: {
    title: "XPS Data Analysis Workshop",
    img: "images/xps.png",
    desc: "Hands-on XPS fundamentals & peak fitting.",
    syllabus: "syllabus/XPS.pdf",
    whatsapp: "https://wa.me/919598183089?text=I%20am%20interested%20in%20XPS%20Workshop"
  },
  electro: {
    title: "Electrochemical Data Analysis",
    img: "images/electro.png",
    desc: "EIS, CV, LSV, Nyquist, GCD & case studies.",
    syllabus: "syllabus/Electro.pdf",
    whatsapp: "https://wa.me/919598183089?text=I%20am%20interested%20in%20Electrochemical%20Workshop"
  },
  origin: {
    title: "OriginPro Training",
    img: "images/origin.png",
    desc: "Graphing, curve fitting & batch analysis.",
    syllabus: "syllabus/OriginPro.pdf",
    whatsapp: "https://wa.me/919598183089?text=I%20am%20interested%20in%20OriginPro%20Workshop"
  },
  // Add XRD, ChemDraw, DWSIM here if needed
};

function openDetails(key) {
  const ws = workshops[key];
  if (!ws) return;
  document.getElementById("workshopTitle").innerText = ws.title;
  document.getElementById("workshopImg").src = ws.img;
  document.getElementById("workshopDesc").innerText = ws.desc;
  document.getElementById("syllabusBtn").href = ws.syllabus;
  document.getElementById("popupWhatsappBtn").href = ws.whatsapp;
  document.getElementById("workshopInfo").style.display = "flex";
}

function closeDetails() {
  document.getElementById("workshopInfo").style.display = "none";
}

// -------------------- Search Function --------------------
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll("#workshops .card");
  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.parentElement.style.display = text.includes(query) ? "block" : "none";
  });
});

// -------------------- Enquiry Submission --------------------
function submitEnquiry() {
  const name = document.getElementById("enqName").value;
  const mobile = document.getElementById("enqMobile").value;
  const workshop = document.getElementById("enqWorkshop").value;
  if (!name || !mobile) { alert("Please fill all fields"); return; }
  alert(`Thank you ${name}! Your enquiry for ${workshop} has been submitted.`);
  closePopup('enquirePopup');
  // Integration with Google Sheets API / backend can be added here
}

// -------------------- Registration Submission --------------------
function submitRegistration() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const mobile = document.getElementById("regMobile").value;
  const workshop = document.getElementById("regWorkshop").value;
  const utr = document.getElementById("regUTR").value;
  if (!name || !email || !mobile || !utr) { alert("Please fill all fields"); return; }
  alert(`Thank you ${name}! Your registration for ${workshop} has been submitted.`);
  closePopup('registerPopup');
  // Integration with Google Sheets API / backend can be added here
}
