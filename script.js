// ======================= SEARCH FUNCTIONALITY =======================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    // Cards
    const workshopCards = document.querySelectorAll('#workshops .card');
    const trainerCards = document.querySelectorAll('#training .trainer-card');
    const pastCards = document.querySelectorAll('#past-workshops .card');

    const allCards = [...workshopCards, ...trainerCards, ...pastCards];

    allCards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
});

// Trigger search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// ======================= POPUP HANDLERS =======================
function openPopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.style.display = 'none';
    document.body.style.overflow = '';
}

// ======================= WORKSHOP DETAILS =======================
const workshopData = {
    xps: {
        title: "XPS Data Analysis Workshop",
        img: "images/xps.png",
        pdf: "#",
        desc: `Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets.`
    },
    electro: {
        title: "Electrochemical Data Analysis",
        img: "images/electro.png",
        pdf: "#",
        desc: `EIS, CV, LSV, GCD, Nyquist & case studies for batteries & catalysis.`
    },
    origin: {
        title: "OriginPro Graphing & Data Analysis",
        img: "images/origin.png",
        pdf: "#",
        desc: `Peak analysis, curve fitting, batch processing & publication-ready graphs.`
    },
    xrd: {
        title: "XRD Data Analysis Workshop",
        img: "images/xrd.png",
        pdf: "#",
        desc: `Rietveld refinement, peak indexing & crystal structure analysis.`
    },
    chemdraw: {
        title: "ChemDraw Hands-on Training",
        img: "images/chemdraw.png",
        pdf: "#",
        desc: `Draw chemical structures, reactions, stereochemistry & export HD images.`
    },
    dwsim: {
        title: "DWSIM Chemical Simulation",
        img: "images/dwsim.png",
        pdf: "#",
        desc: `Process simulation: reactors, distillation, heat exchangers & flowsheets.`
    }
};

// Open workshop details popup
function openDetails(key) {
    const data = workshopData[key];
    if (!data) return;

    const popup = document.getElementById('workshopInfo');
    document.getElementById('workshopTitle').innerText = data.title;
    document.getElementById('workshopImg').src = data.img;
    document.getElementById('workshopDesc').innerText = data.desc;
    document.getElementById('syllabusBtn').href = data.pdf;

    // WhatsApp auto link
    const msg = `Hello Nova Academy 👋%0AI am interested in *${data.title}* workshop.%0APlease share details, fees & schedule.`;
    document.getElementById("popupWhatsappBtn").href = `https://wa.me/919598183089?text=${msg}`;

    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close workshop details popup
function closeDetails() {
    const popup = document.getElementById('workshopInfo');
    popup.style.display = 'none';
    document.body.style.overflow = '';
}

// Close popup when clicking outside the box
document.addEventListener('click', (e) => {
    const workshopPopup = document.getElementById('workshopInfo');
    const enquirePopup = document.getElementById('enquirePopup');
    const registerPopup = document.getElementById('registerPopup');

    if (workshopPopup.style.display === 'flex' && e.target === workshopPopup) closeDetails();
    if (enquirePopup.style.display === 'flex' && e.target === enquirePopup) closePopup('enquirePopup');
    if (registerPopup.style.display === 'flex' && e.target === registerPopup) closePopup('registerPopup');
});

// Close popups on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDetails();
        closePopup('enquirePopup');
        closePopup('registerPopup');
    }
});

// ======================= COUNTERS =======================
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 200;

        if (current < target) {
            counter.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(updateCounter, 20);
        } else {
            counter.innerText = target;
        }
    }
    updateCounter();
});

// ======================= GOOGLE SHEET SUBMISSION =======================
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

// Enquiry Submission
function submitEnquiry() {
    const data = {
        type: "enquiry",
        name: document.getElementById("enqName").value,
        mobile: document.getElementById("enqMobile").value,
        workshop: document.getElementById("enqWorkshop").value
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Enquiry submitted successfully!");
        closePopup('enquirePopup');

        // WhatsApp auto message
        window.open(`https://wa.me/919598183089?text=New Enquiry%0AName: ${data.name}%0AWorkshop: ${data.workshop}`, "_blank");
    });
}

// Registration Submission
function submitRegistration() {
    const data = {
        type: "registration",
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        mobile: document.getElementById("regMobile").value,
        workshop: document.getElementById("regWorkshop").value,
        utr: document.getElementById("regUTR").value
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        alert("Registration successful! Payment status: Pending");
        closePopup('registerPopup');

        // WhatsApp confirmation to student
        window.open(`https://wa.me/91${data.mobile}?text=Nova Academy%0ARegistration received for ${data.workshop}.%0APayment Status: Pending`, "_blank");
    });
}
