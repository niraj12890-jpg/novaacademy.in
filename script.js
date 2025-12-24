const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOq1-GYeeQoKHw4DJ3a1XEQIrq9ydS2FvUsXtqWLM3IKwCg9zEX_8Q9WOSDl7FrdE2HQ/exec";

// 1. Scroll Detection
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// 2. Workshop Data (Restored from index1)
const workshopData = {
  xps: {
    title: "XPS Data Analysis Workshop",
    img: "images/w1.png",
    desc: "1. Fundamentals of XPS\n2. Peak Fitting using CasaXPS\n3. Deconvolution of spectra\n4. Report Preparation."
  },
  electro: {
    title: "Electrochemical Analysis",
    img: "images/w2.png",
    desc: "1. EIS Analysis\n2. CV/LSV Plotting\n3. GCD Calculations."
  }
};

function openDetails(key) {
  const data = workshopData[key];
  if(!data) return;
  document.getElementById('workshopTitle').innerText = data.title;
  document.getElementById('workshopImg').src = data.img;
  document.getElementById('workshopDesc').innerText = data.desc;
  document.getElementById('workshopInfo').style.display = 'flex';
}

function closeDetails() { document.getElementById('workshopInfo').style.display = 'none'; }
function openPopup(id) { document.getElementById(id).style.display = 'flex'; }
function closePopup(id) { document.getElementById(id).style.display = 'none'; }

// 3. Counter Animation
const counters = document.querySelectorAll('.counter');
const startCounter = () => {
  counters.forEach(c => {
    const target = +c.getAttribute('data-target');
    const update = () => {
      const current = +c.innerText;
      const inc = target / 100;
      if(current < target) {
        c.innerText = Math.ceil(current + inc);
        setTimeout(update, 20);
      } else c.innerText = target;
    };
    update();
  });
};
// Start counter when visible
window.addEventListener('scroll', () => { if(window.scrollY > 500) startCounter(); }, {once: true});

// 4. Form Submissions (Your original Logic)
function submitEnquiry() {
  const data = {
    type: "enquiry",
    name: document.getElementById("enqName").value,
    mobile: document.getElementById("enqMobile").value,
    workshop: document.getElementById("enqWorkshop").value
  };
  fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
  .then(() => {
    alert("Enquiry Sent!");
    closePopup('enquirePopup');
    window.open(`https://wa.me/919598183089?text=Enquiry for ${data.workshop}`, "_blank");
  });
}
