document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    setupSearch();
    setupValidation();
});

// 1. Cards और Trainers को स्क्रीन पर दिखाना
function renderCards() {
    const wGrid = document.getElementById('workshopGrid');
    wGrid.innerHTML = WORKSHOPS.map(w => `
        <div class="col-md-4 workshop-card-item">
            <div class="card h-100 glass-card">
                <img src="${w.img}" class="card-img-top">
                <div class="card-body">
                    <h4 class="fw-bold">${w.title}</h4>
                    <p class="small opacity-75">${w.shortDesc}</p>
                    <button class="btn btn-outline-primary w-100 rounded-pill mb-2" onclick="openDetails('${w.id}')">View Details</button>
                    <div class="d-flex gap-2">
                        <button class="btn btn-neon flex-fill rounded-pill" onclick="openPopup('enquirePopup')">Enquire</button>
                        <button class="btn btn-success flex-fill rounded-pill" onclick="openRegister('${w.id}')">Register</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    const tGrid = document.getElementById('trainerGrid');
    tGrid.innerHTML = TRAINERS.map(t => `
        <div class="col-md-4 text-center p-3">
            <img src="${t.img}" class="rounded-circle border border-primary mb-3" style="width:120px; height:120px; object-fit:cover;">
            <h4 class="neon-text">${t.name}</h4>
            <p class="text-info small">${t.role}</p>
        </div>
    `).join('');
}

// 2. डिटेल्स पॉपअप खोलना
function openDetails(id) {
    const w = WORKSHOPS.find(x => x.id === id);
    document.getElementById('dynamicDetailContent').innerHTML = `
        <h2 class="fw-bold text-dark">${w.title}</h2>
        <img src="${w.img}" class="img-fluid rounded mb-3" style="max-height:250px; width:100%; object-fit:cover;">
        <h6 class="fw-bold">What you will learn:</h6>
        <ul class="small text-muted">
            ${w.fullDetails.map(p => `<li class="mb-1">${p}</li>`).join('')}
        </ul>
        <div class="d-flex justify-content-between align-items-center mt-3 p-2 bg-light rounded">
            <span class="fw-bold text-success">Fees: ${w.price}</span>
            <button class="btn btn-neon rounded-pill" onclick="closePopup('workshopDetailsPopup'); openRegister('${w.id}')">Enroll Now</button>
        </div>
    `;
    openPopup('workshopDetailsPopup');
}

// 3. Popup & Validation Logic (Pehle jaisa)
function openPopup(id) { document.getElementById(id).style.display = 'flex'; }
function closePopup(id) { document.getElementById(id).style.display = 'none'; }

function openRegister(id) {
    const w = WORKSHOPS.find(x => x.id === id);
    document.getElementById('workshopDisplay').value = w.title;
    document.getElementById('priceDisplay').value = w.price;
    openPopup('registerPopup');
}
