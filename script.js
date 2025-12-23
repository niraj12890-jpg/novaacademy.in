AOS.init({ duration: 1000, once: true });

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOq1-GYeeQoKHw4DJ3a1XEQIrq9ydS2FvUsXtqWLM3IKwCg9zEX_8Q9WOSDl7FrdE2HQ/exec";

function openPopup(id){ document.getElementById(id).style.display = 'flex'; }
function closePopup(id){ document.getElementById(id).style.display = 'none'; }

function openDetails(key){
  const data = workshopData[key];
  if(!data) return;
  document.getElementById('workshopTitle').innerText = data.title;
  document.getElementById('workshopImg').src = data.img;
  document.getElementById('workshopDesc').innerText = data.desc;
  openPopup('workshopInfo');
}

// Search Logic
document.getElementById('searchBtn').addEventListener('click', function(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
  });
});

// [Sabh baki functions submitRegistration aur submitEnquiry yahan se chalenge]
