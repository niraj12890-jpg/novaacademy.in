document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOUSE GLOW TRACKER ---
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    });

    // --- 2. SEARCH LOGIC ---
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.workshop-card-item');
            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(val) ? '' : 'none';
            });
        });
    }
}); // <--- DOMContentLoaded yahan khatam hota hai

// --- 3. GLOBAL FUNCTIONS (Popups ke liye) ---
function openPopup(id) {
    const popup = document.getElementById(id);
    if(popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if(popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- 4. WORKSHOP DETAILS LOGIC ---
function openDetails(type) {
    const titleEl = document.getElementById('workshopTitle');
    const descEl = document.getElementById('workshopDesc');
    const imgEl = document.getElementById('workshopImg');

    const dataMap = {
    xps: {
        title: "XPS Data Analysis",
        desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets.",
        img: "images/w1.png"
    },
    electro: {
        title: "Electrochemical Analysis",
        desc: "EIS, CV, LSV, GCD and Nyquist plot based training.",
        img: "images/w2.png"
    },
    origin: {
        title: "OriginPro Training",
        desc: "Publication quality graphing, curve fitting and statistics.",
        img: "images/w3.png"
    },
    xrd: {
        title: "XRD Data Analysis",
        desc: "Rietveld refinement, peak indexing and structure analysis.",
        img: "images/w4.png"
    },
    chemdraw: {
        title: "ChemDraw Hands-on",
        desc: "Professional chemical drawing and reaction schemes.",
        img: "images/w5.png"
    },
    dwsim: {
        title: "DWSIM Simulation",
        desc: "Chemical process simulation with reactors and distillation.",
        img: "images/w6.png"
    }
};


    const selected = dataMap[type];
    if(selected && titleEl && descEl && imgEl) {
        titleEl.innerText = selected.title;
        descEl.innerText = selected.desc;
        imgEl.src = selected.img;
        
        const waBtn = document.getElementById('popupWhatsappBtn');
        if(waBtn) {
            waBtn.href = `https://wa.me/919598183089?text=Hi, I am interested in ${selected.title} workshop.`;
        }
        openPopup('workshopDetailsPopup');
    }
}

// --- 5. MODERN COUNTER (Scroll Observer) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(c => {
                const target = +c.getAttribute('data-target');
                let count = 0;
                const update = () => {
                    const speed = target / 50;
                    if (count < target) {
                        count += speed;
                        c.innerText = Math.ceil(count) + (c.innerText.includes('%') ? '%' : '+');
                        setTimeout(update, 20);
                    } else { 
                        c.innerText = target + (c.innerText.includes('%') ? '%' : '+'); 
                    }
                };
                update();
            });
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => observer.observe(el));

// --- 6. AUTO-NEXT TESTIMONIALS ---
let testimonialIndex = 0;
function rotateTestimonials() {
    const cards = document.querySelectorAll('.testimonial-card');
    if(cards.length > 0) {
        cards.forEach(c => c.style.display = 'none');
        testimonialIndex = (testimonialIndex + 1) % cards.length;
        cards[testimonialIndex].style.display = 'block';
    }
}
setInterval(rotateTestimonials, 3000);
// ===== QR IMAGE ZOOM LOGIC =====
function openQrZoom(src) {
    const overlay = document.getElementById('qrOverlay');
    const img = document.getElementById('qrOverlayImg');
    img.src = src;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeQrZoom() {
    const overlay = document.getElementById('qrOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}
// ===== UPI COPY TO CLIPBOARD =====
function copyUpiId(upi) {
    navigator.clipboard.writeText(upi).then(() => {
        showToast("UPI ID Copied ✔");
    }).catch(() => {
        alert("Copy failed. Please copy manually.");
    });
}
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}
// ===== UTR VALIDATION =====
function validateUTR(input) {
    input.value = input.value.replace(/\D/g, ''); // sirf digits
    if (input.value.length === 12) {
        input.classList.remove('utr-invalid');
        input.classList.add('utr-valid');
    } else {
        input.classList.remove('utr-valid');
        input.classList.add('utr-invalid');
    }
}
let selectedWorkshop = "";

// open register popup with workshop name
function openRegister(workshopName) {
    selectedWorkshop = workshopName;
    openPopup('registerPopup');
}

// WhatsApp auto message
function sendWhatsapp() {
    const utr = document.getElementById('utrInput').value;

    if (utr.length !== 12) {
        alert("कृपया सही 12-अंकों का UTR दर्ज करें");
        return;
    }

    const msg = `Hello Nova Academy,%0A
I have registered for *${selectedWorkshop}*.%0A
UTR Number: ${utr}`;

    window.open(`https://wa.me/919598183089?text=${msg}`, '_blank');
}
function submitRegistration() {
    const data = {
        name: document.querySelector('#registerPopup input[placeholder="Name"]').value,
        mobile: document.querySelector('#registerPopup input[placeholder="Number"]').value,
        email: document.querySelector('#registerPopup input[type="email"]').value,
        workshop: selectedWorkshop,
        utr: document.getElementById('utrInput').value
    };

    fetch("https://script.google.com/macros/s/AKfycbz6mKX2CczllDEFjz0YtpTYBH_i6zRjVNtv_zkUqXlout9K0q4zFE6gGBPwHbF8T05Zlw/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        showToast("Registration Successful ✔");
        closePopup('registerPopup');
    });
}
// ===== SINGLE SMART SUBMIT + WHATSAPP =====
function submitAndWhatsapp() {

    const name = document.querySelector('#registerPopup input[placeholder="Name"]').value;
    const mobile = document.querySelector('#registerPopup input[placeholder="Number"]').value;
    const email = document.querySelector('#registerPopup input[type="email"]').value;
    const utr = document.getElementById('utrInput').value;

    // BASIC VALIDATION
    if (!name || !mobile || !email) {
        alert("कृपया सभी विवरण भरें");
        return;
    }

    if (utr.length !== 12) {
        alert("कृपया सही 12-अंकों का UTR दर्ज करें");
        return;
    }

    // DATA OBJECT
    const data = {
        name: name,
        mobile: mobile,
        email: email,
        workshop: selectedWorkshop,
        utr: utr
    };

    // 1️⃣ SEND TO GOOGLE SHEET
    fetch("https://script.google.com/macros/s/AKfycbz6mKX2CczllDEFjz0YtpTYBH_i6zRjVNtv_zkUqXlout9K0q4zFE6gGBPwHbF8T05Zlw/exec", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {

        // 2️⃣ WHATSAPP AUTO MESSAGE
        const msg = `Hello Nova Academy,%0A
I have completed registration.%0A
Workshop: *${selectedWorkshop}*%0A
Name: ${name}%0A
Mobile: ${mobile}%0A
UTR: ${utr}`;

        window.open(`https://wa.me/919598183089?text=${msg}`, '_blank');

        // 3️⃣ UI FEEDBACK
        showToast("Registration Completed ✔");
        closePopup('registerPopup');
    })
    .catch(() => {
        alert("कुछ त्रुटि हुई, कृपया पुनः प्रयास करें");
    });
}
