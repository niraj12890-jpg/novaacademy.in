document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Glow
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    });

    // 2. Search Logic
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            document.querySelectorAll('.workshop-card-item').forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(val) ? 'block' : 'none';
            });
        });
    }

    // 3. Counter Animation
    const counterSection = document.querySelector('#counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.counter').forEach(c => {
                    const target = +c.getAttribute('data-target');
                    let count = 0;
                    const update = () => {
                        const inc = target / 100;
                        if (count < target) {
                            count += inc;
                            c.innerText = Math.ceil(count) + (c.innerText.includes('%') ? '%' : '');
                            setTimeout(update, 20);
                        } else { c.innerText = target + (c.innerText.includes('%') ? '%' : ''); }
                    };
                    update();
                });
                observer.unobserve(counterSection);
            }
        }, { threshold: 0.2 });
        observer.observe(counterSection);
    }
});

// GLOBAL FUNCTIONS
function openPopup(id) {
    const p = document.getElementById(id);
    if(p) { p.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function closePopup(id) {
    const p = document.getElementById(id);
    if(p) { p.style.display = 'none'; document.body.style.overflow = 'auto'; }
}

// HTML में जहाँ openDetails लिखा है, उसे इस फंक्शन से जोड़ें
function openDetails(type) {
    let title = "", desc = "", img = "";
    
    if(type === 'xps') {
        title = "XPS Data Analysis";
        desc = "Master the fundamentals of X-ray Photoelectron Spectroscopy. Includes peak fitting, instrumentation, and real-world datasets.";
        img = "w1.png";
    } // यहाँ अन्य वर्कशॉप्स (electro, origin) के लिए 'else if' जोड़ें
    
    document.getElementById('workshopTitle').innerText = title;
    document.getElementById('workshopDesc').innerText = desc;
    document.getElementById('workshopImg').src = img;
    openPopup('workshopDetailsPopup'); // सही ID का उपयोग करें
}

function closeDetails() {
    closePopup('workshopDetailsPopup');
}
