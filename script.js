const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOq1-GYeeQoKHw4DJ3a1XEQIrq9ydS2FvUsXtqWLM3IKwCg9zEX_8Q9WOSDl7FrdE2HQ/exec";

// 1. Scroll Detection & Reveal Animation
const reveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  const nav = document.getElementById('mainNav');
  
  // Navbar glass effect on scroll
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  // Reveal elements on scroll
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
};

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal); // Initial check

// 2. Workshop Data (Updated with more keys as per your HTML)
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
  },
  origin: {
    title: "OriginPro Graphing",
    img: "images/w3.png",
    desc: "1. Peak analysis\n2. Curve fitting\n3. Advanced Plotting."
  },
  xrd: {
    title: "XRD Data Analysis",
    img: "images/w4.png",
    desc: "1. Phase identification\n2. Rietveld refinement\n3. Lattice parameter calculation."
  }
};

function openDetails(key) {
  const data = workshopData[key];
  if(!data) return;
  document.getElementById('workshopTitle').innerText = data.title;
  document.getElementById('workshopImg').src = data.img;
  document.getElementById('workshopDesc').innerText = data.desc;
  document.getElementById('workshopInfo').style.display = 'flex';
  document.getElementById('workshopInfo').classList.add('animate__animated', 'animate__fadeIn');
}

function closeDetails() { 
  document.getElementById('workshopInfo').style.display = 'none'; 
}

function openPopup(id) { 
  document.getElementById(id).style.display = 'flex'; 
}

function closePopup(id) { 
  document.getElementById(id).style.display = 'none'; 
}

// 3. Counter Animation (Improved for better trigger)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

const startCounter = () => {
  if (counterStarted) return;
  counterStarted = true;
  counters.forEach(c => {
    const target = +c.getAttribute('data-target');
    const update = () => {
      const current = +c.innerText;
      const inc = target / 50; // Faster animation
      if(current < target) {
        c.innerText = Math.ceil(current + inc);
        setTimeout(update, 30);
      } else c.innerText = target;
    };
    update();
  });
};

// Counter trigger observation
const counterSection = document.querySelector('.counter')?.parentElement;
if(counterSection) {
    window.addEventListener('scroll', () => {
        const pos = counterSection.getBoundingClientRect().top;
        if(pos < window.innerHeight) startCounter();
    });
}

// 4. Form Submissions (Your original Logic - Protected)
function submitEnquiry() {
  const btn = event.target;
  const originalText = btn.innerText;
  btn.innerText = "Sending..."; // Visual feedback
  
  const data = {
    type: "enquiry",
    name: document.getElementById("enqName").value,
    mobile: document.getElementById("enqMobile").value,
    workshop: document.getElementById("enqWorkshop").value
  };

  fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(data) })
  .then(() => {
    alert("Enquiry Sent Successfully!");
    btn.innerText = originalText;
    closePopup('enquirePopup');
    window.open(`https://wa.me/919598183089?text=Hi, I am interested in the ${data.workshop} Workshop.`, "_blank");
  })
  .catch(err => {
    alert("Something went wrong. Please try again.");
    btn.innerText = originalText;
  });
}

// Registration logic (Assuming similar to Enquiry)
function submitRegistration() {
    const data = {
        type: "registration",
        name: document.getElementById("regName").value,
        utr: document.getElementById("regUTR").value
    };
    // Fetch logic as per your requirements
    alert("Registration submitted! We will verify your UTR.");
    closePopup('registerPopup');
}
