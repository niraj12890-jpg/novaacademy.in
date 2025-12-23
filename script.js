// JS-01: Search Logic
document.getElementById('searchBtn').addEventListener('click', function(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if(!q) return;

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
});

// JS-02: Popup Helpers
function openPopup(id){
  document.getElementById(id).style.display = 'flex';
}
function closePopup(id){
  document.getElementById(id).style.display = 'none';
}

// JS-03: Workshop Data Object
const workshopData = {
  xps: { title:"XPS Data Analysis", img:"XPSIMAGE.png", pdf:"#", desc:"..." },
  electro: { title:"Electrochemical", img:"images/w2.png", pdf:"#", desc:"..." }
};

// JS-04: Open Workshop Details
function openDetails(key){
  const d = workshopData[key];
  if(!d) return;
  document.getElementById("workshopTitle").innerText = d.title;
  document.getElementById("workshopImg").src = d.img;
  document.getElementById("workshopDesc").innerText = d.desc;
  document.getElementById("workshopInfo").style.display = "flex";
}

// JS-05: Close Workshop Popup
function closeDetails(){
  document.getElementById("workshopInfo").style.display = "none";
}

// JS-06: Google Apps Script URLs
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";

// JS-07: Submit Enquiry
function submitEnquiry(){
  // (same code as yours)
}

// JS-08: Submit Registration
function submitRegistration(){
  // (same code as yours)
}
