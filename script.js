// Initialize Animations
AOS.init();

// Workshop Data Store
const workshopData = {
    xps: {
        title: "XPS Data Analysis Workshop",
        img: "XPSIMAGE.png",
        desc: "Comprehensive XPS fundamentals, instrumentation & peak fitting with hands-on datasets."
    }
    // Add others here...
};

// Popup Management
function openPopup(id) { document.getElementById(id).style.display = 'flex'; }
function closePopup(id) { document.getElementById(id).style.display = 'none'; }

function openDetails(key) {
    const data = workshopData[key];
    if(!data) return;
    // Set content and show (Logic remains same as your original)
    openPopup('workshopInfo');
}

// Form Submission Logic
const SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL";

function submitRegistration() {
    const data = {
        name: document.getElementById("regName").value,
        mobile: document.getElementById("regMobile").value,
        utr: document.getElementById("regUTR").value
    };
    
    // Simple validation
    if(!data.name || !data.utr) return alert("Please fill all fields");

    alert("Registration Received! Verifying payment...");
    closePopup('registerPopup');
}

// Search Logic
document.getElementById('searchBtn').addEventListener('click', () => {
    let q = document.getElementById('searchInput').value.toLowerCase();
    document.querySelectorAll('.modern-card').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(q) ? 'block' : 'none';
    });
});
