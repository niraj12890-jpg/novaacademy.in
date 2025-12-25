// SEARCH
document.getElementById("searchBtn").addEventListener("click", () => {
  const q = searchInput.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c => {
    c.style.display = c.innerText.toLowerCase().includes(q) ? "" : "none";
  });
});

// POPUPS
function openPopup(id){ document.getElementById(id).style.display="flex"; }
function closePopup(id){ document.getElementById(id).style.display="none"; }

// WORKSHOP DATA
const workshopData = {
  xps:{
    title:"XPS Data Analysis Workshop",
    img:"XPSIMAGE.png",
    desc:"Full XPS theory + practical datasets"
  },
  electro:{ title:"Electrochemical Analysis", img:"images/w2.png", desc:"CV, EIS, GCD, Nyquist" },
  origin:{ title:"OriginPro Training", img:"images/w3.png", desc:"Graphing & fitting" },
  xrd:{ title:"XRD Analysis", img:"images/w4.png", desc:"Rietveld refinement" },
  chemdraw:{ title:"ChemDraw Workshop", img:"images/w5.png", desc:"Chemical drawing" },
  dwsim:{ title:"DWSIM Simulation", img:"images/w6.png", desc:"Process simulation" }
};

function openDetails(key){
  const d = workshopData[key];
  workshopTitle.innerText = d.title;
  workshopImg.src = d.img;
  workshopDesc.innerText = d.desc;
  workshopInfo.style.display="flex";

  const msg=`Hello Nova Academy 👋%0AInterested in ${d.title}`;
  popupWhatsappBtn.href=`https://wa.me/919598183089?text=${msg}`;
  whatsappLink.href=`https://wa.me/919598183089?text=${msg}`;
}

function closeDetails(){
  workshopInfo.style.display="none";
}

// ESC KEY
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    closeDetails();
    closePopup("enquirePopup");
    closePopup("registerPopup");
  }
});
