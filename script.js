// --- 1. REAL-TIME SEARCH FUNCTIONALITY ---
document.getElementById('searchInput').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    
    // Search in Workshop Cards
    const workshops = document.querySelectorAll('.workshop-card-item');
    workshops.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
    });

    // Search in Trainer Cards
    const trainers = document.querySelectorAll('.trainer-card-item');
    trainers.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
    });
});

// --- 2. ANIMATED COUNTERS (Using Intersection Observer) ---
const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = target / 100; // Speed of animation

            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Start animation only when section is visible
const counterSection = document.getElementById('counter-section');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(counterSection); // Run only once
    }
}, { threshold: 0.5 });

if(counterSection) observer.observe(counterSection);

// --- 3. POPUP CONTROLS ---
function openPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop scrolling
}

function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // Start scrolling
}

// --- 4. WORKSHOP DETAILS DATA & POPUP ---
const workshopData = {
    'xps': {
        title: 'XPS Data Analysis Workshop',
        img: 'XPSIMAGE.png',
        desc: 'Unlock the power of X-ray Photoelectron Spectroscopy. \n\n• Learn Peak Fitting using CasaXPS.\n• Understand Chemical State Analysis.\n• Hands-on with real-world research datasets.\n• Expert guidance for publication-ready data.',
        whatsapp: 'https://wa.me/919598183089?text=I%20am%20interested%20in%20XPS%20Workshop'
    },
    'electro': {
        title: 'Electrochemical Analysis',
        img: 'images/w2.png',
        desc: 'Master the techniques of energy storage research. \n\n• Cyclic Voltammetry (CV) interpretation.\n• EIS Nyquist & Bode plots.\n• Battery & Supercapacitor performance metrics.\n• Corrosion study fundamentals.',
        whatsapp: 'https://wa.me/919598183089?text=I%20am%20interested%20in%20Electrochemical%20Workshop'
    },
    'origin': {
        title: 'OriginPro Training',
        img: 'images/w3.png',
        desc: 'Level up your research graphing skills. \n\n• Advanced Curve Fitting.\n• Multi-peak Analysis.\n• Template creation for fast plotting.\n• 3D Surface plots & Heatmaps.',
        whatsapp: 'https://wa.me/919598183089?text=I%20am%20interested%20in%20OriginPro%20Workshop'
    }
    // You can add more like 'xrd', 'chemdraw' etc. following the same format
};

function openDetails(id) {
    const data = workshopData[id];
    if (data) {
        document.getElementById('workshopTitle').innerText = data.title;
        document.getElementById('workshopImg').src = data.img;
        document.getElementById('workshopDesc').innerText = data.desc;
        document.getElementById('popupWhatsappBtn').href = data.whatsapp;
        openPopup('workshopInfo');
    }
}

function closeDetails() {
    closePopup('workshopInfo');
}

// Close popup on background click
window.onclick = function(event) {
    if (event.target.classList.contains('popup-overlay')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};
