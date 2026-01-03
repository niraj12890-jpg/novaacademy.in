// --- 1. MOUSE GLOW TRACKER ---
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    // requestAnimationFrame का उपयोग करने से माउस मूवमेंट स्मूथ हो जाता है
    requestAnimationFrame(() => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
});

// --- 2. COUNTER ANIMATION (Optimized) ---
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(c => {
        const target = +c.getAttribute('data-target');
        const speed = 200; // जितना कम, उतना तेज
        const update = () => {
            const current = +c.innerText;
            const inc = target / speed;
            if (current < target) {
                c.innerText = Math.ceil(current + inc);
                setTimeout(update, 1);
            } else {
                c.innerText = target;
            }
        };
        update();
    });
};

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        observer.unobserve(entries[0].target); // एक बार चलने के बाद दोबारा न चले
    }
}, { threshold: 0.5 });
observer.observe(document.querySelector('#counter-section'));

// --- 3. POPUP CONTROLS & DYNAMIC DATA ---
function openPopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // बैकग्राउंड स्क्रॉल बंद करें
}

function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'none';
    document.body.style.overflow = 'auto'; // स्क्रॉल दोबारा चालू करें
}

// वर्कशॉप की डिटेल्स यहाँ से बदलें (Dynamic Content)
function viewWorkshop(title, desc, imgPath) {
    document.getElementById('workshopTitle').innerText = title;
    document.getElementById('workshopDesc').innerText = desc;
    document.getElementById('workshopImg').src = imgPath;
    
    // व्हाट्सएप लिंक को ऑटो-अपडेट करें
    const waBtn = document.getElementById('popupWhatsappBtn');
    waBtn.href = `https://wa.me/919598183089?text=Hi, I am interested in ${title} workshop.`;
    
    openPopup('workshopInfo');
}

// Close on 'ESC' Key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.popup-overlay').forEach(p => p.style.display = 'none');
        document.body.style.overflow = 'auto';
    }
});

// --- 4. ADVANCED SEARCH & FILTER ---
const searchInput = document.getElementById('searchInput');
if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.workshop-card-item');
        
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if(text.includes(val)) {
                card.style.display = 'block';
                card.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// --- 5. CLIPBOARD COPY (For UPI ID) ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("UPI ID Copied: " + text);
    });
}
