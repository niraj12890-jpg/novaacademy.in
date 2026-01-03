// पूरा कोड इस 'DOMContentLoaded' के अंदर है ताकि HTML लोड होने के बाद ही JS चले
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
            const speed = 100; 
            const update = () => {
                const currentText = c.innerText.replace('%', '');
                const current = parseFloat(currentText) || 0;
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
                observer.unobserve(counterSection);
            }
        }, { threshold: 0.2 });
        observer.observe(counterSection);
    }

    // --- 3. SEARCH LOGIC ---
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
}); // <--- यहाँ ब्रैकेट सही किया गया है

// --- 4. GLOBAL FUNCTIONS (पॉपअप के लिए बाहर रखना ज़रूरी है) ---

function openPopup(id) {
    const popup = document.getElementById(id);
    if(popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // बैकग्राउंड स्क्रॉल बंद
    }
}

function closePopup(id) {
    const popup = document.getElementById(id);
    if(popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // स्क्रॉल चालू
    }
}

function openDetails(type) {
    const titleEl = document.getElementById('workshopTitle');
    const descEl = document.getElementById('workshopDesc');
    const imgEl = document.getElementById('workshopImg');
    
    // वर्कशॉप डेटाबेस
    const dataMap = {
        'xps': {
            title: "XPS Data Analysis",
            desc: "Master peak fitting, instrumentation, and real-world datasets for high-impact research. Includes hands-on training on CasaXPS.",
            img: "images/w1.png"
        },
        'electro': {
            title: "Electrochemical Analysis",
            desc: "Detailed study of CV, EIS, and GCD. Perfect for energy storage and sensor research.",
            img: "images/w2.png"
        },
        'origin': {
            title: "OriginPro Training",
            desc: "Learn to create publication-quality graphs, curve fitting, and advanced statistical analysis.",
            img: "images/w3.png"
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
        
        openPopup('workshopDetailsPopup'); // HTML में ID 'workshopDetailsPopup' होनी चाहिए
    } else {
        console.error("Popup elements or Data not found for type:", type);
    }
} // openDetails ends here

// Keydown listener for ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll('.popup-overlay').forEach(p => {
            p.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});
