// पूरा कोड इस 'DOMContentLoaded' के अंदर रखें ताकि HTML लोड होने के बाद ही JS चले
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

    // --- 2. COUNTER ANIMATION ---
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(c => {
            const target = +c.getAttribute('data-target');
            const speed = 100; // थोड़ा तेज किया
            const update = () => {
                const current = +c.innerText.replace('%', ''); // % साइन हैंडल करने के लिए
                const inc = target / speed;
                if (current < target) {
                    c.innerText = Math.ceil(current + inc) + (c.innerText.includes('%') ? '%' : '');
                    setTimeout(update, 10);
                } else {
                    c.innerText = target + (c.innerText.includes('%') ? '%' : '');
                }
            };
            update();
        });
    };

    const counterSection = document.querySelector('#counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 }); // 0.5 से कम किया ताकि मोबाइल पर जल्दी दिखे
        observer.observe(counterSection);
    }

    // --- 3. ADVANCED SEARCH ---
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.workshop-card-item');
            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                card.style.display = text.includes(val) ? 'block' : 'none';
            });
        });
    }
});

// --- 4. GLOBAL FUNCTIONS (पॉपअप के लिए इन्हें बाहर रखना जरूरी है) ---
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

function viewWorkshop(title, desc, imgPath) {
    const titleEl = document.getElementById('workshopTitle');
    const descEl = document.getElementById('workshopDesc');
    const imgEl = document.getElementById('workshopImg');
    
    if(titleEl && descEl && imgEl) {
        titleEl.innerText = title;
        descEl.innerText = desc;
        imgEl.src = imgPath;
        
        const waBtn = document.getElementById('popupWhatsappBtn');
        if(waBtn) waBtn.href = `https://wa.me/919598183089?text=Hi, I am interested in ${title} workshop.`;
        
        openPopup('workshopInfo');
    }
}

// Close on 'ESC' Key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.popup-overlay').forEach(p => p.style.display = 'none');
        document.body.style.overflow = 'auto';
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("UPI ID Copied: " + text);
    });
}
