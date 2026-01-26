/* ============================================================
   WEB DATA ENTRY TOOLS 2026 - CORE JAVASCRIPT
   Project: Nova Academy | Version: 2.0
   ============================================================ */

let currentWorkshopKey = null;
let selectedWorkshopTitle = "";

/* --- 1. GLOBAL WORKSHOP DATA --- */
const WORKSHOP_DATA = {
    xps: { title: "XPS Data Analysis", desc: "Comprehensive XPS fundamentals & peak fitting.", price: "₹2,999", img: "images/w1.png" },
    electro: { title: "Electrochemical Analysis", desc: "EIS, CV, LSV, GCD and Nyquist plots.", price: "₹2,999", img: "images/w2.png" },
    origin: { title: "OriginPro Training", desc: "Publication quality graphing & statistics.", price: "₹2,999", img: "images/w3.png" },
    xrd: { title: "XRD Data Analysis", desc: "Rietveld refinement & structure analysis.", price: "₹2,999", img: "images/w4.png" },
    chemdraw: { title: "ChemDraw Hands-on", desc: "Professional chemical drawing schemes.", price: "₹2,999", img: "images/w5.png" },
    dwsim: { title: "DWSIM Simulation", desc: "Chemical process simulation & reactors.", price: "₹2,999", img: "images/w6.png" }
};

/* --- 2. INITIALIZATION --- */
document.addEventListener("DOMContentLoaded", () => {
    initMouseGlow();
    initCounters();
    initSearch();
});

// Futuristic Mouse Glow Effect
function initMouseGlow() {
    const glow = document.createElement("div");
    glow.className = "mouse-glow";
    document.body.appendChild(glow);
    document.addEventListener("mousemove", e => {
        requestAnimationFrame(() => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", e => {
            const val = e.target.value.toLowerCase();
            document.querySelectorAll(".workshop-card-item").forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(val) ? "" : "none";
            });
        });
    }
}

// Counters Animation
function initCounters() {
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.dataset.target;
                let count = 0;
                const update = () => {
                    const step = target / 50;
                    if (count < target) {
                        count += step;
                        el.innerText = Math.ceil(count) + "+";
                        setTimeout(update, 20);
                    } else { el.innerText = target + "+"; }
                };
                update();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

/* --- 3. POPUP CONTROLS --- */
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

/* --- 4. WORKSHOP & REGISTRATION FLOW --- */
function openDetails(type) {
    const data = WORKSHOP_DATA[type];
    if (!data) return;
    currentWorkshopKey = type;
    document.getElementById("workshopTitle").innerText = data.title;
    document.getElementById("workshopDesc").innerText = data.desc;
    document.getElementById("workshopPrice").innerText = data.price;
    document.getElementById("workshopImg").src = data.img;
    openPopup("workshopDetailsPopup");
}

function openRegister(key) {
    const data = WORKSHOP_DATA[key] || WORKSHOP_DATA[currentWorkshopKey];
    if (!data) return;
    selectedWorkshopTitle = data.title;
    document.getElementById("workshopDisplay").value = data.title;
    document.getElementById("workshopInput").value = data.title;
    document.getElementById("priceDisplay").value = data.price;
    document.getElementById("priceInput").value = data.price;
    openPopup("registerPopup");
}

/* --- 5. PAYMENT & VALIDATION --- */
function validateUTR(input) {
    input.value = input.value.replace(/\D/g, "");
    const isValid = input.value.length === 12;
    input.classList.toggle("utr-valid", isValid);
    input.classList.toggle("utr-invalid", !isValid);
}

function copyUpiId(id) {
    navigator.clipboard.writeText(id).then(() => showToast("UPI ID Copied!"));
}

/* --- 6. DATA SUBMISSION (SMART LOGIC) --- */
async function submitAndWhatsapp() {
    const form = document.getElementById("registrationForm");
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Collecting Data
    const formData = {
        name: document.getElementById("nameInput").value.trim(),
        mobile: document.getElementById("mobileInput").value.trim(),
        email: document.getElementById("emailInput").value.trim(),
        workshop: document.getElementById("workshopInput").value,
        price: document.getElementById("priceInput").value,
        utr: document.getElementById("utrInput").value
    };

    // Basic Validation
    if (!formData.name || !formData.mobile || formData.utr.length !== 12) {
        alert("Please fill all details correctly. 12-digit UTR is mandatory.");
        return;
    }

    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    try {
        // Sending to Google Sheets (Web App URL)
        await fetch("YOUR_GOOGLE_SCRIPT_URL", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(formData)
        });

        // WhatsApp Redirection
        const msg = `*NEW REGISTRATION - NOVA ACADEMY*%0A%0A` +
                    `*Workshop:* ${formData.workshop}%0A` +
                    `*Name:* ${formData.name}%0A` +
                    `*Mobile:* ${formData.mobile}%0A` +
                    `*UTR No:* ${formData.utr}%0A%0A` +
                    `_Sent via Data Brahmastra 2026_`;

        window.open(`https://wa.me/919598183089?text=${msg}`, "_blank");
        showToast("Registration Successful! ✔");
        closePopup("registerPopup");
    } catch (err) {
        alert("Submission failed. Please try again.");
    } finally {
        submitBtn.innerText = "Complete Registration";
        submitBtn.disabled = false;
    }
}

/* --- 7. UTILITIES --- */
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

function openQrZoom(src) {
    document.getElementById("qrOverlayImg").src = src;
    document.getElementById("qrOverlay").style.display = "flex";
}

function closeQrZoom() {
    document.getElementById("qrOverlay").style.display = "none";
}

// Event Listeners
document.getElementById("enrollBtn")?.addEventListener("click", () => {
    closePopup("workshopDetailsPopup");
    openRegister(currentWorkshopKey);
});
