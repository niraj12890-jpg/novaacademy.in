// ---------- Search logic (fixed) ----------
document.getElementById('searchBtn').addEventListener('click', function(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if(!q) return;
  const workshops = document.querySelectorAll('#workshops .card');
  const trainers = document.querySelectorAll('#training .trainer-card');
  const past = document.querySelectorAll('#past-workshops .card');
  const all = [...workshops, ...trainers, ...past];
  all.forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
});

// ---------- Popup helpers ----------
function openPopup(id){ document.getElementById(id).style.display = 'flex'; }
function closePopup(id){ document.getElementById(id).style.display = 'none'; }

// ---------- Workshop Data ----------
const workshopData = {
  xps: { title: "XPS Data Analysis Workshop", img: "XPSIMAGE.png", desc: "Comprehensive XPS fundamentals..." },
  electro: { title: "Electrochemical Data Analysis", img: "images/w2.png", desc: "EIS, CV, LSV, GCD..." },
  origin: { title: "OriginPro Training", img: "images/w3.png", desc: "Peak analysis..." },
  xrd: { title: "XRD Analysis", img: "images/w4.png", desc: "Rietveld refinement..." },
  chemdraw: { title: "ChemDraw Workshop", img: "images/w5.png", desc: "Hands-on training..." },
  dwsim: { title: "DWSIM Simulation", img: "images/w6.png", desc: "Process flowsheet..." }
};

function openDetails(key){
  const data = workshopData[key];
  if(!data) return;
  document.getElementById('workshopTitle').innerText = data.title;
  document.getElementById('workshopImg').src = data.img;
  document.getElementById('workshopDesc').innerText = data.desc;
  document.getElementById('workshopInfo').style.display = 'flex';
  const msg = `Hello Nova Academy, I am interested in ${data.title}.`;
  document.getElementById("popupWhatsappBtn").href = `https://wa.me/919598183089?text=${encodeURIComponent(msg)}`;
}

function closeDetails(){ document.getElementById('workshopInfo').style.display = 'none'; }

// ---------- API & Forms ----------
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOq1-GYeeQoKHw4DJ3a1XEQIrq9ydS2FvUsXtqWLM3IKwCg9zEX_8Q9WOSDl7FrdE2HQ/exec";

function submitEnquiry(){
  const data = { type: "enquiry", name: document.getElementById("enqName").value, mobile: document.getElementById("enqMobile").value, workshop: document.getElementById("enqWorkshop").value };
  fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(data) }).then(() => { alert("Enquiry submitted!"); closePopup('enquirePopup'); });
}

function submitRegistration(){
  const data = { type: "registration", name: document.getElementById("regName").value, utr: document.getElementById("regUTR").value };
  fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(data) }).then(() => { alert("Registration successful!"); closePopup('registerPopup'); });
}

// ---------- Counters ----------
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    if(current < target){ counter.innerText = Math.ceil(current + (target/100)); setTimeout(update, 20); }
    else counter.innerText = target;
  };
  update();
});
