// 1. Mouse Glow Tracker
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// 2. Simple Counter Animation
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(c => {
        const target = +c.getAttribute('data-target');
        let count = 0;
        const inc = target / 50;
        const update = () => {
            if(count < target) {
                count += inc;
                c.innerText = Math.ceil(count);
                setTimeout(update, 30);
            } else { c.innerText = target; }
        };
        update();
    });
};

// Start counters on scroll
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) animateCounters();
}, {threshold: 0.5});
observer.observe(document.querySelector('#counter-section'));

// 3. Popup Controls (Shared Logic)
function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
}
function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}

// 4. Workshop Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll('.workshop-card-item').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(val) ? 'block' : 'none';
    });
});
