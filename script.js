function openPopup(id){
  document.getElementById(id).style.display="flex";
}

function closePopup(id){
  document.getElementById(id).style.display="none";
}

const workshopData={
  xps:{
    title:"XPS Data Analysis",
    img:"XPSIMAGE.png",
    desc:"Complete XPS training with hands-on datasets"
  },
  electro:{
    title:"Electrochemical Analysis",
    img:"images/w2.png",
    desc:"EIS, CV, GCD & Nyquist analysis"
  }
};

function openDetails(key){
  const d=workshopData[key];
  if(!d) return;
  document.getElementById("workshopTitle").innerText=d.title;
  document.getElementById("workshopImg").src=d.img;
  document.getElementById("workshopDesc").innerText=d.desc;
  document.getElementById("workshopInfo").style.display="flex";
}

function closeDetails(){
  document.getElementById("workshopInfo").style.display="none";
}
